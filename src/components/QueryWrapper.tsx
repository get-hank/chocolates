import React, { useEffect, useState } from "react";
import { QueryRenderer, FetchPolicy } from "react-relay";
import { useApiToken } from "../util/api";
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
        render={render}
        fetchPolicy={fetchPolicy}
      />
    </RelayEnvironmentContext.Provider>
  );
};

export default QueryWrapper;
