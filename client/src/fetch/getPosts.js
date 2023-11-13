const getPosts = async () => {
  try {
    const response = await fetch("http://localhost:8080/feed/posts");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch feed posts");
    }
  } catch (error) {
    console.error("Error while fetching feed posts:", error);
  }
};

export default getPosts;
