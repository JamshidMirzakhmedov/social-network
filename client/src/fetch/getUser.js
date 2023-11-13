const getUserData = async () => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch("http://localhost:8080/api/user/me", {
      headers,
    });

    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      return "Profile fetch request failed";
    }
  } catch (error) {
    return "Profile fetch error: " + error;
  }
};
export default getUserData;
