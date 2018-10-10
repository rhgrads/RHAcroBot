const TeleBot = require('telebot');
const TOKEN = process.env.TOKEN;
const bot = new TeleBot(TOKEN);

var acros = JSON.parse(fs.readFileSync('acronyms.json', 'utf8'));

bot.on('/help', (msg) => {
    console.log('/help triggered')
    return bot.sendMessage(msg.chat.id,' I am the Red Hat Acrobot, I help decypher acronyms used within the company.')
});

bot.on('/ac', (msg) => {
    console.log('/ac triggered')
    return bot.sendMessage(msg.chat.id, 'Yo')
});

bot.start()
