export const ROUTES = {
    HEALTH: 'health',
    SWAGGER: 'api/docs',
    AUTH: 'auth',
    REGISTER: 'register',
    LOGIN: 'login',
    CURRENT_USER: 'me',
    USER: 'user',
    AVATAR: 'avatar'
} as const;
export const { AUTH, REGISTER, LOGIN, CURRENT_USER, USER, AVATAR } = ROUTES;

export const ROUTES_FOOL_PATHS = {
    REGISTER: `${AUTH}/${REGISTER}`,
    LOGIN: `${AUTH}/${LOGIN}`,
    CURRENT_USER: `${AUTH}/${CURRENT_USER}`
}
export const IS_PUBLIC_KEY = 'isPublic';