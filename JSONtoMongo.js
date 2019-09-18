const fs = require('fs');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const Listing = require('./ListingSchema.js');
const config = require('./config');
const listings = require('./listings.json');

mongoose.set('useUnifiedTopology', true);
mongoose.connect(config.db.uri, { useNewUrlParser: true }).then().catch(e => console.error(e));

listings.entries.forEach((entry) => {
  const newListing = new Listing({
    code: entry.code,
    name: entry.name,
    coordinates: entry.coordinates,
    address: entry.address,
  });

  newListing.save();
});
