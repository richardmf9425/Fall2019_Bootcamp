const mongoose = require('mongoose');

const { Schema } = mongoose;

const listingSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
    address: String,
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

listingSchema.pre('save', (next) => {
  const now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
