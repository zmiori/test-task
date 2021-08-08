import { React, useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Container from "../components/Container";
import UsersList from "../components/UsersList";
import UserSort from "../components/UserSort";
import UserFeed from "../components/UserFeed";

import { getUsers, updateUserFeed } from "../services/users-service";

function HomeView({ isLoggedIn, user, userCards, onDrag }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers(userCards);
  }, [userCards]);

  function loadUsers() {
    getUsers()
      .then((data) => sortUsersByParam(data, "username"))
      .then((data) => setUsers(data))
      .catch((e) => console.log(e));
  }

  function sortUsers(param) {
    console.log(param);
    const sorted = sortUsersByParam(users, param);
    setUsers(sorted);
  }

  function sortUsersByParam(data, param) {
    const newDataArray = [...data];
    const sortedData = newDataArray.sort(function (a, b) {
      if (!a[param]) {
        if (a.address.city > b.address.city) {
          return 1;
        }
        if (a.address.city < b.address.city) {
          return -1;
        }
        return 0;
      }
      if (a[param] > b[param]) {
        return 1;
      }
      if (a[param] < b[param]) {
        return -1;
      }
      return 0;
    });
    return sortedData;
  }

  return (
    <Container>
      <DragDropContext onDragEnd={(result) => onDrag(result)}>
        <main
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <section>
            <UserSort sortUsers={(param) => sortUsers(param)} />
            <Droppable droppableId="users-list">
              {(provided, snapshot) => (
                <UsersList
                  users={users}
                  currentUser={user}
                  provided={provided}
                  snapshot={snapshot}
                />
              )}
            </Droppable>
          </section>
          <UserFeed isLoggedIn={isLoggedIn} user={user}></UserFeed>
        </main>
      </DragDropContext>
    </Container>
  );
}

export default HomeView;
