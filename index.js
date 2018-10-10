const TeleBot = require('telebot');
const TOKEN = process.env.TOKEN;
const bot = new TeleBot(TOKEN);

acroDoc = JSON.parse(fs.readFileSync('acronyms.json', 'utf8'));
acros = acroDoc.acronyms;

bot.on('/help', (msg) => {
    console.log('/help triggered')
    return bot.sendMessage(msg.chat.id,' I am the Red Hat Acrobot, I help decypher acronyms used within the company.')
});

<<<<<<< HEAD
=======
bot.on('/test', (msg) => {
    console.log('/test triggered')
    console.log(acros.ABC)
    test = String(acros.ABC);
    return bot.sendMessage(msg.chat.id,test)
});

>>>>>>> 0173b0b... Fixing my shit
bot.on('/ac', (msg) => {
    console.log('/ac triggered')
    return bot.sendMessage(msg.chat.id, 'Yo')
});

bot.start()
