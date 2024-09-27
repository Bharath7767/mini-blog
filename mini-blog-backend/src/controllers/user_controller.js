const { generateToken } = require('../utils/auth');
const { User } = require('../models/user')
const user_crud = require("../crud/user_crud")

const getAllUsers = async(req, res) => {
    try {
       const users = await user_crud.getAllUsers();
       res.status(200).json(users); 
    } catch (error) {
        res.status(500).json({error : "Failed to fetch users"});
    }
};

const getUserById = async(req, res) => {
    const {id} = req.params;
    try {
        const user = await user_crud.getUserById(id);
        if(user){
            res.status(200).json(user)
         } else{
            res.status(500).json({error : "User not found"})
            }
    } catch (error) {
        res.status(500).json({error : "Failed to fetch an User"})
    }
};

const createUser = async(req, res) => {
    const {name, email, password} = req.body;
    try {
        const newUser = await user_crud.createUser({name, email, password})
        res.status(201).send(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({error : "Failed to create an User"})
    }
};

const signup = async(req,res) =>{
    const {name, email, password} = req.body;
    try {
        await user_crud.createUser({
            name: name,
            email: email,
            password: password
        });
        res.status(201).json({message : "User Signup successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "Failed to create User"})
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !(await user.validatePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);
        const userId = user.id;

        res.cookie('token', token,userId,{
            httpOnly: true,secure: process.env.NODE_ENV === 'production', 
            maxAge: 60 * 60 * 1000, 
         });

        res.status(200).json({ message: 'Login successful',userId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to login" });
    }
};

const updateUser = async(req,res) => {
    const { id } = req.params;
    const{ name, email } = req.body;
    try {
        const user = await user_crud.getUserById(id);
        if(user){
            user.name = name;
            user.email = email;
            await user.save();
            res.status(200).json(user)
        }else{
            res.status(404).json({error : "User not found"});
        }
    } catch (error) {
        res.status(500).json({error : "Failed to update User"});
    }
};

const deleteUser = async(req,res) => {
    const { id } = req.params;
    try {
        const user = await user_crud.getUserById(id);
        if(user){
            await user_crud.deleteUser(id);
            res.status(204).json({error : "User deleted"});
        }else{
            res.status(404).json({error : "User not found"});
        }
    } catch (error) {
        res.status(500).json({error : "Failed to delete User"});
    }    
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    signup,
    login
}