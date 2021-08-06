import { useState } from "react";
import s from "./UsersListItem.module.css";
import Modal from "../Modal";
import UserPosts from "../UserPosts";

function UsersListItem({ user }) {
  const { username } = user;
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <li className={`card ${s.card}`} onDoubleClick={() => toggleModal()}>
      {showModal && (
        <Modal onClose={() => toggleModal()}>
          <UserPosts user={user}></UserPosts>
        </Modal>
      )}

      <div className="card-content">
        <h2 className="card-title">User: {username}</h2>
        <ul className={s.info}>
          {Object.entries(user).map((item) => {
            if (typeof item[1] === "string") {
              return (
                <li key={item[0]}>
                  {item[0]}: {item[1]}
                </li>
              );
            } else if (Object.values(item)[0] === "address") {
              return <li key={item[1]["city"]}>city: {item[1]["city"]}</li>;
            }
            return null;
          })}
        </ul>
      </div>
    </li>
  );
  // ;
}

export default UsersListItem;
