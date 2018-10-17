const TeleBot = require('telebot');
const TOKEN = process.env.acrotoken;
const bot = new TeleBot(TOKEN);
const fs = require('fs');
acroDoc = JSON.parse(fs.readFileSync('acronyms.json', 'utf8'));

bot.on('/help', (msg) => {
    console.log('/help triggered')
    return bot.sendMessage(msg.chat.id,' I am the Red Hat Acrobot, I help decypher acronyms used within the company.')
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


bot.on('/test', (msg) => {

    console.log('/test triggered')
    return bot.sendMessage(msg.chat.id, 'Yo')
});

bot.start()
