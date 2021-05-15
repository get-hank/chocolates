import React, { createContext, useEffect } from 'react'
import {
  RelayEnvironmentProvider,
  requestSubscription,
  useRelayEnvironment,
} from 'react-relay'
import {
  Environment,
  Network,
  RecordSource,
  Store,
  SubscribeFunction,
} from 'relay-runtime'
import { defaultHeaders } from './api'
import { useApiTokensWithReady } from './api-token'

// cannot use destructured import because of https://github.com/rails/rails/issues/35501
import { createSubscriptionHandler } from './relay-environment/subscription-handler'

export const useInitialRelayEnvironment = (apiBase: string) => {
  const { ready, ...apiTokens } = useApiTokensWithReady(apiBase)
  if (!ready) return null
  const headers = defaultHeaders(apiTokens)

  const fetchQuery = async (operation: any, variables: any) => {
    const response = await fetch(`${apiBase}/graphql`, {
      headers,
      method: 'POST',
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    })
    return response.json()
  }

  let subUrl = `${apiBase}/cable?auth_token=${apiTokens.auth0Token}`
  const impersonateId = headers['X-Impersonate-Id']
  if (impersonateId) subUrl = `${subUrl}&impersonate_id=${impersonateId}`
  return new Environment({
    // @ts-ignore
    network: Network.create(
      fetchQuery,
      apiTokens.auth0Token
        ? ((createSubscriptionHandler(subUrl) as unknown) as SubscribeFunction)
        : undefined
    ),
    store: new Store(new RecordSource()),
  })
}

type useSubscriptionArgs = {
  // TODO: graphql type?
  subscription: any
  variables?: object | null
  callback: (payload: any) => any
  ready?: boolean
}

export const useSubscription = ({
  subscription,
  callback,
  variables,
  ready = true,
}: useSubscriptionArgs) => {
  const relayEnv = useRelayEnvironment()

  useEffect(() => {
    if (!relayEnv) {
      console.warn(
        'Expected RelayEnvironmentContext provided for useSubscription'
      )
      return
    }
    if (!ready) return

    const sub = requestSubscription(relayEnv as Environment, {
      subscription,
      variables: variables || {},
      onNext: (res: any) => {
        callback(res)
      },
      onError: (err: any) => {
        console.error('subscription error', err)
      },
    })

    return () => {
      sub.dispose()
    }
  }, [relayEnv, subscription, variables, ready, callback])
}

export const WithRelayEnv: React.FC<{ apiBase: string }> = ({
  apiBase,
  children,
}) => {
  const relayEnv = useInitialRelayEnvironment(apiBase)
  return (
    <RelayEnvironmentProvider environment={relayEnv}>
      {children}
    </RelayEnvironmentProvider>
  )
}
