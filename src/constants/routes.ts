export const ROUTES = {
    HEALTH: 'health',
    SWAGGER: 'api/docs',
    AUTH: 'auth',

    REGISTER: 'register',
    LOGIN: 'login',
    CURRENT_USER: 'me'
} as const;
const { AUTH, REGISTER, LOGIN, CURRENT_USER } = ROUTES;

export const ROUTES_FOOL_PATHS = {
    REGISTER: `${AUTH}/${REGISTER}`,
    LOGIN: `${AUTH}/${LOGIN}`,
    CURRENT_USER: `${AUTH}/${CURRENT_USER}`
}