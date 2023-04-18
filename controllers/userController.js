const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};
const loadRegister = async (req, res) => {
  try {
    res.render("user/signup", { title: "SignUp-page" });
  } catch (error) {
    console.log(error.message);
  }
};
const insertUser = async (req, res) => {
  try {
    const existingEmail = await User.findOne({ email: req.body.email });
    const existingUsername = await User.findOne({ name: req.body.name });

    if (existingEmail) {
      return res.status(409).render("user/signup", {
        success: false,
        message: "Email already taken",
      });
    }
    if (existingUsername) {
      return res.status(409).render("user/signup", {
        success: false,
        message: "Username already taken",
      });
    }
    const sPassword = await securePassword(req.body.password);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: sPassword,
      is_admin: 0,
    });

    const userData = await user.save();

    if (userData) {
      res.status(200).render("user/login", {
        success: true,
        message: "Your registration has been successful.",
      });
    } else {
      res.status(500).render("user/signup", {
        success: false,
        message: "Your registration has been failed.",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//login user methods started
const loginLoad = async (req, res) => {
  try {
    res.render("user/login", { title: "Login-Page" });
  } catch (error) {
    console.log(error.message);
  }
};

const verifyLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userData = await User.findOne({ email: email });
    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (passwordMatch) {
        if (userData.is_admin === 1) {
          res
            .status(403)
            .render("user/login", {
              message: "Forbidden: Unauthorized access",
            });
        } else {
          req.session.user_id = userData._id;
          res.redirect(302, "/home");
        }
      } else {
        res.render("user/login", {
          message: "Login credentials are incorrect",
        });
      }
    } else {
      res.render("user/login", { message: "Login credentials are incorrect" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadHome = async (req, res) => {
  try {
    res.render("user/home", { title: "Home-Page" });
  } catch (error) {
    console.log(error.message);
  }
};
const userLogout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  loadRegister,
  insertUser,
  loginLoad,
  verifyLogin,
  loadHome,
  userLogout,
};
