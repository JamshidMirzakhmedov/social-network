import { useEffect } from "react";
import { useState } from "react";
import getPosts from "../fetch/getPosts";
import getUserData from "../fetch/getUser";

function CreatePost({ setFeedPosts }) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    getUserData().then((data) =>
      setFormData({ ...formData, authorId: data.userId })
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the submission of the post data here, for example, by making an API request.
    await fetch("http://localhost:8080/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    console.log("Form Data:", formData);
    // Reset the form
    setFormData({ title: "", content: "" });
    getPosts().then((data) => setFeedPosts(data));
  };

  return (
    <>
      <button
        onClick={() => setShow(!show)}
        className={
          (show
            ? " bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600") +
          " text-sm text-white px-2 py-1 rounded "
        }>
        {show ? "Close" : "Create Post"}
      </button>
      <div
        className={show ? `bg-white p-4 rounded-lg shadow-lg h-30` : "hidden"}>
        <h2 className="text-l font-semibold mb-4">Create Post</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold text-sm"
              htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 text-sm border font-semibold border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-600 font-semibold text-sm"
              htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full p-1 border text-sm border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-sm text-white px-2 py-1 rounded hover:bg-blue-600">
            Create Post
          </button>
        </form>
      </div>
    </>
  );
}

export default CreatePost;
