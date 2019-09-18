/* Add all the required libraries */
const mongoose = require('mongoose');
const Listing = require('./ListingSchema');
const config = require('./config');

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(config.db.uri, { useNewUrlParser: true }).then().catch(e => console.error(e));

const findLibraryWest = async () => {
  try {
    const west = await Listing.findOne({ name: 'Library West' });
    console.log(west);
  } catch (error) {
    console.error(error);
  }
};

const removeCable = async () => {
  let course;

  try {
    course = await Listing.findOneAndRemove({ code: 'CABL' }, (err, doc) => {
      if (err) console.error(err);
      console.log(doc);
    });
  } catch (error) {
    console.error(error);
  }
};
const updatePhelpsLab = async () => {
  const updatedAddress = '1953 Museum Rd Gainesville, FL 32603';
  try {
    const Phelps = await Listing.findOneAndUpdate(
      { name: 'Phelps Laboratory' },
      { $set: { address: updatedAddress } },
      { new: true },
    );
    console.log(Phelps);
  } catch (err) {
    console.error(err);
  }
};
const retrieveAllListings = async () => {
  try {
    const allListings = await Listing.find({});
    console.log(allListings);
  } catch (err) {
    console.error(err);
  }
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
