require("dotenv").config();

const nodemailer = require("nodemailer");
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const sesClient = new SESClient({
  region: "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// 初始化 SES 客戶端
const params = {
  Destination: {
    ToAddresses: ["fresh@25sprout.com"], // 收件人電子郵件地址
  },
  Message: {
    Body: {
      Text: {
        Charset: "UTF-8",
        Data: "This is the message body in text format.",
      },
      Html: {
        Charset: "UTF-8",
        Data: "<html><body><h1>This is the message body in HTML format.</h1></body></html>",
      },
    },
    Subject: {
      Charset: "UTF-8",
      Data: "Test email",
    },
  },
  Source: "business@linego.me", // 發件人電子郵件地址
};

const sendEmail = async () => {
  try {
    const data = await sesClient.send(new SendEmailCommand(params));
    console.log("Email sent successfully:", data);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

sendEmail();
