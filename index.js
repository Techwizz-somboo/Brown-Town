require('dotenv').config(); //initialize dotenv
const {
    Client,
    Intents
} = require('discord.js');

const Tesseract = require('tesseract.js');
const badWords = ["fuck", "shit", "dumbass", "bitch", "nigg", "penis", "pussy", "damn", "puto", "cunt", "dyke", "fag", "beaner", "fvck", "milf", "dilf", "dick", "beaney", "gypsy", "bong", "chink", "cholo", "danm", "gyp", "injun", "jigaboo", "jigger", "negro", "whore", "slut", "redskin", "cooter", "vagina", "squaw", "twink", "shemale", "cripple", "midget", "kike", "hell"];
const potentialBadWords = ["tit", "cock", "ass"]
const whitelist = ["title", "class", "grass", "glass", "pass", "assembly", "assemblies", "assume", "titan", "ambassador"]

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
        Tesseract.recognize(
          image,
          'eng',
          { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
          console.log(text);
          usermessage = text;
        })
    }
    else {
        usermessage = message.content.toLowerCase();
    }
    if (message.author.bot) {
    	return;
    	}
    else if(badWords.some(word => usermessage.includes(word))){
        const sender = `${message.author} sent the following message...`
        const modchat = '1148137602944352347';
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
    else if(potentialBadWords.some(word => usermessage.includes(word))){
       if (whitelist.some(word => usermessage.includes(word))){ //These are not bad words and will be bypassed
           return;
       }
           const techwizz = `<@331669618387058688> `;
           const sender = techwizz + `${message.author} sent the following message (BUT WAS NOT DELETED)...`
           const modchat = '1148137602944352347';
           bot.channels.cache.get(modchat).send(sender);
           bot.channels.cache.get(modchat).send(message);
       }
});

//make sure this line is the last line
bot.login(process.env.CLIENT_TOKEN); //login bot using token
