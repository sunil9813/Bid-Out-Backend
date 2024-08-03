const mongoose = require("mongoose");

const BiddingProductSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Product",
    },
    price: {
      type: Number,
      require: [true, "Please add a Price"],
    },
  },
  { timestamps: true }
);
const biddingproduct = mongoose.model("BiddingProduct", BiddingProductSchema);
module.exports = biddingproduct;
