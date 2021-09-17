const Doctors = require("../models/DoctorModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Search, filter, sort and paginate
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString }; // = req.query

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

const DoctorCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const doctor = await Doctors.findOne({ email });
      if (doctor)
        return res.status(400).json({ msg: "The email is already existed." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password mus be at least 6 character longs." });

      //Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newDoctor = new Doctors({
        name,
        email,
        password: passwordHash,
      });

      //Save to MongoDB
      await newDoctor.save();

      //Then create jsonwebtoken to authentication
      const accessToken = createAccessToken({ id: newDoctor._id });
      const refreshToken = createRefreshToken({ id: newDoctor._id });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/doctor/refresh_token",
      });

      res.json({
        msg: `${email} has been successfully created as Doctor account!`,
        accessToken,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const doctor = await Doctors.findOne({ email });
      if (!doctor) return res.status(400).json({ msg: "User does not exist." });

      const isMatch = await bcrypt.compare(password, doctor.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect Password." });

      //If login success, generate access token and refresh token
      const accessToken = createAccessToken({ id: doctor._id });
      const refreshToken = createRefreshToken({ id: doctor._id });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/doctor/refresh_token",
      });

      res.json({
        msg: `${email} has been successfully logged in as Doctor.`,
        accessToken,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/doctor/refresh_token" });
      return res.json({ msg: "Logged out!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
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
        (err, doctor) => {
          if (err)
            return res.status(400).json({ msg: "Please Login or Register." });

          const accessToken = createAccessToken({ id: doctor.id });

          res.json({ doctor, accessToken });
        },
      );

      // res.json({ rf_token });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getDoctor: async (req, res) => {
    try {
      const doctor = await Doctors.findById(req.doctor.id)
        .select("-password")
        .populate({
          path: "district",
          select: "-createdAt -updatedAt -__v",
          populate: {
            path: "city",
            select: "-createdAt -updatedAt -__v",
          },
        });
      if (!doctor) return res.status(400).json({ msg: "User does not exist." });

      res.json(doctor);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllDoctor: async (req, res) => {
    try {
      const features = new APIfeatures(
        Doctors.find()
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

      const doctors = await features.query;

      res.json({
        status: "Success",
        results: doctors.length,
        data: doctors,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteDoctorByID: async (req, res) => {
    try {
      await Doctors.findByIdAndDelete(req.params.id);
      res.json({ msg: `Doctor ${req.params.id} has been deleted.` });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  /**
   * Update doctor info by ID
   */
  updateDoctorImgByID: async (req, res) => {
    try {
      const { img } = req.body;

      if (!img)
        return res.status(400).json({ msg: "No image provided. " });

      await Doctors.findByIdAndUpdate(
        { _id: req.doctor.id },
        {
          img,
        },
      );

      res.json(img)
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateDoctorCertificateByID: async (req, res) => {
    try {
      const { certificate } = req.body;

      if (!certificate)
        return res.status(400).json({ msg: "No certificate provided. " });

      await Doctors.findByIdAndUpdate(
        { _id: req.doctor.id },
        {
          certificate,
        },
      );

      res.json(certificate)
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateDoctorByID: async (req, res) => {
    try {
      const { name, district, phone, experience } = req.body;

      // const doctor = await Doctors.findOne({ email })
      // if (doctor) return res.status(400).json({ msg: "The email is already existed." })

      if (phone.length !== 10)
        return res.status(400).json({ msg: "Phone has 10 numbers." });

      if (!district)
        return res.status(400).json({ msg: "District is required." });

      if (!experience)
        return res.status(400).json({ msg: "Experience is required." });

      if (isNaN(phone))
        return res.status(400).json({ msg: "Phone only contains number." });

      // const passwordHash = await bcrypt.hash(password, 10)

      // await Doctors.findOneAndUpdate(
      //   { _id: req.params.id },
      const doctor = await Doctors.findByIdAndUpdate(
        { _id: req.doctor.id },
        {
          name,
          district,
          phone,
          experience,
        },
      );

      res.json({ msg: `Information of Dr.${name} has been updated.` });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  /**
   * Update doctor password by ID
   */
  updateDoctorPasswordByID: async (req, res) => {
    try {
      const { password } = req.body;

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password mus be at least 6 character longs." });

      const passwordHash = await bcrypt.hash(password, 10);

      const doctor = await Doctors.findByIdAndUpdate(
        { _id: req.doctor.id },
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

const createAccessToken = (doctor) => {
  return jwt.sign(doctor, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "1d",
  });
};
const createRefreshToken = (doctor) => {
  return jwt.sign(doctor, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: "7d",
  });
};

module.exports = DoctorCtrl;
