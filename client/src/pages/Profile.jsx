import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getUserData from "../fetch/getUser";

function Profile() {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    bio: "",
    location: "",
    imageURL: "",
  });

  const [message, setMessage] = useState("");

  // Fetch user data

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image input change
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData({ ...formData, imageURL: selectedFile });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form data: ", formData);

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(
        `http://localhost:8080/api/user/update/${formData.userId}`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log("Response:", data);

      // if (response.ok) {
      //   setMessage("Profile updated successfully");
      // } else {
      //   setMessage("Profile update failed");
      // }
    } catch (error) {
      setMessage("Profile update error: " + error);
    }
    console.log("Form Data:", formData);
  };

  useEffect(() => {
    getUserData().then((data) => setFormData(data));
  }, []); // Fetch user data on initial load

  return (
    <div className="pt-10 px-96">
      <p className="message text-red-600">{message}</p>
      <Link to="/home">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Home
        </button>
      </Link>
      <div className="text-center mb-6">
        <img
          src={formData.imageURL} // Replace with the URL of the user's profile image
          alt={`${formData.username}'s profile`}
          className="w-32 h-32 rounded-full mx-auto"
        />
        <div className="pt-10">
          <input
            type="file"
            onChange={handleImageChange}
            className="hidden"
            id="imageInput"
          />

          <label
            htmlFor="imageInput"
            className="cursor-pointer bg-slate-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-3">
            Select Image
          </label>

          <button
            onClick={handleSubmit}
            className="bg-slate-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Upload Image
          </button>
        </div>
        <h1 className="text-2xl font-bold mt-4">
          {formData.username?.toUpperCase()}
        </h1>
        <p className="text-gray-600">{formData.bio}</p>
        <p className="text-gray-500">{formData.location}</p>
      </div>

      <div className="p-4 bg-white rounded shadow mb-4">
        <h2 className="text-xl font-semibold mb-2">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              className="block text-gray-600 font-semibold"
              htmlFor="username">
              Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-600 font-semibold" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.bio}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-600 font-semibold"
              htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
