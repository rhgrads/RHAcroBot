const TeleBot = require('telebot');
const Promise = require('bluebird');
const TOKEN = process.env.TOKEN;
const bot = new TeleBot(TOKEN);
const fs = require('fs');

bot.on('/help', (msg) => {
    console.log('/help triggered')
    return bot.sendMessage(
        msg.chat.id(' I am the Red Hat Acrobot, I help decypher acronyms used within the company.'
        )
    );
});
