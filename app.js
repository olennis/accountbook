const express = require("express");
const app = express();
const port = 3000;
const {RTMClient} = require('@slack/client')
const token = process.env.SLACK_APP_TOKEN
const rtm = new RTMClient(token)
rtm.start();
rtm.on('message',(message)=>{
  let text = message.text
  if(text.includes('dh')){
    rtm.sendMessage('??', message.channel)
  }
})

require("dotenv").config();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
