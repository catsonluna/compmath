import { deleteCookie, setCookie } from "cookies-next";

let user = {
    user_id: "",
    username: "",
    session: "",
}

// Funkcija, lai iestatītu lietotāja informāciju
export function setUser(u: any) {
    user = u;
}

// Funkcija, lai iegūtu lietotāja informāciju
export function getUser() {
    return user;
}

// Pārbauda, vai lietotājs ir ielogojies
export function isLoggedIn(): boolean {
    return user.user_id != "";
}

// Funkcija, lai izlogotu lietotāju
export function logout() {
    user = {
        user_id: "",
        username: "",
        session: "",
    }
    deleteCookie("token"); // Dzēš sīkdatni ar nosaukumu "token"
}