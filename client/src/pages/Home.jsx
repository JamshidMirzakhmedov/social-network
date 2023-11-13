import ChatWidget from "../components/ChatWidget";
import FriendList from "../components/FriendList";
import UserProfileLink from "../components/UserProfileLink";
import Feed from "./Feed";

function Home() {
  return (
    <div className="flex mt-2">
      <div className="w-3/4">
        <div className="p-4">
          <Feed />
        </div>
      </div>
      <div className="w-1/4 fixed top-0 right-0">
        <div className="p-4">
          <div className="mb-4">
            <FriendList />
          </div>
          <div className="mb-4">
            <ChatWidget />
          </div>
          <div>
            <UserProfileLink />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
