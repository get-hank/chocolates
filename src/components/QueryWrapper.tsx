import React, { createContext, useEffect, useState } from 'react'
import { QueryRenderer, useRelayEnvironment, FetchPolicy } from 'react-relay'

type QueryWrapperProps = {
  // todo: graphql query type?
  query: any
  variables?: any
  render: any
  apiBase: string
  fetchPolicy?: FetchPolicy
}

type renderType = React.ComponentProps<typeof QueryRenderer>['render']
type RenderedQueryContainerProps = Parameters<renderType>[0] & {
  render: renderType
}

type QueryContextType = { reload: () => void }
export const RelayQueryContext = createContext<QueryContextType>({
  reload: () => {},
})

const RenderedQueryContainer = ({
  render,
  props,
  retry,
  ...rest
}: RenderedQueryContainerProps) => {
  const [priorResponse, setPriorResponse] = useState<unknown | null>(null)

  useEffect(() => {
    if (props && priorResponse !== props) setPriorResponse(props)
  }, [props, priorResponse, setPriorResponse])

  return (
    <RelayQueryContext.Provider value={{ reload: retry }}>
      {render({
        retry,
        ...rest,
        props: props || priorResponse,
      })}
    </RelayQueryContext.Provider>
  )
}

const QueryWrapper: React.FC<QueryWrapperProps> = ({
  query,
  variables = {},
  render,
  fetchPolicy = 'network-only',
}) => {
  const relayEnv = useRelayEnvironment()
  if (!relayEnv) return null

  return (
    <QueryRenderer
      environment={relayEnv}
      query={query}
      variables={variables}
      render={(args) => <RenderedQueryContainer {...args} render={render} />}
      fetchPolicy={fetchPolicy}
    />
  )
}

export default QueryWrapper
