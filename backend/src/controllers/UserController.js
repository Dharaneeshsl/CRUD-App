import UserModels from "../models/UserModels.js";

export const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await UserModels.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new UserModels(req.body);
    const savedData = await user.save();

    res.status(201).json(savedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModels.find();
    if (!users || users.length == 0) {
      return res.status(404).json({ message: "No users Found" })
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getUserById = async (req, res) => {
  try {
    const user = await UserModels.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const UpdateUser = async (req, res) => {
  try {
    const userid = await UserModels.findById(req.params.id)
    if (!userid) {
      return res.status(404).json({ message: "User not found" });
    }
    const Updateduser = await UserModels.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!Updateduser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(Updateduser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const DeleteUser = async (req, res) => {
  try {
    const userid = await UserModels.findById(req.params.id)
    if (!userid) {
      return res.status(404).json({ message: "User not found" });
    }
    const Deleteduser = await UserModels.findByIdAndDelete(req.params.id);
    if (!Deleteduser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(Deleteduser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};