//express
import express from 'express';

//slack
import { createEventAdapter } from '@slack/events-api';
import { createServer } from 'http';
import { WebClient } from '@slack/web-api'
import CONFIG from '../config/bot.json';

//spread-sheet
const app = express();
const slackEvents = createEventAdapter(CONFIG.SIGNING_SECRET);
const webClient = new WebClient(CONFIG.BOT_USER_OAUTH_ACCESS_TOKEN);
const GoogleSpreadSheet = require('google-spreadsheet');
const promisify = require('util');
const creds = require('../account-book-333711-674765777188.json');

async function accessSheet(){
    const sheet = new GoogleSpreadSheet('1JwPqq8ExZEWY30SCi6EzNfZDwG_cjC7DfrBGgIk9NQA')
}

// 메시지 이벤트 구독하기
slackEvents.on('message', async (e) => {
    if(e.bot_id){//봇이 입력한 부분
        return
    }
    else{//유저 메시지
      const message = e.text.split(' ')
      if(!Number(message[1])){
        webClient.chat.postMessage({
            text: '항목 금액 비고 순으로 입력할 것!',
            channel: e.channel,
          });
      }
      else{
        webClient.chat.postMessage({
            text: `${message[0]} 에서 ${message[1]}₩이 지출되었습니다.`,
            channel: e.channel,
          });
      }
    }
  });

// 메지지 이벤트 엔드포인트를 express 에 등록하기
app.use('/slack/events', slackEvents.requestListener());

// express 웹 서버 실행
createServer(app).listen(3000, () => {
  console.log('run slack bot');
});