export const idCheck = (id) => {
    let regExp = /^[0-9a-zA-Z]/;
    // 대문자 포함
    return regExp.test(id)
}

export const nickCheck = (nickname) => {
    let regExp = /^[0-9a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    return regExp.test(nickname)
}

export const emailCheck = (email) => {
    let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;

    return _reg.test(email);
}