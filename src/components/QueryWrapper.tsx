import React, { createContext, useEffect, useState } from "react";
import { QueryRenderer, FetchPolicy } from "react-relay";
import { useApiToken } from "../util/api-token";
import {
  createEnvironment,
  RelayEnvironmentContext,
} from "../util/relay-environment";

type QueryWrapperProps = {
  // todo: graphql query type?
  query: any;
  variables?: any;
  render: any;
  apiBase: string;
  fetchPolicy?: FetchPolicy;
};

type renderType = React.ComponentProps<typeof QueryRenderer>["render"];
type RenderedQueryContainerProps = Parameters<renderType>[0] & {
  render: renderType;
};

type QueryContextType = { reload: () => void };
export const RelayQueryContext = createContext<QueryContextType>({
  reload: () => { },
});

const RenderedQueryContainer = ({
  render,
  props,
  retry,
  ...rest
}: RenderedQueryContainerProps) => {
  const [priorResponse, setPriorResponse] = useState<unknown | null>(null);

  useEffect(() => {
    if (props && priorResponse !== props) setPriorResponse(props);
  }, [props, priorResponse, setPriorResponse]);

  return (
    <RelayQueryContext.Provider value={{ reload: retry }}>
      {render({
        retry,
        ...rest,
        props: props || priorResponse,
      })}
    </RelayQueryContext.Provider>
  );
};

const QueryWrapper: React.FC<QueryWrapperProps> = ({
  query,
  variables = {},
  render,
  apiBase,
  fetchPolicy = "network-only",
}) => {
  const apiToken = useApiToken(apiBase);
  const [relayEnv, setRelayEnv] = useState<any>(null);

  useEffect(() => {
    if (!apiToken || relayEnv) return;
    setRelayEnv(createEnvironment(apiBase, apiToken));
  }, [apiToken, setRelayEnv, relayEnv]);

  if (!relayEnv) return null;

  return (
    <RelayEnvironmentContext.Provider value={relayEnv}>
      <QueryRenderer
        environment={relayEnv}
        query={query}
        variables={variables}
        render={(args) => <RenderedQueryContainer {...args} render={render} />}
        fetchPolicy={fetchPolicy}
      />
    </RelayEnvironmentContext.Provider>
  );
};

export default QueryWrapper;
