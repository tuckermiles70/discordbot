const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {   
    client.on('message', (receivedMessage) => {
        if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
            return
        }
        
        if (receivedMessage.content.startsWith("//")) {
            processCommand(receivedMessage)
        }
    })
})

//generalChannel.send("MANDATORY TEAM MEETING TONIGHT!")

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(4) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "") {
        helpCommand(arguments, receivedMessage)
    }
    else {
        receivedMessage.channel.send("I don't understand the command. Try `// this` or `// that`")
    }
}

function helpCommand(arguments, receivedMessage) {
    var generalChannel = client.channels.get("317112475814461440") // Replace with known channel ID
    //generalChannel.send("!play")
    const localFileAttachment = new Discord.Attachment('C:\\Users\\tucke\\Pictures\\tonyb.jpg')
    generalChannel.send(localFileAttachment)
}



// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
//bot_secret_token = "NjI1MTU4NDI4OTk3ODQ1MDIy.XYbgyA.e3nr9_ovKKwcu_KyZ3fXZ1jeqf4"

client.login(bot_secret_token)