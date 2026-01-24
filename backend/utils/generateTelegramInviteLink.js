import express from "express";
import axios from "axios";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;  // store securely
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID; // e.g. "-1001234567890"
// console.log(CHANNEL_ID)
const generateTelegramInviteLink = async () => {
  const expireDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const expireSeconds = Math.floor(expireDate.getTime() / 1000);
  const response = await axios.post(
    `https://api.telegram.org/bot${BOT_TOKEN}/createChatInviteLink`,
    {
      chat_id: CHANNEL_ID,
      expire_date: expireSeconds,
      member_limit: 1, // single use
      // name: `Invite for ${userEmail}`,
    }
  );
  const inviteLink = response.data.result.invite_link;
  return { inviteLink, expireDate }
}

// generateTelegramInviteLink()
// console.log(new Date(1763159985 * 1000))

export default generateTelegramInviteLink