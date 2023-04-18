const User = require("../models/userModel");
const bcrypt = require("bcrypt");
var db = require("../config/mongoose");
var collection = require("../config/collection");
var objectId = require("mongodb").ObjectId;

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};
const loadLogin = async (req, res) => {
  try {
    res.status(200).render("admin/login", { title: "Admin-Panel" });
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
        if (userData.is_admin === 0) {
          res
            .status(500)
            .render("admin/login", {
              message: "Email and password is incorrect",
            });
        } else {
          req.session.user_id = userData._id;
          res.status(200).redirect("/admin/home");
        }
      } else {
        res
          .status(500)
          .render("admin/login", {
            message: "Email and password is incorrect",
          });
      }
    } else {
      res
        .status(500)
        .render("admin/login", { message: "Email and password is incorrect" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadDashboard = async (req, res) => {
  try {
    var search = "";
    if (req.query.search) {
      search = req.query.search;
    }
    const usersData = await db
      .get()
      .collection(collection.USER_COLLECTION)
      .find({
        is_admin: 0,
        $or: [
          { name: { $regex: ".*" + search + ".*", $options: "i" } },
          { email: { $regex: ".*" + search + ".*", $options: "i" } },
        ],
      })
      .toArray();
    res.render("admin/home", { usersData, admin: true, title: "Dashboard" });
    console.log(usersData);
  } catch (error) {
    console.log(error.message);
  }
};
const logOut = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/admin");
  } catch (error) {
    console.log(error.message);
  }
};
const adminDashboard = async (req, res) => {
  try {
    var search = "";
    if (req.query.search) {
      search = req.query.search;
    }

    const usersData = await db
      .get()
      .collection(collection.USER_COLLECTION)
      .find({
        is_admin: 0,
        $or: [
          { name: { $regex: ".*" + search + ".*", $options: "i" } },
          { email: { $regex: ".*" + search + ".*", $options: "i" } },
        ],
      })
      .toArray();
    // const usersData=await User.find({is_admin:0});
    res
      .status(200)
      .render("admin/users", { user: true, title: "All Users", usersData });
    console.log(usersData.email);
  } catch (error) {
    console.log(error.message);
  }
};

const adminProducts = async (req, res) => {
  try {
    res.render("admin/products", { product: true, title: "All Products" });
  } catch (error) {
    console.log(error.message);
  }
};

//========Add new User==========

const newUserLoad = async (req, res) => {
  try {
    res.render("admin/new-user");
  } catch (error) {
    console.log(error.message);
  }
};

const addUser = async (req, res) => {
  try {
    const existingEmail = await db
      .get()
      .collection(collection.USER_COLLECTION)
      .findOne({ email: req.body.email });
    const existingUsername = await db
      .get()
      .collection(collection.USER_COLLECTION)
      .findOne({ name: req.body.name });

    if (existingEmail) {
      return res.status(409).render("admin/new-user", {
        success: false,
        message: "Email already taken",
      });
    }
    if (existingUsername) {
      return res.status(409).render("admin/new-user", {
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
      res.redirect("/admin/users");
    } else {
      res.status(500).render("admin/users", {
        success: false,
        message: "Your registration has been failed.",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//edit user-functionality
const editUserLoad = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await db
      .get()
      .collection(collection.USER_COLLECTION)
      .findOne({ _id: new objectId(id) });
    if (userData) {
      res.render("admin/edit-user", { userData });
    } else res.redirect("admin/home");
  } catch (error) {
    console.log(error.message);
  }
};
const updateUser = async (req, res) => {
  try {
    const { id, name, email } = req.body;
    const existingEmailUser = await User.findOne({ email });
    const existingNameUser = await User.findOne({ name });
    if (existingEmailUser && existingEmailUser._id.toString() !== id) {
      return res
        .status(400)
        .render("admin/edit-user", {
          message: "Email already exists in the database",
        });
    }
    if (existingNameUser && existingNameUser._id.toString() !== id) {
      return res
        .status(400)
        .render("admin/edit-user", {
          message: "Name already exists in the database",
        });
    }
    const userData = await User.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
        },
      }
    );
    res.redirect("/admin/users");
  } catch (error) {
    console.log(error.message);
  }
};
//DeleteUser
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await db
      .get()
      .collection(collection.USER_COLLECTION)
      .findOneAndDelete({ _id: new objectId(id) });
    res.redirect("/admin/users");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  loadLogin,
  verifyLogin,
  loadDashboard,
  logOut,
  adminDashboard,
  adminProducts,
  newUserLoad,
  addUser,
  editUserLoad,
  updateUser,
  deleteUser,
};