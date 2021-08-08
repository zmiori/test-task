import s from "./UserFeed.module.css";
import { Droppable } from "react-beautiful-dnd";

import UsersListItem from "../UsersListItem";

function UserFeed({ isLoggedIn, user }) {
  return (
    <section className={s.feed}>
      <h2> My Feed</h2>
      {isLoggedIn ? (
        <Droppable droppableId="current-user-feed">
          {(provided, snapshot) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={s.list}
            >
              {user.feed.map((card, index) => (
                <UsersListItem key={card.id} user={card} itemIndex={index} />
              ))}
            </ul>
          )}
        </Droppable>
      ) : (
        "sign up to create your feed"
      )}
    </section>
  );
}

export default UserFeed;
