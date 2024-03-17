require("dotenv").config(); //for env file
const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./db/connect");
const productSchema = require("./models/product");
const app = express();
const usersSchema = require("./models/user");

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Server is running ");
});
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    console.log(file);
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`,
  });
});

//Creating api for add products
app.post("/addproduct", async (req, res) => {
  let products = await productSchema.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  await productSchema.create({
    id: id,
    name: req.body.name,
    image: req.body.images,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  res.json({
    success: 1,
    name: req.body.name,
  });

  console.log("product add successFully!!");
});

//Creating api for removing products
app.post("/removeproduct", async (req, res) => {
  const deleteproduct = await productSchema.findOneAndDelete({
    id: req.body.id,
  });
  console.log(deleteproduct);
  res.json({
    success: true,
    name: deleteproduct.name,
  });
});

//creating api for getting all products
app.get("/allproducts", async (req, res) => {
  let products = await productSchema.find({});
  console.log("all product fetched");
  res.send(products);
});

// creating endpoint for user login
app.post("/signup", async (req, res) => {
  console.log(req.body);
  let check = await usersSchema.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "existing user found with same email address.",
    });
  } else {
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    const user = await usersSchema.create({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });
    // console.log(user._id);

    const data = {
      user: {
        id: user._id,
      },
    };
    const token = jwt.sign(data, "secret_ecom");
    res.json({ success: true, token });
  }
});

app.post("/login", async (req, res) => {
  // console.log("req.body>>>>>>>>>>>>", req.body);
  let user = await usersSchema.findOne({ email: req.body.email });
  // console.log("database user>>>>>", user);
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user._id,
        },
      };

      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong email id" });
  }
});

// creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using valid token" });
    console.log("Please authenticate using valid token");
  } else {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  }
};

// creating endpoint for adding products in cartdata

app.post("/addtocart", fetchUser, async (req, res) => {
  let userData = await usersSchema.findOne({ _id: req.user.id });

  userData.cartData[req.body.itemId] += 1;

  await usersSchema.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("added");
});

// creating endpoint for remove products in cart

app.post("/removefromcart", fetchUser, async (req, res) => {
  // console.log(res.body,req.user);
  let userData = await usersSchema.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
    await usersSchema.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
  }
  res.send("removed");
});

// createing endpoint to get cartdata
app.post("/getcart", fetchUser, async (req, res) => {
  let userData = await usersSchema.findOne({ _id: req.user.id });
  res.json(userData.cartData);
  console.log(userData.cartData);
});

// Creating endpoint for newcollection data

app.get("/newcollection", async (req, res) => {
  let products = await productSchema.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("new collection fetched ");

  res.send(newcollection);
});

app.get("/popularinwomen", async (req, res) => {
  let products = await productSchema.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  console.log("/popular in women fetched ");

  res.send(popular_in_women);
});

app.listen(process.env.PORT, async () => {
  try {
    // mongoDB connection
    await connectDB();
    console.log("server is running!!");
  } catch (error) {
    console.log(error);
  }
});
