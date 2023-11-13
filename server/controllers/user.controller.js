import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get all users
export const getUsers = async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany({
      include: { posts: true },
    });
    res.json(allUsers);
  } catch (error) {
    console.log(error.message);
  }
};

// get a user
export const user = async (req, res) => {
  try {
    const userData = req.user;
    res.json(userData);
  } catch (error) {
    console.log(error.message);
  }
};

// update a user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, bio, location, imageURL } = req.body;
    // const { filename } = req.file;
    console.log(req.body);

    const updatedUser = await prisma.user.update({
      where: {
        id: Number(id) || undefined,
      },
      data: {
        username: username,
        bio: bio,
        location: location,
        imageURL: imageURL,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.log(error.message);
  }
};

// delete a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json(deletedUser);
  } catch (error) {
    res.status(400).json("no user");
    console.log(`could not find user with id:`);
  }
};

export const addFriend = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    // // Check if the users exist
    // const sender = await prisma.user.findUnique({ where: { id: senderId } });
    // const receiver = await prisma.user.findUnique({
    //   where: { id: receiverId },
    // });

    // if (!sender || !receiver) {
    //   throw new Error("User not found");
    // }

    // // Check if a friendship record already exists
    // const existingFriendship = await prisma.friendship.findFirst({
    //   where: {
    //     OR: [
    //       { senderId, receiverId },
    //       { senderId: receiverId, receiverId: senderId },
    //     ],
    //   },
    // });

    // if (existingFriendship) {
    //   throw new Error("Friendship already exists");
    // }

    // Create a new friendship record
    const friendship = await prisma.friendship.create({
      data: {
        senderId,
        receiverId,
      },
    });
    res.json(friendship);
  } catch (error) {
    console.log(error.message);
  }
};
