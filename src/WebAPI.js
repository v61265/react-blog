import { getAuthToken } from "./utils";

const BASE_URL = "https://student-json-api.lidemy.me";

export const getPosts = () => {
  return fetch(
    `${BASE_URL}/posts?_sort=createdAt&_order=desc&_expand=user`
  ).then((res) => res.json());
};

export const getPostsFromPage = (page, limit) => {
  return fetch(
    `${BASE_URL}/posts?_expand=user&_sort=createdAt&_order=desc&_page=${page}&_limit=${limit}`
  ).then((res) => res.json());
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const getMe = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const getPost = (id) => {
  return fetch(`${BASE_URL}/posts?_expand=user&id=${id}`).then((res) => {
    return res.json();
  });
};

export const addPost = (title, body) => {
  const token = getAuthToken();
  console.log(title);
  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  }).then((res) => res.json());
};

export const register = (username, password, nickname) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  }).then((res) => res.json());
};
