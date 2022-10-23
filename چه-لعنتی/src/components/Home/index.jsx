import React, { useEffect, useState } from "react";
import { useAPI } from "../../api/APIContext";

const Home = () => {
  const apiContext = useAPI();
  const { userAPI } = apiContext;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const unsub = userAPI.getAll(setUsers);
    return unsub;
  }, [userAPI]);
  return (
    <div>
      <button type="button" onClick={() => userAPI.add({ name: "test" })}>
        Add User
      </button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
