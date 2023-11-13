import { useState } from "react";
import { NavLink } from "react-router-dom";

function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.accessToken && data.refreshToken) {
          // Store the JWT token in local storage
          localStorage.setItem("token", data.accessToken);

          // Redirect to another page  using React Router
          window.location.replace("/profile");
        } else {
          setMessage("No token received in the response");
        }
      } else {
        setMessage("Sign-in request failed");
        // Handle sign-in errors (e.g., display an error message to the user)
      }
    } catch (error) {
      setMessage("Sign-in request failed");
      // Handle sign-in errors (e.g., display an error message to the user)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-72 p-4 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
        {/* failed message */}
        <p className="text-red-500">{message}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="w-full p-2 mb-2 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full p-2 mb-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Sign In
          </button>
        </form>
        <p className="text-sm m-2">
          if you don't have an account
          <NavLink to="/signup" className="text-red-500">
            {" "}
            Sign Up{" "}
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
