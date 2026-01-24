



import paypal from "@paypal/paypal-server-sdk";
import { response } from "express";
import User from "../models/UserModel.js";
const { Client, Environment, OrdersController } = paypal;
import generateTelegramInviteLink from "../utils/generateTelegramInviteLink.js";


const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.PAYPAL_CLIENT_ID,
    oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET
  },
  environment: Environment.Sandbox,  // or Environment.Live
});

const ordersController = new OrdersController(client);

export const createOrder = async (req, res) => {
  const programPrice = req.body.program === 'exclusive' ? '649' : '189'
  const collect = {
    body: {
      intent: 'CAPTURE',
      purchaseUnits: [
        {
          amount: {
            currencyCode: 'USD',
            value: programPrice,
          },
        }
      ],
    },
    prefer: 'return=minimal'
  }

  try {

    const { result, ...httpResponse } = await ordersController.createOrder(collect);
    // Get more response info...
    // const { statusCode, headers } = httpResponse;
    res.json({ id: result.id })
  } catch (error) {
    if (error) {
      console.log(error)
      // const { statusCode, headers } = error;
    }
  }
};

export const captureOrder = async (req, res) => {
  const { orderID } = req.body
  const collect = {
    id: orderID,
    prefer: 'return=minimal'
  }

  try {
    const { result, ...httpResponse } = await ordersController.captureOrder(collect);
    // Get more response info...
    // const { statusCode, headers } = httpResponse;
    const paymentDollarInfo = result.purchaseUnits[0].payments.captures[0].sellerReceivableBreakdown
    const paymentUpdated = result.purchaseUnits[0].payments.captures[0].updateTime
    const paymentCreated = result.purchaseUnits[0].payments.captures[0].createTime
    const subscriptionPlan = parseFloat(paymentDollarInfo.grossAmount.value) > 300 ? 'Exclusive' : 'Dedicated'
    const paymentInformation = {
      transactionId: result.id,
      status: result.status,
      amount: parseFloat(paymentDollarInfo.grossAmount.value),
      currency: paymentDollarInfo.grossAmount.currencyCode,
      paypalFee: parseFloat(paymentDollarInfo.netAmount.value),
      netAmount: parseFloat(paymentDollarInfo.paypalFee.value),
      payerEmail: result.payer.emailAddress,
      payerId: result.payer.payerId,
      planName: subscriptionPlan,
      paymentMethod: "paypal",
      createTime: paymentCreated,
      updateTime: paymentUpdated
    }
    const user = await User.findById(req.user._id);
    user.paypalPayments.push(paymentInformation)
    const subscriptionDays = subscriptionPlan === 'Exclusive' ? 366 : 92
    const generatedInvite = await generateTelegramInviteLink()
    user.subscription = {
      planLevel: subscriptionPlan,
      endDate: new Date(Date.now() + subscriptionDays * 24 * 60 * 60 * 1000),
      amountPaid: parseFloat(paymentDollarInfo.grossAmount.value),
      telegramLink: generatedInvite.inviteLink,
      telegramLinkExpiration: generatedInvite.expireDate,
      active: true
    }
    await user.save()
    res.json({ success: true, subscription: user.subscription })
  } catch (error) {
    if (error) {
      console.log(error)
      // const { statusCode, headers } = error;
    }
  }
};
// try {
//   const { orderID } = req.body;

//   const response = await ordersApi.ordersCapture({ id: orderID });
//   console.log(response.result)
//   res.json(response.result);
// } catch (error) {
//   console.error("Capture order error:", error);
//   res.status(500).json({ error: "Failed to capture order" });
// }
