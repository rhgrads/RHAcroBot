const TeleBot = require('telebot');
const TOKEN = process.env.TOKEN;
const bot = new TeleBot(TOKEN);

acroDoc = JSON.parse(fs.readFileSync('acronyms.json', 'utf8'));
acros = acroDoc.acronyms;
redhat = acroDoc.redhat;

bot.on('/help', (msg) => {
    console.log('/help triggered')
    return bot.sendMessage(msg.chat.id,' I am the Red Hat Acrobot, I help decypher acronyms used within the company.')
});

function acroLookup(input){

    x = 0;
    output = "undefined";
    cats = ["acronyms", "redhat", "cryptography", "virt", "networking", "wifi", "libreoffice", "selinux", "kernal", "cloud", "documentation", "standards", "openshift", "gss", "hss", "pciutils", "java", "do_not_use", "memory_mgmt", "salesforce", "tags","eggs", "consulting", "new"];
    cats.forEach(function(element){
        if(acroDoc[cats[x]][input] != "undefined" && acroDoc[cats[x]][input] != null){
            output = acroDoc[cats[x]][input];
        }
        else{
            x++;
        }
        
    });
    
    return output;
}

bot.on(/^\/ac (.+)$/, (msg, props) => {
    console.log('/test triggered')
    console.log(props.match[1])
    input = props.match[1];

    console.log(acroLookup(input));

    test = acroLookup(input);
    if(test != "undefined"){
        return bot.sendMessage(msg.chat.id,test)
    }
    else{
        return bot.sendMessage(msg.chat.id, 'Acronym not found.')
    }
});


bot.on('/test', (msg) => {
    console.log('/ac triggered')
    return bot.sendMessage(msg.chat.id, 'Yo')
});

bot.start()
