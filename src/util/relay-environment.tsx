import { createContext, useContext, useEffect } from "react";
import { requestSubscription } from "react-relay";
import {
  Environment,
  Network,
  RecordSource,
  Store,
  SubscribeFunction,
} from "relay-runtime";

// cannot use destructured import because of https://github.com/rails/rails/issues/35501
import { createSubscriptionHandler } from "./relay-environment/subscription-handler";

export const createEnvironment = (apiBase: string, apiToken: string) => {
  const fetchQuery = (operation: any, variables: any) => {
    return fetch(`${apiBase}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }).then((response) => {
      return response.json();
    });
  };

  return new Environment({
    // @ts-ignore
    network: Network.create(
      fetchQuery,
      (createSubscriptionHandler(
        `${apiBase}/cable?auth_token=${apiToken}`
      ) as unknown) as SubscribeFunction
    ),
    store: new Store(new RecordSource()),
  });
};

export const RelayEnvironmentContext = createContext<Environment | null>(null);
RelayEnvironmentContext.displayName = "RelayEnvironmentContext";

type useSubscriptionArgs = {
  // TODO: graphql type?
  subscription: any;
  variables?: object | null;
  callback: (payload: any) => any;
  ready?: boolean;
};

export const useSubscription = ({
  subscription,
  callback,
  variables,
  ready = true,
}: useSubscriptionArgs) => {
  const relayEnv = useContext(RelayEnvironmentContext);

  useEffect(() => {
    if (!relayEnv) {
      console.warn(
        "Expected RelayEnvironmentContext provided for useSubscription"
      );
      return;
    }
    if (!ready) return;

    const sub = requestSubscription(relayEnv as Environment, {
      subscription,
      variables: variables || {},
      onNext: (res: any) => {
        callback(res);
      },
      onError: (err: any) => {
        console.error("subscription error", err);
      },
    });

    return () => {
      sub.dispose();
    };
  }, [relayEnv, subscription, variables, ready, callback]);
};
