const apiUrl = process.env.REACT_APP_API_BASE_URL;

function getAccessToken() {
    return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
    return localStorage.setItem("accessToken", accessToken);
}

async function fetchWithToken(url, options = {}) {
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
}

async function login({ email, password }) {
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== "success") {
        alert(responseJson.message);
        return { error: true, data: null };
    }

    putAccessToken(responseJson.data.accessToken);

    return { error: false, data: responseJson.data };
}

async function register({ name, email, password, level }) {
    const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, level }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== "success") {
        alert(responseJson.message);
        return { error: true };
    }

    return { error: false };
}

async function getUserLogged() {
    const response = await fetchWithToken(`${apiUrl}/me`);
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
        return { error: true, data: null };
    }

    return { error: false, data: responseJson };
}

export {
    getAccessToken,
    putAccessToken,
    login,
    register,
    getUserLogged,
};