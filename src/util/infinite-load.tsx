import { useMemo, useReducer, useCallback } from "react";
import { ConnectionConfig, createPaginationContainer } from "react-relay";

export const createInfiniteLoadContainer = createPaginationContainer;

export type InfiniteLoadParentProps = {
  relationOwner?: any;
  relay: any;
};

type RelationListProps = {
  relationOwner?: any;
  relay: any;
  render: any;
};

const createGetConnectionFromProps = (listField: string) => (props: any) =>
  props.relationOwner && props.relationOwner[listField];

type ConfigWithoutQuery = Omit<ConnectionConfig, "query">;

export const createConfig: (field: string) => ConfigWithoutQuery = (
  listField
) => ({
  direction: "forward",
  getConnectionFromProps: createGetConnectionFromProps(listField),
  getFragmentVariables(prevVars: any, totalCount: number) {
    return {
      ...prevVars,
      count: totalCount,
    };
  },
  getVariables(props: object, paginationInfo: any, fragmentVariables: any) {
    return {
      ...fragmentVariables,
      count: fragmentVariables.count,
      cursor: createGetConnectionFromProps(listField)(props).pageInfo.endCursor,
    };
  },
});

export const createInfiniteLoad = (listField: string) => ({
  relationOwner,
  relay,
  render,
}: RelationListProps) => {
  const relation = useMemo(() => {
    if (!relationOwner[listField].edges) return [];
    return relationOwner[listField].edges.map((r: any) => ({
      ...r.node,
    }));
  }, [relationOwner]);

  // isLoading doesn't reset after fetch, force it
  // https://github.com/facebook/relay/issues/1973
  // eslint-disable-next-line
  const [_, forceRerender] = useReducer((x) => x + 1, 0);
  const loadMore = useCallback(
    (count) => {
      relay.loadMore(count, () => {
        forceRerender();
      });
    },
    [relay, forceRerender]
  );

  let props: any = {
    loadMore,
    hasMore: relay.hasMore(),
    isLoading: relay.isLoading(),
  };
  props[`${listField}`] = relation;

  return render(props);
};
