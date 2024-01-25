
interface AppConfig {
    domain: string,
    port: string
    route: string
}

export const configApp: AppConfig = {
    // eslint-disable-next-line
    // @ts-ignore
    domain: String(import.meta.env.VITE_BACKENDURL),
    // eslint-disable-next-line
    // @ts-ignore
    port: String(import.meta.env.VITE_BACKENDPORT),
    // eslint-disable-next-line
    // @ts-ignore
    route: String((import.meta.env.VITE_ROUTE))
}