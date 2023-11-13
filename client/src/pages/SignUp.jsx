import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Extract the user's chosen username and password
    const { username, password } = formData;

    // Implement registration logic here
    fetch("http://localhost:8080/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful registration
        navigate("/signin");
      })
      .catch((error) => {
        // Handle registration errors
        setErrors("username already exists...", error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-72 p-4 bg-blue-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
        {errors && <p className="text-red-500 m-2">{errors}</p>}
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
            className="w-full p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Sign Up
          </button>
        </form>
        <p className="text-sm m-2">
          if you don't have an account
          <NavLink to="/signin" className="text-red-500">
            {" "}
            Sign In{" "}
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
