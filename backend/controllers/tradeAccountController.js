import Account from "../models/AccountModel.js";


/**
 * Create a new trading account for a user
 */
export const createAccount = async (req, res) => {
  // console.log(req.body)
  // console.log(req.user._id)
  try {
    const { accountName } = req.body;
    const userId = req.user._id;

    if (!userId || !accountName) {
      throw new Error('Missing values')
    }

    // Prevent duplicate account names per user
    // const existingAccount = await Account.findOne({ userId, accountName });
    // if (existingAccount) {
    //   return res.status(400).json({ message: "Account with this name already exists." });
    // }

    const newAccount = await Account.create({ userId, accountName });
    res.status(201).json({
      message: "Account created successfully.",
      account: newAccount,
    });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: "Was not able to create account." });
  }
};

/**
 * Fetch all accounts for a specific user
 */
export const getUserAccounts = async (req, res) => {
  try {
    const userId = req.user._id;
    const accounts = await Account.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ message: "Failed to fetch accounts." });
  }
};

/**
 * Delete an account (and optionally its trades)
 */
export const deleteAccount = async (req, res) => {
  // console.log('hiiteer')
  try {
    const userId = req.user._id;
    const { accountId } = req.body;

    const deletedAccount = await Account.findOneAndDelete({ _id: accountId, userId: userId });
    if (!deletedAccount) {
      return res.status(404).json({ message: "Account not found." });
    }

    // Optional: also delete all trades linked to this account
    // await Trade.deleteMany({ accountId });

    res.status(200).json({ message: "Account deleted successfully." });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Failed to delete account." });
  }
};