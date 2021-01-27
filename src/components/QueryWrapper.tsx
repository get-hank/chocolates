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

type renderType = React.ComponentProps<typeof QueryRenderer>["render"];

const QueryWrapper: React.FC<QueryWrapperProps> = ({
  query,
  variables = {},
  render,
  apiBase,
  fetchPolicy = "network-only",
}) => {
  const apiToken = useApiToken(apiBase);
  const [relayEnv, setRelayEnv] = useState<any>(null);
  const [priorResponse, setPriorResponse] = useState<unknown | null>(null);

  useEffect(() => {
    if (!apiToken || relayEnv) return;
    setRelayEnv(createEnvironment(apiBase, apiToken));
  }, [apiToken, setRelayEnv, relayEnv]);

  if (!relayEnv) return null;

  const renderWithPrior: renderType = ({ props, ...rest }) => {
    if (props && priorResponse !== props) setPriorResponse(props);
    return render({ ...rest, props: props || priorResponse });
  };

  return (
    <RelayEnvironmentContext.Provider value={relayEnv}>
      <QueryRenderer
        environment={relayEnv}
        query={query}
        variables={variables}
        render={renderWithPrior}
        fetchPolicy={fetchPolicy}
      />
    </RelayEnvironmentContext.Provider>
  );
};

export default QueryWrapper;
