import { useState, useEffect } from "react";
import CreatePost from "../components/CreatePost";
import getPosts from "../fetch/getPosts";
import getUserData from "../fetch/getUser";

function Feed() {
  const [feedPosts, setFeedPosts] = useState([]);
  const [user, setUser] = useState({});
  const [editingPost, setEditingPost] = useState({
    title: "",
    content: "",
  });
  const [editFormVisible, setEditFormVisible] = useState(false);

  useEffect(() => {
    getPosts().then((data) => setFeedPosts(data));
    getUserData().then((data) => setUser(data));
  }, []);

  const formatCreatedAt = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const handleEditPost = async (post) => {
    setEditingPost(post);
    setEditFormVisible(true);
    await fetch(`http://localhost:8080/post/update/${editingPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingPost),
    });

    getPosts().then((data) => setFeedPosts(data));
  };

  const handleDeletePost = async (postId) => {
    await fetch(`http://localhost:8080/api/post/${postId}`, {
      method: "DELETE",
    });
    getPosts().then((data) => setFeedPosts(data));
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Feed</h1>
      <CreatePost setFeedPosts={setFeedPosts} />
      {feedPosts?.map((post) => (
        <div key={post.id} className="bg-gray-100 p-4 my-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            {user.userId === post.authorId && (
              <div className="mt-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                  onClick={() => handleEditPost(post)}>
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDeletePost(post.id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
          <p className="text-gray-600 mb-2">Author: {post.author.username}</p>
          <p className="text-gray-700">{post.content}</p>
          <p className="text-gray-500 mt-2">
            Posted {formatCreatedAt(post.createdAt)}
          </p>
        </div>
      ))}
      {editFormVisible && editingPost && (
        <div className="bg-gray-100 p-4 my-4 rounded-lg">
          <h3>Edit Post</h3>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleEditPost(editingPost);
            }}>
            <div className="mb-2">
              <label
                className="block text-gray-600 font-semibold"
                htmlFor="editTitle">
                Title
              </label>
              <input
                type="text"
                id="editTitle"
                className="w-full p-2 border border-gray-300 rounded"
                value={editingPost.title}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, title: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-gray-600 font-semibold"
                htmlFor="editContent">
                Content
              </label>
              <textarea
                id="editContent"
                className="w-full  p-5 border border-gray-300 rounded"
                value={editingPost.content}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, content: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              onClick={() => {
                handleEditPost(editingPost);
                setEditFormVisible(false);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Feed;
