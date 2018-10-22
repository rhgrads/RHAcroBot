const TeleBot = require('telebot');
const TOKEN = process.env.acrotoken;
const bot = new TeleBot(TOKEN);
const fs = require('fs');
acroDoc = JSON.parse(fs.readFileSync('acronyms.json', 'utf8'));

function acroLookup(input){
    match = null
    duplicates = []
    for(var category in acroDoc) {
        for(var key in acroDoc[category]) {
            if(key.toUpperCase() == input.toUpperCase()){
                if(match == null) match = acroDoc[category][key];
                else duplicates.push(acroDoc[category][key])
            }
        }
    }
    return {
        match: match,
        duplicates: duplicates
    }
}

bot.on('/help', (msg) => {
    console.log('/help triggered')
    return bot.sendMessage(msg.chat.id,
        "I am the Red Hat Acrobot, I help decypher acronyms used within the company! \n\nTo search for an acronym, type /ac followed by the acronym.")
});

bot.on(/^\/ac (.+)$/, (msg, props) => {
    input = props.match[1];
    console.log('/ac triggered, searching for ' + input)    
    output = acroLookup(input);
    if(output.match != null) console.log("match: " + output.match);
    if(output.duplicates.length > 0) console.log("duplicates: " + output.duplicates);

    if(output.match != "undefined" && output.match != null){
        response = output.match
        if(output.duplicates.length > 0) {
            response += "\nI also found the following:"
            for(acro in output.duplicates) {
                response += "\n" + duplicates[acro]
            }
        }
        return bot.sendMessage(msg.chat.id, response)
    }
    else {
        return bot.sendMessage(msg.chat.id, "I'm sorry, I couldn't find that acronym.")
    }
});

bot.start()
