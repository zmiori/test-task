import { useState, useEffect } from "react";
import s from "./UserPosts.module.css";
import { getUserPosts } from "../../services/users-service";

function UserPosts({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts(user.id).then((p) => setPosts(p));
  }, []);

  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id}>
          <h4>{p.title}</h4>
          <p>{p.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default UserPosts;
