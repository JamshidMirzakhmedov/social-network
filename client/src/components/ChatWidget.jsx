import { useState, useEffect } from "react";

function ChatWidget() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Simulate fetching chat data from an API or database
    // Replace this with your actual data retrieval logic

    const fetchData = async () => {
      try {
        // Replace with your actual API endpoint to fetch chat data
        const response = await fetch("/api/chats");
        if (response.ok) {
          const data = await response.json();
          setChats(data);
        } else {
          console.error("Failed to fetch chats");
        }
      } catch (error) {
        console.error("Error while fetching chats:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Chat</h2>
      <ul className="divide-y divide-gray-200">
        <li className="py-2">
          <div className="flex items-center">
            <img
              src="https://i.imgur.com/8Km9tLL.png"
              alt={`'s profile`}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-gray-800">John Nick</span>
          </div>
        </li>
        {chats.map((chat) => (
          <li key={chat.id} className="py-2">
            <div className="flex items-center">
              <img
                src={chat.friendProfileImage}
                alt={`${chat.friendName}'s profile`}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-gray-800">{chat.friendName}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatWidget;
