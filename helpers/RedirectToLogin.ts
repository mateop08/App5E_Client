
export const redirectToLogin = () => {
    const base_url = window.location.origin
    console.log(base_url)
    location.href = base_url + '/login/'
}
