interface Auth {
  tokenType: 'Bearer'
  accessToken: string
}

export const useAuth = () => {
  const accessTokenCookie = useCookie('access_token')
  const auth = useState<Auth>('auth', () => ({
    tokenType: 'Bearer',
    accessToken: accessTokenCookie.value
  } as Auth))

  const setAccessToken = (accessToken: string) => {
    auth.value.accessToken = accessToken
    accessTokenCookie.value = accessToken
  }

  return { auth, setAccessToken }
}
