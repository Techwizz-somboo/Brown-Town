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
  bot.user.setActivity(`welcome to my town!`, {type: 'PLAYING'});
});

bot.on('guildMemberAdd', (member) => {
  console.log(member)
  const channelId = '509441197064978443';
  const welcomeMessage = `Hey <@${member.id}>, welcome to ***GTI Animation and Games*** 🎉🤗 ! Please go to <#770718241743044639> and state what class period you're in so we can give you your role!`;
  member.guild.channels.fetch(channelId).then(channel => {
      channel.send(welcomeMessage)
    });
});
//make sure this line is the last line
bot.login(process.env.CLIENT_TOKEN); //login bot using token
