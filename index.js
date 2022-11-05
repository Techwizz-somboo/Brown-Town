require('dotenv').config(); //initialize dotenv
const {
    Client,
    Intents
} = require('discord.js');

const Tesseract = require('tesseract.js');

const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]
});

let usermessage;

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity(`reach for the sky and wave hi`, {type: 'PLAYING'});
});

bot.on('guildMemberAdd', (member) => {
  console.log(member)
  const channelId = '1010369894077960292';
  const welcomeMessage = `Hey <@${member.id}>, welcome to ***GTI Animation and Games*** 🎉🤗 ! Please go to <#770718241743044639> and state what class period you're in so we can give you your role!`;
  member.guild.channels.fetch(channelId).then(channel => {
      channel.send(welcomeMessage)
    });
});

bot.on('messageCreate', (message) => {
    if (message.attachments.size > 0) {
        let image = message.attachments.first().url;
        usermessage = Tesseract.recognize(image,'eng');
        console.log(usermessage);
    }
    else if {
        usermessage = message.content.toLowerCase();
    }
    if (message.author.bot) {
    	return;
    	}
    else if(usermessage.includes('fuck') || usermessage.includes('shit') || usermessage.includes('dumbass') || usermessage.includes('bitch') || usermessage.includes('nigg') || usermessage.includes('penis') || usermessage.includes('pussy') || usermessage.includes('damn') || usermessage.includes('puto') || usermessage.includes('cunt') || usermessage.includes('dyke') || usermessage.includes('fag') || usermessage.includes('beaner') || usermessage.includes('fvck') || usermessage.includes('milf') || usermessage.includes('dilf') || usermessage.includes('dick') || usermessage.includes('beaney') || usermessage.includes('gypsy') || usermessage.includes('bong') || usermessage.includes('chink') || usermessage.includes('cholo') || usermessage.includes('coon') || usermessage.includes('gyp') || usermessage.includes('injun') || usermessage.includes('jigaboo') || usermessage.includes('jigger') || usermessage.includes('negro') || usermessage.includes('whore') || usermessage.includes('slut') || usermessage.includes('redskin') || usermessage.includes('cooter') || usermessage.includes('vagina') || usermessage.includes('squaw') || usermessage.includes('twink') || usermessage.includes('shemale') || usermessage.includes('cripple') ||  usermessage.includes('midget') || usermessage.includes('kike')){
        const sender = `${message.author} sent the following message...`
        const modchat = '510189494809526283';
	    const techwizz = ` <@331669618387058688> `;
        message.channel.send('Hey! Please keep your language school appropriate... If I deleted your message by mistake, please contact' + techwizz + 'or wait for him to see it then he will fix it.');
        message.delete();
        bot.channels.cache.get(modchat).send(sender);
        bot.channels.cache.get(modchat).send(message);
        }
    else if(usermessage.includes('bot say sorry')){
        message.channel.send('I am sorry for whatever I did. It will not happen again.');
        }
    else if(usermessage.includes('green mario')){
        message.channel.send('Red Luigi');
    }
    else if(usermessage.includes('how neat is that')){
        message.channel.send("that's pretty neat!");
    }
    else if(usermessage.includes("that's pretty neat")){
        message.channel.send('how neat is that?');
    }
    else if(usermessage.includes('tit') || usermessage.includes('cock') || usermessage.includes('ass')){
       if (usermessage.includes('title') || usermessage.includes('class')){ //These are not bad words and will be bypassed
           return;
       }
           const techwizz = `<@331669618387058688> `;
           const sender = techwizz + `${message.author} sent the following message (BUT WAS NOT DELETED)...`
           const modchat = '510189494809526283';
           bot.channels.cache.get(modchat).send(sender);
           bot.channels.cache.get(modchat).send(message);
       }
});

//make sure this line is the last line
bot.login(process.env.CLIENT_TOKEN); //login bot using token