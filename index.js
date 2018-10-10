const TeleBot = require('telebot');
const Promise = require('bluebird');
const TOKEN = process.env.TOKEN;
const bot = new TeleBot(TOKEN);
const fs = require('fs');

var acros = JSON.parse(fs.readFileSync('acronyms.json', 'utf8'));

bot.on('/help', (msg) => {
    console.log('/help triggered')
    return bot.sendMessage(
        msg.chat.id(' I am the Red Hat Acrobot, I help decypher acronyms used within the company.'
        )
    );
});

bot.on('/test', (msg) => {
    console.log('/test triggered')
    var test = acros.ABC;
    return bot.sendMessage(
        msg.chat.id(test)
    );
});

