const setCookie = (name, value, exp = 1 , path = "/") => {
	let date = new Date();
	date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
	document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=${path}`;
};

const multiCookie = (cookie1, cookie2) => { 
	setCookie(cookie1.name, cookie1.value) 
	setCookie(cookie2.name, cookie2.value) 
};


const getCookie = (name) => {
	let cookie = "; " + document.cookie;
	let parts = cookie.split(`; ${name}=`);
	if (parts.length === 2) {
		return parts.pop().split(";").shift();
	}
};

const deleteCookie = (name) => {
	let date = new Date('2020-01-01').toUTCString();
	document.cookie = name + '=; expires=' + date;
};



export { setCookie, deleteCookie , getCookie , multiCookie};