const setCookie = (name, value, exp = "", path = "/") => {
  document.cookie = `${name}=${value}; expires=""; path=${path}`;
};

const getCookie = (name) => {
  let cookie = "; " + document.cookie;
  let parts = cookie.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

const deleteCookie = (name) => {
  let date = new Date("2020-01-01").toUTCString();
  document.cookie = name + "=; expires=" + date + "; path=/";
};

export { setCookie, deleteCookie, getCookie };
