import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'
import starterImportsData from '../utils/starterImportsData.js'


// 🔹 Payment sub-schema
const PaypalPaymentSchema = new mongoose.Schema({
  transactionId: { type: String, required: true },
  status: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  payerEmail: { type: String },
  payerId: { type: String },
  captureId: { type: String },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, required: true },
}, { _id: false }); // _id false = no unique id for each payment if not needed



// 🔹 Subscription sub-schema
const SubscriptionSchema = new mongoose.Schema({
  planLevel: { type: String, enum: ['Dedicated', 'Exclusive'] },
  startDate: { type: Date, },
  endDate: { type: Date, },
  telegramLink: { type: String },
  telegramLinkExpiration: { type: Date },
  amountPaid: { type: Number },
  active: { type: Boolean, default: false }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  primaryAccount: {
    type: String,
    default: ""
  },
  importAccounts: {
    type: Object,
    default: {}
  },

  subscription: {
    level: { type: String, enum: ['free', 'dedicated', 'exclusive', 'enterprise'], default: 'free' },
    status: { type: String, enum: ['active', 'canceled', 'expired', 'free'], default: 'free' },
    startDate: { type: Date },
    endDate: { type: Date },
    amountPaid: { type: Number, default: 0 },
    lastPaymentDate: { type: Date }
  },

  subscription: { type: SubscriptionSchema, default: {} },
  paypalPayments: [PaypalPaymentSchema],
  verified: { type: String, default: false }
}, { timestamps: true })

UserSchema.statics.signup = async function (firstName, email, password) {
  if (!email || !password || !firstName) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }
  if (await this.findOne({ email: email.toLowerCase() })) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(11);
  const hash = await bcrypt.hash(password, salt)

  const createdUser = await this.create({ firstName, email: email.toLowerCase(), password: hash, importAccounts: {} })

  console.log(createdUser)


  return createdUser
}

UserSchema.statics.login = async function (email, password) {
  if (!email, !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email: email.toLowerCase() })

  if (!user) {
    throw Error('Incorrect email or password')
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw Error('Incorrect email or password')
  }
  return user
}



const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User