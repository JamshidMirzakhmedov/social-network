import { useState, useEffect } from "react";

function FriendList() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // Simulate fetching friend list from an API or database
    // Replace this with your actual data retrieval logic

    const fetchData = async () => {
      try {
        // Replace with your actual API endpoint to fetch friends
        const response = await fetch("http://localhost:8080/users");
        if (response.ok) {
          const data = await response.json();
          setFriends(data);
        } else {
          console.error("Failed to fetch friends");
        }
      } catch (error) {
        console.error("Error while fetching friends:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Friend List</h2>
      <ul className="divide-y divide-gray-200">
        {friends.map((friend) => (
          <li key={friend.id} className="py-2">
            <div className="flex items-center">
              <img
                src={friend.imageURL}
                alt={`${friend.username}'s profile`}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-gray-800">{friend.username}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FriendList;
