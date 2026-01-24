// models/Account.js
import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    accountName: { type: String, required: true },
    latestTrade: { type: Date }
  },
  { timestamps: true }
);

// Optional index to make querying by user/account faster
AccountSchema.index({ userId: 1, accountName: 1 }, { unique: true });

const Account = mongoose.models.AccountSchema || mongoose.model("Account", AccountSchema);
export default Account



