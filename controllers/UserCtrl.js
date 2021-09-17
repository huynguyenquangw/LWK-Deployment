const Users = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Search, filter, sort and paginate
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((ex) => delete queryObj[ex]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match,
    );

    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 1;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password, role, district, phone } = req.body;

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "The email is already existed." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters long." });

      if (role > 2 && role < 1)
        return res.status(400).json({ msg: "Role is only 0 or 1." });

      if (phone.length !== 10)
        return res.status(400).json({ msg: "Phone has 10 numbers." });

      if (isNaN(phone))
        return res.status(400).json({ msg: "Phone only contains number." });

      //Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
        role,
        district,
        // city,
        phone,
      });

      //Save to MongoDB
      await newUser.save();

      //Then create JSON web token
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      // res.json({ accessToken })
      res.json({
        msg: `Email ${email} has successfully registered!`,
        accessToken,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect Password." });

      //If login success, create access token and refresh token
      const accessToken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      res.json({
        msg: `Successfully login as ${email}!`,
        accessToken,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Log out successfully!" });
    } catch (error) {
      return res.status.status(500).json({ msg: error.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register." });

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET_KEY,
        (err, user) => {
          if (err)
            return res.status(400).json({ msg: "Please Login or Register." });

          const accesstoken = createAccessToken({ id: user.id });

          res.json({ user, accesstoken });
        },
      );
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id)
        .select("-password")
        .populate({
          path: "district",
          select: "-createdAt -updatedAt -__v",
          populate: {
            path: "city",
            select: "-createdAt -updatedAt -__v",
          },
        });
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      res.json(user);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllPatient: async (req, res) => {
    try {
      const features = new APIfeatures(
        Users.find({ role: 0 })
          .select("-password")
          .populate({
            path: "district",
            select: "-createdAt -updatedAt -__v",
            populate: {
              path: "city",
              select: "-createdAt -updatedAt -__v",
            },
          }),
        req.query,
      )
        .filter()
        .sort()
        .paginate();

      const patients = await features.query;

      res.json({
        status: "Success",
        results: patients.length,
        data: patients,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  /**
   * Update patient info by ID
   */
  updatePatientByID: async (req, res) => {
    try {
      const { name, img, district, phone } = req.body;

      if (isNaN(phone))
        return res.status(400).json({ msg: "Phone only contains number." });

      const user = await Users.findByIdAndUpdate(
        { _id: req.user.id },
        {
          name,
          img,
          district,
          phone,
        },
      );

      res.json({ msg: `Information of Pt.${name} has been updated.` });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  /**
   * Update user password by ID
   */
  updateUserPasswordByID: async (req, res) => {
    try {
      const { password } = req.body;

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password mus be at least 6 character longs." });

      const passwordHash = await bcrypt.hash(password, 10);

      // await Users.findOneAndUpdate(
      //   { _id: req.params.id },
      const user = await Users.findByIdAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        },
      );

      res.json({ msg: `Password has been updated.` });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: "7d",
  });
};

module.exports = userCtrl;
