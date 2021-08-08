import s from "./UsersList.module.css";
import UsersListItem from "../UsersListItem";

function UsersList({ users, currentUser, provided, snapshot }) {
  return (
    <ul ref={provided.innerRef} {...provided.droppableProps}>
      {users.map((user, index) => (
        <UsersListItem
          key={user.username}
          user={user}
          itemIndex={index}
          currentUser={currentUser}
        />
      ))}
    </ul>
  );
}

export default UsersList;
