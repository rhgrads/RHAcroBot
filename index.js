const TeleBot = require('telebot');
const TOKEN = process.env.acrotoken;
const bot = new TeleBot(TOKEN);
const fs = require('fs');
acroDoc = JSON.parse(fs.readFileSync('acronyms.json', 'utf8'));

bot.on('/help', (msg) => {
    console.log('/help triggered')
    return bot.sendMessage(msg.chat.id,' I am the Red Hat Acrobot, I help decypher acronyms used within the company.\n Commands:\n /help - Help message.\n /ac <acronym> - Acronym lookup.\n /suggest <suggestion> - Suggest new acronyms or features.\n Any other issues, please see our GIT repository - https://github.com/rhgrads/RHAcroBot')
});
bot.on('/HELP', (msg) => {
    console.log('/help triggered')
    return bot.sendMessage(msg.chat.id,' I am the Red Hat Acrobot, I help decypher acronyms used within the company.\n Commands:\n /help - Help message.\n /ac <acronym> - Acronym lookup.\n /suggest <suggestion> - Suggest new acronyms or features.\n Any other issues, please see our GIT repository - https://github.com/rhgrads/RHAcroBot')
});

function acroLookup(input){
    output = null;
    cats = ["acronyms", "redhat", "cryptography", "virt", "networking", "wifi", "libreoffice", "selinux", "kernal", "cloud", "documentation", "standards", "openshift", "gss", "hss", "pciutils", "java", "do_not_use", "memory_mgmt", "salesforce", "tags","eggs", "consulting", "new"];
        cats.forEach(function(element){
            for(var key in acroDoc[element]){
                if(key.toUpperCase() == input.toUpperCase()){
                        output = acroDoc[element][key];
                }
            }            
        });                    
      return output;
}

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
        return bot.sendMessage(msg.chat.id, 'Acronym not found.')
    }
});
bot.on(/^\/AC (.+)$/, (msg, props) => {
    console.log('/ac triggered')
    console.log(props.match[1])
    input = props.match[1];    
    test = acroLookup(input);
    console.log(test);

    if(test != "undefined" && test != null){
        return bot.sendMessage(msg.chat.id,test)
    }
    else{
        return bot.sendMessage(msg.chat.id, 'Acronym not found.')
    }
});

bot.on(/^\/suggest (.+)$/, (msg, props) => {
    input = props.match[1];
    fs.appendFile('suggestions.txt', (input + "\n"), function(err){
        if(err){
            console.log('Error '+err);
            return bot.sendMessage(msg.chat.id, 'An error occured please try again.')
        }
        else{
            console.log('Suggestion submitted');
            return bot.sendMessage(msg.chat.id, 'Suggestion submitted.')
        };
    })
});
bot.on(/^\/SUGGEST (.+)$/, (msg, props) => {
    input = props.match[1];
    fs.appendFile('suggestions.txt', (input + "\n"), function(err){
        if(err){
            console.log('Error '+err);
            return bot.sendMessage(msg.chat.id, 'An error occured please try again.')
        }
        else{
            console.log('Suggestion submitted');
            return bot.sendMessage(msg.chat.id, 'Suggestion submitted.')
        };
    })
});

bot.start()
