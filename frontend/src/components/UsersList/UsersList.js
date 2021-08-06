import s from "./UsersList.module.css";
import UsersListItem from "../UsersListItem";

function UsersList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <UsersListItem key={user.username} user={user} />
      ))}
    </ul>
  );
}

export default UsersList;
