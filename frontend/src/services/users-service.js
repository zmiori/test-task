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
