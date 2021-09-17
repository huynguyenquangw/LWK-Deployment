const Cities = require("../models/CityModel");

const CityCtrl = {
  /**
   * Create city
   */
  addCity: async (req, res) => {
    try {
      const { name, abbreviation, postcode } = req.body;

      const cityName = await Cities.findOne({ name });
      if (cityName)
        return res
          .status(400)
          .json({ msg: "The city name is already existed!" });

      const cityAbr = await Cities.findOne({ abbreviation });
      if (cityAbr)
        return res
          .status(400)
          .json({ msg: "The city abbreviation is already used!" });

      const cityCode = await Cities.findOne({ postcode });
      if (cityCode)
        return res
          .status(400)
          .json({ msg: "The city postcode is already used!" });

      const newCity = new Cities({
        name,
        abbreviation,
        postcode,
      });

      //Save to MongoDB
      await newCity.save();

      res.json({
        msg: `The city named ${name} has been successfully created.`,
        abbreviation,
        postcode,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  /**
   * Get all cities
   */
  getAllCities: async (req, res) => {
    try {
      const cities = await Cities.find();
      if (!cities) return res.status(400).json({ msg: "NOT found!" });

      res.json(cities);
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Delete city by ID
   */
  deleteCityByID: async (req, res) => {
    try {
      await Cities.findByIdAndDelete(req.params.id);
      res.json({ msg: `City ${req.params.id} has been deleted.` });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = CityCtrl;
