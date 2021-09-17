const mongoose = require("mongoose");
const Districts = require("../models/DistrictModel");
const Cities = require("../models/CityModel");

const DistrictCtrl = {
  /**
   * Create district
   */
  addDistrict: async (req, res) => {
    try {
      const { name, abbreviation, postcode, city } = req.body;

      const districtName = await Districts.findOne({ name });
      if (districtName)
        return res
          .status(400)
          .json({ msg: "The district name is already existed!" });

      const districtCode = await Districts.findOne({ name });
      if (districtCode)
        return res
          .status(400)
          .json({ msg: "The district postcode is already existed!" });

      const validCity = await Cities.findOne({ _id: city });
      if (!validCity) return res.status(400).json({ msg: "City NOT found" });

      const district = await Districts.create({
        name,
        abbreviation,
        postcode,
        city,
      });

      res.json({
        msg: `${name} has successfully created!`,
        city,
      });
    } catch (error) {
      toast(error);
    }
  },

  /**
   * Get all districts
   */
  getAllDistricts: async (req, res) => {
    try {
      const districts = await Districts.find().populate({
        path: "city",
        select: "-createdAt -updatedAt -__v",
      });
      if (!districts) return res.status(400).json({ msg: "NOT found!" });

      res.json(districts);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  /**
   * Delete district by ID
   */
  deleteDistrictByID: async (req, res) => {
    try {
      await Districts.findByIdAndDelete(req.params.id);
      res.json({ msg: `District ${req.params.id} has been deleted.` });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = DistrictCtrl;
