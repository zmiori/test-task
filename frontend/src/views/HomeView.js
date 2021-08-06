import { React, useState, useEffect } from "react";

import Container from "../components/Container";
import UsersList from "../components/UsersList";
import UserSort from "../components/UserSort";
import UserFeed from "../components/UserFeed";

import { getUsers } from "../services/users-service";

function HomeView({ isLoggedIn }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

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
      <main
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <section>
          <UserSort sortUsers={(param) => sortUsers(param)} />
          <UsersList users={users} />
        </section>
        <UserFeed></UserFeed>
      </main>
    </Container>
  );
}

export default HomeView;
