export default function ({ store, redirect, route }) {
    const loggedIn = store.getters['user/loggedIn']
    if (!loggedIn) {
        if (route.path.match(/^\/app/)) redirect('/')
    } else if (!store.getters['user/isAdmin']) {
        store.dispatch('user/logout')
        redirect('/')
    } else {
        if (!route.path.match(/^\/app/)) redirect('/app')
    }
}