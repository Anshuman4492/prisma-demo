import prisma from "../prisma/index.js";
// Create a new Post
export const createPost = async (req, res, next) => {
  try {
    const { slug, title, body, authorId } = req.body;
    // Do some validation on above field

    const result = await prisma.post.create({
      data: {
        slug,
        title,
        body,
        author: { connect: { id: authorId } },
      },
    });
    res.json(result);
  } catch (error) {
    throw new Error(error);
  }
};
// Update a post
export const updatePost = async (req, res, next) => {
  const { postId } = req.params;
  const { title, body } = req.body;
  try {
    const result = await prisma.post.update({
      where: { id: postId },
      data: {
        title: title,
        body: body,
      },
    });
    res.json(result);
  } catch (error) {
    res.json({ error: `Post with ${postId} does not exist` });
  }
};
// Delete a post
export const deletePost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const result = await prisma.post.delete({
      where: { id: postId },
    });
    res.json(result);
  } catch (error) {
    res.json({ error: `Post with ${postId} does not exist` });
  }
};

// Get All Posts
export const getPosts = async (req, res, next) => {
  try {
    const result = await prisma.post.findMany();
    res.json(result);
  } catch (error) {
    res.json({ error: `No Post found` });
  }
};
