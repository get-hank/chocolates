import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { clearCookie, getCookie, setCookie } from './cookies'

export const setAnonToken = (token: string) =>
  setCookie({
    name: 'anonymous_user_token',
    value: token,
    secure: !!window.location.host.match('gethank.com'),
  })

export const clearAnonToken = () =>
  clearCookie({
    name: 'anonymous_user_token',
    secure: !!window.location.host.match('gethank.com'),
  })

export const useApiTokensWithReady = (apiBase: string) => {
  const { isLoading, user, getAccessTokenSilently } = useAuth0()
  const [auth0Token, setAuth0Token] = useState<string | null | undefined>()
  const [anonymousToken, setAnonymousToken] = useState<
    string | null | undefined
  >()

  useEffect(() => {
    if (isLoading || auth0Token) return

    if (anonymousToken === undefined) {
      setAnonymousToken(getCookie('anonymous_user_token') || null)
    }

    if (!user) {
      setAuth0Token(null)
      return
    }

    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: apiBase,
        })
        setAuth0Token(accessToken)
      } catch (e) {
        console.error(e.message, e)
        setAuth0Token(null)
      }
    }

    getToken()
  }, [
    isLoading,
    user,
    getAccessTokenSilently,
    auth0Token,
    setAuth0Token,
    anonymousToken,
    setAnonymousToken,
  ])

  // Clear anon cookie once we have an authenticated token
  useEffect(() => {
    if (!(auth0Token && anonymousToken)) return

    clearAnonToken()
    setAnonymousToken(null)
  }, [auth0Token, anonymousToken, setAnonymousToken])

  const hasNoTokens = auth0Token === null && anonymousToken === null
  return {
    auth0Token,
    anonymousToken,
    ready: auth0Token || anonymousToken || hasNoTokens,
  }
}

export const useApiTokens: (
  apiBase: string
) => { auth0Token?: string | null; anonymousToken?: string | null } = (
  apiBase: string
) => {
    const { ready, ...tokens } = useApiTokensWithReady(apiBase)
    if (!ready) return {}
    return tokens
  }
