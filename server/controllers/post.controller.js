import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// create post
export const post = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    const result = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { id: authorId } },
      },
    });
    res.json(result);
  } catch (error) {
    console.error(error.message);
  }
};

// get all posts
export const getAllPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  res.json(posts);
};

//get a post
export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        author: true,
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error.message);
  }
};

// update a post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(id) || undefined,
      },
      data: {
        title,
        content,
      },
    });
    res.json(updatedPost);
  } catch (error) {
    console.log(error.message);
  }
};

// delete a post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deletedPost);
  } catch (error) {
    console.log(error.message);
  }
};
