const post_crud = require('./../crud/posts_crud');
const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/')); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  } 
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 20 }, 
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Images only!'));
    }
  }
});


const getAllPosts = async (req, res) => {
  try {
    const posts = await post_crud.getAllPosts();
    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      name: post.User ? post.User.name : null, 
      image: post.image || null, 
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      userId: post.userId,
    }));
    res.status(200).json(formattedPosts);
  } catch (error) {
    res.status(500).json({ message: "Cannot fetch posts now, check it later." });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await post_crud.getPostById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    const formattedPost = {
      id: post.id,
      title: post.title,
      content: post.content,
      name: post.User ? post.User.name : null,
      image: post.image || null,  
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
    res.status(200).json(formattedPost);
  } catch (error) {
    res.status(500).json({ message: "Cannot fetch post by ID" });
  }
};

const getPostsByCategory = async (req, res) => {
  try {
    const { category } = req.params; 
    const posts = await post_crud.getPostsByCategory(category);
    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      category: post.category, 
      name: post.User ? post.User.name : null, 
      image: post.image || null, 
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      userId: post.userId,
    }));
    res.status(200).json(formattedPosts);
  } catch (error) {
    res.status(500).json({ message: "Cannot fetch posts by category at the moment." });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const image = req.file ? req.file.filename : null;  

    const post = await post_crud.createPost({
      title: title,
      content: content,
      image: image,  
      userId: req.user.id,
      category: category,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;
    const image = req.file ? req.file.filename : null;  

    const post = await post_crud.updatePost(id,{
      title: title,
      content: content,
      image: image,
      category: category,
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await post_crud.deletePost(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  upload,
  getPostsByCategory,
};
