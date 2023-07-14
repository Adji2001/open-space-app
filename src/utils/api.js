const api = (() => {
  const BASE_URL = 'https://openspace-api.netlify.app/v1';

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  // menyimpan access token dari local storage.
  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  // mendapatkan access token dari local storage.
  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  // registrasi pengguna baru.
  async function register({ id, name, password }) {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        name,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { user } } = responseJson;

    return user;
  }

  // proses autentikasi untuk mendapatkan access token.
  async function login({ id, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        password,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { token } } = responseJson;

    return token;
  }

  // mendapatkan pengguna yang terautentikasi.
  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { user } } = responseJson;

    return user;
  }

  // mendapatkan seluruh daftar pengguna.
  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { users } } = responseJson;

    return users;
  }

  // mendapatkan seluruh daftar talks.
  async function getAllTalks() {
    const response = await fetch(`${BASE_URL}/talks`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { talks } } = responseJson;

    return talks;
  }

  // mendapatkan detail talk.
  async function getTalkDetail(id) {
    const response = await fetch(`${BASE_URL}/talks/${id}`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { talkDetail } } = responseJson;

    return talkDetail;
  }

  // membuat talk atau balasan talk.
  async function createTalk({ text, replyTo = '' }) {
    const response = await _fetchWithAuth(`${BASE_URL}/talks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        replyTo,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { talk } } = responseJson;

    return talk;
  }

  // menyukai atau batal menyukai talk.
  async function toggleLikeTalk(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/talks/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        talkId: id,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllTalks,
    createTalk,
    toggleLikeTalk,
    getTalkDetail,
  };
})();

export default api;
