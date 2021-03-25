type cookieArgs = {
  name: string
  value: string
  domain?: string
  expiresInSeconds?: number
  secure?: boolean
  path?: string
}

export const setCookie = ({
  name,
  value,
  expiresInSeconds,
  domain,
  secure,
  path = '/',
}: cookieArgs) => {
  let cookie = `${name}=${value};path=${path}`

  if (domain) cookie = `${cookie};domain=${domain}`
  if (expiresInSeconds) cookie = `${cookie};max-age=${expiresInSeconds}`
  if (secure) cookie = `${cookie};secure`

  document.cookie = cookie
}

export const getCookie = (name: string) => {
  const cookie = document.cookie
    .split('; ')
    .find((c: string) => c.startsWith(name))
  if (!cookie) return null
  return cookie.split('=')[1]
}

export const clearCookie = ({
  name,
  domain,
}: Omit<cookieArgs, 'value' | 'expiresInSeconds'>) => {
  let cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  if (domain) cookie = `${cookie};domain=${domain}`
  document.cookie = cookie
}
