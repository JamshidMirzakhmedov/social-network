import express from "express";
import cors from "cors";
import { signup, login } from "./controllers/auth.controller.js";
import {
  addFriend,
  deleteUser,
  getUsers,
  updateUser,
  user,
} from "./controllers/user.controller.js";
import {
  deletePost,
  getAllPosts,
  getPost,
  post,
  updatePost,
} from "./controllers/post.controller.js";
import authenticateToken from "./middleware/jwt.middleware.js";

const app = express();

app.use(cors());
app.use("/api/signin", cors());
app.use("/api/signup", cors());
app.use(express.json());

// sign up
app.post("/api/signup", signup);

// login
app.post("/api/signin", login);

//get all users
app.get("/users", getUsers);

// get a user
app.get("/api/user/me", authenticateToken, user);

// update a user

app.put("/api/user/update/:id", updateUser);

// delete a user
app.delete("/user/:id", deleteUser);

// add a friend
// app.post("/addFriend", addFriend);

// create post
app.post("/api/post", post);

// get a post
app.get("/post/:id", getPost);

// get all posts
app.get("/feed/posts", getAllPosts);

// update a post
app.put("/post/update/:id", updatePost);

// delete a post
app.delete("/api/post/:id", deletePost);

app.listen(8080, () => console.log("listening on 8080"));
