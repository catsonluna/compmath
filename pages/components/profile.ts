import { deleteCookie, setCookie } from "cookies-next";

let user = {
    user_id: "",
    username: "",
    session: "",
}

export function setUser(u: any) {
    user = u;
}

export function getUser() {
    return user;
}

export function isLoggedIn(): boolean {
    return user.user_id != "";
}

export function logout() {
    user = {
        user_id: "",
        username: "",
        session: "",
    }
    deleteCookie("token");
}