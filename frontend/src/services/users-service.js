import axios from "axios";

export const getUsers = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  //   console.log(data);
  return data;
};

export const getUserPosts = async (userId) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`
  );
  // console.log(data);
  return data;
};

export const getCurrentUserData = async (accessToken) => {
  const { data } = await axios.post(`http://localhost:3000/auth/current`, {
    accessToken,
  });
  // console.log(data);
  return data;
};

export const logout = async (user) => {
  const { data } = await axios.post(`http://localhost:3000/auth/logout`, user);
  console.log(data);
  return data;
};

export const updateUserFeed = async (userId, feed) => {
  const { data } = await axios.post(`http://localhost:3000/auth/feed`, {
    userId,
    feed,
  });
  console.log(data);
  return data;
};
