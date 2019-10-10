const Discord = require('discord.js')
const client = new Discord.Client()

//pull key from config file
const { bot_secret_token } = require('./config.json');

client.on('ready', () => {
    var generalChannel = client.channels.get("317112475814461440") // Replace with known channel ID
    generalChannel.send("Hello, world!")  
})

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
//bot_secret_token = "NjI1MTU4NDI4OTk3ODQ1MDIy.XYbgyA.e3nr9_ovKKwcu_KyZ3fXZ1jeqf4"


client.login(bot_secret_token)