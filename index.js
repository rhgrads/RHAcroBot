const TeleBot = require('telebot');
const TOKEN = process.env.acrotoken;
const bot = new TeleBot(TOKEN);
const fs = require('fs');
acroDoc = JSON.parse(fs.readFileSync('acronyms.json', 'utf8'));

function acroLookup(input){
    output = null
    for(var category in acroDoc) {
        for(var key in acroDoc[category]) {
            if(key.toUpperCase() == input.toUpperCase()){
                output = acroDoc[category][key];
            }
        }
    }
    return output;
}

bot.on('/help', (msg) => {
    console.log('/help triggered')
    return bot.sendMessage(msg.chat.id,
        "I am the Red Hat Acrobot, I help decypher acronyms used within the company! \n\nTo search for an acronym, type /ac followed by the acronym.")
});

bot.on(/^\/ac (.+)$/, (msg, props) => {
    console.log('/ac triggered')
    console.log(props.match[1])
    input = props.match[1];    
    test = acroLookup(input);
    console.log(test);

    if(test != "undefined" && test != null){
        return bot.sendMessage(msg.chat.id,test)
    }
    else{
        return bot.sendMessage(msg.chat.id, "I'm sorry, I couldn't find that acronym.")
    }
});

bot.start()
