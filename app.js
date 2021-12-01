const express = require("express");
require("dotenv").config();
const app = express();
const port = 3000;

const { WebClient } = require("@slack/web-api");
const eventsApi = require('@slack/events-api')
const slackEvents = eventsApi.createEventAdapter(process.env.SLACK_SIGNING_SECRET)
const token = process.env.SLACK_APP_TOKEN
const web = new WebClient(token);

const {GoogleSpreadsheet} = require("google-spreadsheet");
const creds = require('./account-book-333711-674765777188.json')
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREAD_SHEET_ID);

//express
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use('/', slackEvents.expressMiddleware())

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//google sheet
async function authGoogleSheet(){
  
  try{
    console.log('authGoogleSheet')
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo()
    console.log(doc.title)
  }
  catch(err){
    console.log('Auth error', err)
  }
}
authGoogleSheet()


//slack
slackEvents.on("message", async(event) => {
  if(!event.subtype && !event.bot_id)
      client.chat.postMessage({
          token, 
          channel: event.channel, 
          thread_ts: event.ts, 
          text: "Hello World!"
      })
    })

// client.start();
// client.on('message',(message)=>{
//   let text = message.text
//   if(text){
//     const sheet =  doc.sheetsByIndex[0];
//     console.log('sheet:',sheet)
//     rtm.sendMessage(`${doc.title}이 기록되었습니다.`, message.channel)
//   }
// })






