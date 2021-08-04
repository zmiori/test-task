import { useState } from "react";
import s from "./UserSort.module.css";

function UserSort({ sortUsers }) {
  const [sortOption, setSortOption] = useState("username");

  function handleChange(e) {
    setSortOption(e.target.value);
    sortUsers(e.target.value);
  }
  return (
    <>
      <label>
        Sort users by:
        <select
          className="browser-default"
          value={sortOption}
          onChange={handleChange}
        >
          <option value="username">Username</option>
          <option value="email">Email</option>
          <option value="adress.city">City</option>
          <option value="website">Website</option>
        </select>
      </label>
    </>
  );
}

export default UserSort;
