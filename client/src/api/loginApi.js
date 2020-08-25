import Bmob from "hydrogen-js-sdk";

export function login(userName, password) {
    return Bmob.User.login(userName, password);
}

export function getInfo(token) {}

export function logout() {}

export default {
    login,
    getInfo,
    logout
};
