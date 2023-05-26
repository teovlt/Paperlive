const Venue = require('../models/venueModel');

module.exports.createOrUpdateVenue = async (venue) => {
  const { _id, ...venueData } = venue;
  if (_id) {
    const updatedVenue = await Venue.findOne({ _id: _id });
    await updatedVenue.updateOne({ $set: { ...venueData } });
    return updatedVenue;
  } else {
    return await Venue.create({ ...venueData });
  }
};
