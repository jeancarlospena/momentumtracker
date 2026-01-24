import mongoose from "mongoose";

// --- Order Subdocument ---
const OrderSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      enum: ["opened", "closed", "increased", "lowered"],
      required: true,
    },
    date: { type: Date, required: true },
    price: { type: Number, required: true },
    sharesQty: { type: Number, required: true },
  },
  { _id: false } // no need for separate IDs for orders
);

// --- Trade Schema ---
const TradeSchema = new mongoose.Schema(
  {
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },

    ticker: { type: String, required: true },
    position: { type: String, enum: ["long", "short"], required: true },

    orders: [OrderSchema],

    outStandingPosition: { type: Number, default: 0 },
    PNL: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Trade = mongoose.models.Trade || mongoose.model('Trade', TradeSchema);
export default Trade

