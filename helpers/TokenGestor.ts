const TokenGestor = {
    token: null,
    setToken: (token: string) => {
        sessionStorage.setItem('token',token)
    },
    getToken: () => {
        const token = sessionStorage.getItem('token')
        return token
    },
    deleteToken: () => {
        sessionStorage.removeItem('token')
    }
}

export default TokenGestor