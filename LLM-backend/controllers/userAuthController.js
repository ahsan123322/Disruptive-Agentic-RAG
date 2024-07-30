import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//Register
const registerController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Fill Required Fields",
      });
    }
    // email Check if already regitered or not
    const emailCheck = await userModel.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({
        success: false,
        message: "Email Already Registered",
      });
    }
    // pasword hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    // saving new user
    const newUser = new userModel({ email, password: hashedPassword });
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "Signup Successfully",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Fill Required Fields",
      });
    }
    // email check
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not Registered",
      });
    }
    // passwordCheck
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(401).json({
        success: false,
        message: "Passowrd is incorrect",
      });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWTKEY,
      { expiresIn: "2hr" }
    );
    // logging in the user
    const { password: pass, ...info } = user._doc;
    res
      .cookie("token", token, {
        sameSite: "none",
        httpOnly: true,
        secure: true,
      })
      .status(201)
      .json(info);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const logoutController = async (req, res) => {
  try {
    await res
      .cookie(
        "token",
        { maxAge: 0 },
        {
          path: "/",
          sameSite: "none",
          httpOnly: true,
          secure: true,
        }
      )
      .status(200)
      .json({
        success: true,
        message: "User Logout Successfully",
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const refetchUser = (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, {}, (err, data) => {
    if (err) {
      return res.status(404).json({ message: err });
    }
    return res.status(200).json(data);
  });
};
export { registerController, loginController, logoutController, refetchUser };
