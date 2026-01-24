import Trade from "../models/TradeModel.js";

export const saveMultipleTrades = async (req, res) => {
  try {
    const { trades, accountId } = req.body;
    const userId = req.user._id;
    if (!Array.isArray(trades) || trades.length === 0) {
      return res.status(400).json({ message: "No trades provided." });
    }

    // Add userId to each trade (if not already included)
    const formattedTrades = trades.map((trade) => ({
      ...trade,
      accountId,
    }));

    // Insert all at once
    const savedTrades = await Trade.insertMany(formattedTrades, { ordered: false });
    console.log(savedTrades)
    res.status(201).json({
      message: `${savedTrades.length} trades saved successfully.`,
      trades: savedTrades,
    });
  } catch (error) {
    console.error("Error saving multiple trades:", error);
    res.status(500).json({ message: "Failed to save trades", error });
  }
};

export const getTrades = async (req, res) => {
  try {
    const accountId = req.params.accountId;
    if (!accountId) {
      return res.status(400).json({ message: "Account ID not provided" });
    }
    const trades = await Trade.find({ accountId: accountId }).sort({ "orders.0.date": -1 });
    res.status(200).json({ success: true, trades })
  } catch (error) {
    console.error("Error fetching trades:", error);
    res.status(500).json({ message: "Failed to fetch trades", error });
  }
}