import s from "./UsersList.module.css";
import UsersListItem from "../UsersListItem";

function UsersList({ users }) {
  function showPosts(user) {
    console.log("hello", user.username);
  }
  return (
    <ul>
      {users.map((user) => (
        <UsersListItem
          key={user.username}
          user={user}
          onDoubleClick={() => showPosts(user)}
        />
      ))}
    </ul>
  );
}

export default UsersList;
