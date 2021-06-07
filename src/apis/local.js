export const getWhatsUpDetails = () => {
  return JSON.parse(
    sessionStorage.getItem(process.env.REACT_APP_AT_KEY) || "{}"
  );
};

export const setWhatsUpDetails = (whatsupDetails) => {
  sessionStorage.setItem(
    process.env.REACT_APP_AT_KEY,
    JSON.stringify(whatsupDetails)
  );
};

export const getWhatsUpProxyAccessToken = () => {
  return getCookie("whatsupProxyAccessToken");
};

export const setWhatsUpProxyAccessToken = (accessToken) => {
  document.cookie = `whatsupProxyAccessToken=${accessToken};max-age=${60 * 60}`;
  return;
};

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
