import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import getUserData from "../fetch/getUser";

function UserProfileLink() {
  const [user, setUser] = useState({});
  useEffect(() => {
    getUserData().then((data) => setUser(data));
  }, []);

  return (
    <div className="text-center">
      <img
        src={user.imageURL}
        alt={`${user.username}'s profile`}
        className="w-16 h-16 rounded-full mx-auto mb-1"
      />
      <Link to="/profile" className="text-blue-500 hover:underline">
        {user.username}
      </Link>
    </div>
  );
}

export default UserProfileLink;
