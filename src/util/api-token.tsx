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

export const getAnonToken = () => getCookie('anonymous_user_token')

export const useApiTokensWithReady = (apiBase: string) => {
  const { isLoading, user, getAccessTokenSilently } = useAuth0()
  const [auth0Token, setAuth0Token] = useState<string | null | undefined>()

  useEffect(() => {
    if (isLoading || auth0Token) return

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
  }, [isLoading, user, getAccessTokenSilently, auth0Token, setAuth0Token])

  // Clear anon cookie once we have an authenticated token
  useEffect(() => {
    if (!(auth0Token && getAnonToken())) return

    clearAnonToken()
  }, [auth0Token])

  return {
    auth0Token,
    anonymousToken: getAnonToken(),
    // auth0Token is priority, so can return early if we have one, otherwise wait until we've checked for both tokens
    ready: auth0Token || auth0Token === null,
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
