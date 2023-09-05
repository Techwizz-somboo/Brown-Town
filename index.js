require('dotenv').config(); //initialize dotenv
const {
    Client,
    Intents
} = require('discord.js');

const Tesseract = require('tesseract.js');
const fs = require('fs');

// Change these in .env to match the user the bot pings "owner" when it deletes a message and which channel it logs messages to "modchat"
const owner = process.env.OWNER;
const modchat = process.env.MODCHAT;
const botStatus = process.env.BOT_STATUS; // This shows as the bot's status in Discord
const adminRole = process.env.ADMIN_ROLE; // So admins can use the !bot command
const welcomeChannelId = process.env.WELCOME_CHANNEL; // Channel where welcome messages are sent
const welcomeMessage = process.env.WELCOME_MESSAGE; // Message displayed when new users join

// The list file locations are initalized here
const badWordsList = './lists/badwords.txt';
const potentialBadWordsList = './lists/potentialbadwords.txt';
const whitelistList = './lists/whitelist.txt';

// The arrays are filled at runtime in bot.on('ready')
let badWords = [];
let potentialBadWords = [];
let whitelist = [];

const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]
});

let usermessage;

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity(botStatus, {type: 'PLAYING'});
  console.log(`Bot status set to "` + botStatus + `"`);
  fillArrayFromFile(badWordsList, badWords);
  fillArrayFromFile(potentialBadWordsList, potentialBadWords);
  fillArrayFromFile(whitelistList, whitelist);
  setTimeout(() => {  console.log('Bad Words From File:', badWords); }, 100);
  setTimeout(() => {  console.log('Potential Bad Words From File:', potentialBadWords); }, 100);
  setTimeout(() => {  console.log('Whitelist From File:', whitelist); }, 100);
});

bot.on('guildMemberAdd', (member) => {
  console.log(member)
  member.guild.channels.fetch(welcomeChannelId).then(channel => {
      channel.send(welcomeMessage)
    });
});

function fillArrayFromFile(filePath, dataArray) {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    
    // Split the file contents into an array (removing empty strings)
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    
    // Split the file contents into an array (assuming each line is an item)
    dataArray.length = 0;
    dataArray.push(...data.split('\n'));
    
    // If there are empty values, remove them
    // Implementation taken from https://stackoverflow.com/a/2843625
    let i;
    len = dataArray.length, i;
    for(i = 0; i < len; i++ )
        dataArray[i] && dataArray.push(dataArray[i]);
    dataArray.splice(0 , len);
  });
}

function deleteWordFromFile(filePath, dataArray, word) {
   fs.readFile(filePath, 'utf-8', (err, data) => {
   if (err) {
      console.error('Error reading file:', err);
      return;
   }
    
   // Modify the content to remove the word
   const lines = data.split('\n');
   const modifiedLines = lines.filter((line) => !line.includes(word));
   const modifiedContent = modifiedLines.join('\n');

   // Write the new content to file
   fs.writeFile(filePath, modifiedContent, 'utf8', (err) => {
   if (err) {
      console.error('Error writing to the file:', err);
   } else {
      console.log(word + ' removed successfully from list ' + filePath);
   }
   });
   });
   
   // Fill array again so there's no need to restart the bot
   setTimeout(() => {  fillArrayFromFile(filePath, dataArray); }, 1000);
}

function addWordToFile(filePath, dataArray, word) {
   fs.readFile(filePath, 'utf-8', (err, data) => {
   if (err) {
      console.error('Error reading file:', err);
      return;
   }
   
   // Append new line and word
   const updatedContent = `${data.trimRight()}\n${word}`;
   
   // Write the new content to file
   fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
    if (err) {
       console.error('Error writing to the file:', err);
    } else {
       console.log(word + ' added to list ' + filePath);
    }
   });
   });
   
   // Fill array again so there's no need to restart the bot
   setTimeout(() => {  fillArrayFromFile(filePath, dataArray); }, 1000);
}

bot.on('messageCreate', (message) => {
    if (message.author.bot) {
    	return;
    	}
    else if(message.content.includes("!bot")){
       if(message.member.roles.cache.has(adminRole)){
          if(message.channelId == modchat){
             if(message.content.includes("delete")){
                if(message.content.includes("pbadwords")){
                   const wordToDelete = message.content.replace(/!bot delete pbadwords /, '');
                   deleteWordFromFile(potentialBadWordsList, potentialBadWords, wordToDelete);
                   message.channel.send("Deleted " + wordToDelete + " from potentialbadwords list!");
                }
                else if(message.content.includes("badwords")){
                   const wordToDelete = message.content.replace(/!bot delete badwords /, '');
                   deleteWordFromFile(badWordsList, badWords, wordToDelete);
                   message.channel.send("Deleted " + wordToDelete + " from badwords list!");
                }
                else if(message.content.includes("whitelist")){
                   const wordToDelete = message.content.replace(/!bot delete whitelist /, '');
                   deleteWordFromFile(whitelistList, whitelist, wordToDelete);
                   message.channel.send("Deleted " + wordToDelete + " from whitelist!");
                }
                else {
                   message.channel.send("Usage: \n```\n!bot delete badwords/pbadwords/whitelist word\n```")
                }
             }
             else if(message.content.includes("add")){
                if(message.content.includes("pbadwords")){
                   const wordToAdd = message.content.replace(/!bot add pbadwords /, '');
                   addWordToFile(potentialBadWordsList, potentialBadWords, wordToAdd);
                   message.channel.send("Added " + wordToAdd + " to potentialbadwords list!");
                }
                else if(message.content.includes("badwords")){
                   const wordToAdd = message.content.replace(/!bot add badwords /, '');
                   addWordToFile(badWordsList, badWords, wordToAdd);
                   message.channel.send("Added " + wordToAdd + " to badwords list!");
                }
                else if(message.content.includes("whitelist")){
                   const wordToAdd = message.content.replace(/!bot add whitelist /, '');
                   addWordToFile(whitelistList, whitelist, wordToAdd);
                   message.channel.send("Added " + wordToAdd + " to potentialbadwords list!");
                }
                else {
                   message.channel.send("Usage: \n```\n!bot add badwords/pbadwords/whitelist word\n```")
                }
             }
             else if(message.content.includes("list")){
                const pBadWordsString = potentialBadWords.join(', ');
                const badWordsString = badWords.join(', ');
                const whitelistString = whitelist.join(', ');
                if(message.content.includes("pbadwords")){
                   message.channel.send(`Potential bad words: ${pBadWordsString}`);
                }
                else if(message.content.includes("badwords")){
                   message.channel.send(`Bad words: ${badWordsString}`);
                }
                else if(message.content.includes("whitelist")){
                   message.channel.send(`Whitelist: ${whitelistString}`);
                }
                else {
                   message.channel.send("Usage: \n```\n!bot list badwords/pbadwords/whitelist\n```")
                }
             }
             else {
                message.channel.send("Usage: \n```\n!bot list badwords/pbadwords/whitelist\n!bot delete badwords/pbadwords/whitelist word\n!bot add badwords/pbadwords/whitelist word\n```");
             }
          }
          else {
             message.channel.send('Commands can only be used in the <#' + modchat + '> channel!');
          }
       }
       else {
          message.channel.send('Sorry, only an admin can use the !bot command!');
       }
    }
    else if (message.attachments.size > 0) {
        let image = message.attachments.first().url;
        Tesseract.recognize(
          image,
          'eng',
          { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
          imagemessage = text.toLowerCase();
          console.log(imagemessage);
          if (badWords.some(word => imagemessage.includes(word))){
              const sender = `${message.author} sent the following message...`
              message.delete();
              message.channel.send('Hey! Please keep your language school appropriate... If I deleted your message by mistake, please contact' + owner + 'or wait for him to see it then he will fix it.');
              bot.channels.cache.get(modchat).send(sender);
              bot.channels.cache.get(modchat).send(message.attachments.first().url);
          }
        })
    }
    else if(badWords.some(word => message.content.toLowerCase().includes(word))){
        const sender = `${message.author} sent the following message...`
        message.channel.send('Hey! Please keep your language school appropriate... If I deleted your message by mistake, please contact' + owner + 'or wait for him to see it then he will fix it.');
        message.delete();
        bot.channels.cache.get(modchat).send(sender);
        bot.channels.cache.get(modchat).send(message);
        }
    else if(message.content.includes('bot say sorry')){
        message.channel.send('I am sorry for whatever I did. It will not happen again.');
        }
    else if(message.content.includes('green mario')){
        message.channel.send('Red Luigi');
    }
    else if(message.content.includes('how neat is that')){
        message.channel.send("that's pretty neat!");
    }
    else if(message.content.includes("that's pretty neat")){
        message.channel.send('how neat is that?');
    }
    else if(potentialBadWords.some(word => message.content.toLowerCase().includes(word))){
       if (whitelist.some(word => message.content.toLowerCase().includes(word))){ //These are not bad words and will be bypassed
           return;
       }
           const sender = owner + `${message.author} sent the following message (BUT WAS NOT DELETED)...`
           bot.channels.cache.get(modchat).send(sender);
           bot.channels.cache.get(modchat).send(message);
    }
});

//make sure this line is the last line
bot.login(process.env.CLIENT_TOKEN); //login bot using token
