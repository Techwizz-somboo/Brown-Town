require('dotenv').config(); //initialize dotenv
const {
    Client,
    Intents
} = require('discord.js');

const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]
});

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
    if (message.author.bot) {
    	return;
    	}
    else if(message.content.toLowerCase().includes('fuck') || message.content.toLowerCase().includes('shit') || message.content.toLowerCase().includes('dumbass') || message.content.toLowerCase().includes('bitch') || message.content.toLowerCase().includes('nigg') || message.content.toLowerCase().includes('penis') || message.content.toLowerCase().includes('pussy') || message.content.toLowerCase().includes('damn') || message.content.toLowerCase().includes('puto') || message.content.toLowerCase().includes('cunt') || message.content.toLowerCase().includes('dyke') || message.content.toLowerCase().includes('fag') || message.content.toLowerCase().includes('beaner') || message.content.toLowerCase().includes('fvck') || message.content.toLowerCase().includes('milf') || message.content.toLowerCase().includes('dilf') || message.content.toLowerCase().includes('dick') || message.content.toLowerCase().includes('beaney') || message.content.toLowerCase().includes('gypsy') || message.content.toLowerCase().includes('bong') || message.content.toLowerCase().includes('chink') || message.content.toLowerCase().includes('cholo') || message.content.toLowerCase().includes('coon') || message.content.toLowerCase().includes('gyp') || message.content.toLowerCase().includes('injun') || message.content.toLowerCase().includes('jigaboo') || message.content.toLowerCase().includes('jigger') || message.content.toLowerCase().includes('negro') || message.content.toLowerCase().includes('whore') || message.content.toLowerCase().includes('slut') || message.content.toLowerCase().includes('redskin') || message.content.toLowerCase().includes('cooter') || message.content.toLowerCase().includes('vagina') || message.content.toLowerCase().includes('squaw') || message.content.toLowerCase().includes('twink') || message.content.toLowerCase().includes('shemale') || message.content.toLowerCase().includes('cripple') ||  message.content.toLowerCase().includes('midget') || message.content.toLowerCase().includes('kike')){
        const sender = `${message.author} sent the following message...`
        const modchat = '510189494809526283';
	    const techwizz = ` <@331669618387058688> `;
        message.channel.send('Hey! Please keep your language school appropriate... If I deleted your message by mistake, please contact' + techwizz + 'or wait for him to see it then he will fix it.');
        message.delete();
        bot.channels.cache.get(modchat).send(sender);
        bot.channels.cache.get(modchat).send(message);
        }
    else if(message.content.toLowerCase().includes('bot say sorry')){
        message.channel.send('I am sorry for whatever I did. It will not happen again.');
    }
    else if(message.content.toLowerCase().includes('tit') || message.content.toLowerCase().includes('cock')){
       if (message.content.toLowerCase().includes('title')){ //These are not bad words and will be bypassed
           return;
       }
       else{
           const techwizz = `<@331669618387058688> `;
           const sender = techwizz + `${message.author} sent the following message (BUT WAS NOT DELETED)...`
           const modchat = '510189494809526283';
           bot.channels.cache.get(modchat).send(sender);
           bot.channels.cache.get(modchat).send(message);
       }
});

//make sure this line is the last line
bot.login(process.env.CLIENT_TOKEN); //login bot using token
