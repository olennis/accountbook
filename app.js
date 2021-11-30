const express = require("express");
require("dotenv").config();
const app = express();
const port = 3000;
const {RTMClient} = require('@slack/client')
const token = process.env.SLACK_APP_TOKEN
const rtm = new RTMClient(token)

const {GoogleSpreadsheet} = require("google-spreadsheet");
const creds = require('./account-book-333711-674765777188.json')
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREAD_SHEET_ID);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
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





rtm.start();
rtm.on('message',(message)=>{
  let text = message.text
  if(text){
    const sheet =  doc.sheetsByIndex[0];
    console.log('sheet:',sheet)
    rtm.sendMessage(`${doc.title}이 기록되었습니다.`, message.channel)
  }
})






