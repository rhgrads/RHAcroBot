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

bot.on('/test', (msg) => {
    console.log('/test triggered')
    try{
        var doc = yaml.safeLoad(fs.readFileSync('acronyms.yml', 'utf8'));
        console.log('Success loading yaml');

    }
    catch (e) {
        console.log('Error loading yaml.');
    }
    return bot.sendMessage(
        msg.chat.id(doc)
    );
});

