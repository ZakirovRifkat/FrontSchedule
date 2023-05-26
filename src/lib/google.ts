import { formatPath } from './api'

export const getGoogleOauthRedirectPath = () =>
    formatPath({
        path: 'https://accounts.google.com/o/oauth2/v2/auth',
        query: {
            scope: 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.email',
            access_type: 'offline',
            include_granted_scopes: true,
            response_type: 'code',
            redirect_uri: formatPath({ path: '/user/login' }),
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            state: window.location.href,
        },
    })
