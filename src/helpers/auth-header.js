export function authHeader() {

    let user = JSON.parse(sessionStorage.getItem('user'));

    if (user && user.data) {
        return { 'Authorization': 'Bearer ' + user?.data };
    } else {
        return {};
    }
}