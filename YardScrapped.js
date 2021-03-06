const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch"); //To make IFTTT request
const YTDL = require("ytdl-core");

//Pull key and web requests from config file
const { bot_secret_token, tlamp_on, tlamp_off } = require('./config.json');

client.on('ready', () => {
    // Set bot status to: "Playing with JavaScript"
    client.user.setActivity("with JavaScript")
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { //Prevent bot from responding to its own messages
        return
    }
    if (receivedMessage.content.startsWith("#")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) //Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") //Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // Thefirst word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // Allother words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) //There may not be any arguments

    //HOME AUTOMATION
    if (primaryCommand == "lights") {
        receivedMessage.channel.send("Lights action triggered.");
        lightsCommand(arguments, receivedMessage);
    }
    else if (primaryCommand == "off") {
        receivedMessage.channel.send("Goodbye.");
        process.exit();
    }
    else if (primaryCommand == "skribble") {
        // receivedMessage.channel.send("Enter white space delimited list of words for Skribble");
        skribble(arguments, receivedMessage);
    }


    //Error output
    else {
        //add "Try `!help` or `!multiply`"
        receivedMessage.channel.send("I don't understand the command.")
    }
}

//HOME AUTOMATION
function lightsCommand(arguments, receivedMessage) {
    if (arguments.length > 2) {
        receivedMessage.channel.send("I don't understand the command.")
    }
    else if(arguments[0] == "lamp" && arguments[1] == "on") {
        receivedMessage.channel.send("IFTTT request made to turn on Tucker's Bedroom Lamp!");
        fetch(tlamp_on);
    }
    else if(arguments[0] == "lamp" && arguments[1] == "off") {
        receivedMessage.channel.send("IFTTT request made to turn off Tucker's Bedroom Lamp!");
        fetch(tlamp_off);
    }
}

//Skribble stuff
function skribble(arguments, receivedMessage) {
    receivedMessage.channel.send("Received these words:");
    length = arguments.length;
    for (i = 0; i < length; i++) {
        receivedMessage.channel.send(arguments[i]);
    }
    receivedMessage.channel.send("Words successfully added to Firebase DB use \"\#Skribble wordlist\" to view all stored words as a comma separated list");
    
}
client.login(bot_secret_token)