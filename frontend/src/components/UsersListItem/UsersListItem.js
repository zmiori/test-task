import { React } from "react";
import s from "./UsersListItem.module.css";

function UsersListItem({ user, onDoubleClick }) {
  const { username } = user;
  return (
    <li className={`card ${s.card}`} onDoubleClick={() => onDoubleClick(user)}>
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
