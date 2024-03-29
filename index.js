// https://discord.com/oauth2/authorize?&client_id=584100481824063489&scope=bot&permissions=414464731200

const Discord = require('discord.js')
const dotenv = require('dotenv')
dotenv.config()

const fs = require('fs');

eval(fs.readFileSync("imagesScript.js").toString())
eval(fs.readFileSync("utility.js").toString())

const client = new Discord.Client({
    intents:[
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});

const CLIENT_USERNAME = "Angry Thumb";
const ID = "584100481824063489"

const IMAGE_TOPIC = getGIFSTags()

client.on('ready', () => {
    console.log("Bot is awake")
    //client.user.setUsername(CLIENT_USERNAME)
    //client.user.setAvatar(path.join(__dirname, "avatar.png"))
   // client.user.setAvatar(getAvatarOfTheDay())
    client.user.setActivity(`@${CLIENT_USERNAME} c help`, {type: "WATCHING"})
})

client.on('messageCreate', (message) => {
    if(message.author == client.user)
    {
        return
    }

    var username = message.author.username
    var user_message = message.content.toLowerCase()
    var channel_name = message.channel.name
    var channel = message.channel

    if(user_message == 'bruh')
    {
        message.react(`${getEmoji("EpicBruh")}`)
    }
    else if (user_message == `<@!535822887114768405> punch <@!${ID}>`) 
    {
        message.reply(`How dare you ?! ${getEmoji("firerage")}`)
        //channel.send( `<@535822887114768405> punch <@${message.author.id}>`)
    }
    if(user_message.startsWith(`<@!${ID}>`) || user_message.startsWith(`<@${ID}>`))
    {
        console.log(`Receive message from : ${username}: ${user_message} (${channel_name}) | ${new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}`)
        
        var user_message_arg = removeSpaceInMessage( user_message.toLowerCase().split(' '))
        user_message_arg.shift()
        //console.log(user_message_arg)
        if(user_message_arg.length == 0)
        {
            let prob = Math.random()
            if(prob > 0.3)
            {
                message.reply(`${getEmoji("wazowzki")}`)
            }
            else if(prob < 0.6)
            {
                message.reply(`${getEmoji("unsettledtom")}`)
            }
            else
            {
                var selectedGif = getGIF(["ping", "mention"])
                if(selectedGif != undefined)
                {
                    message.reply(selectedGif)
                }
                else
                {
                    message.reply(`${getEmoji("unsettledtom")}`)
                }
            }
        }
        else if(user_message_arg[0] == 'c')
        {
            if(user_message_arg[1] == "existe" && user_message_arg.length > 2)
            {
                message.reply(gifExist(user_message_arg[2]) ? "oui" : "non")
            }
            else if (user_message_arg[1] == 'ping')
            {
                message.reply(`PONG ! 🏓\nLatency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
            }
            else if(user_message_arg[1] == "help")
            {
                var embedd = new Discord.MessageEmbed()
                .setDescription("Commands :\n`hello`, `ping`, `help`, `add`, `existe`")
                .addField("gif command :", "`@Angry Thumb <tags>`")
                .addField("add command :", "`@Angry Thumb c add <link> <tags>`")
                .addField("GIF topics :", IMAGE_TOPIC.toString())
                .setColor("RANDOM")
                .setTimestamp(message.createdAt)

                channel.send({embeds: [embedd]})
            }
            else if(user_message_arg[1] == "add")
            {
                if(IsAdmin(message.author.id) && user_message_arg.length > 3 && user_message_arg[2].includes("https://"))
                {
                    let gif_link = user_message_arg[2]
                    if(!gifExist(gif_link))
                    {
                        client.users.fetch('511991618971238400', false).then((user) => {
                            user.send(user_message);
                        });
                        if(author.id != '511991618971238400')
                        {
                            message.reply("message envoyé")
                        }
                    }
                    else
                    {
                        message.reply("gif existe déjà")
                    }
                }
                else
                {
                    message.reply("erreur")
                }
            }
            else
            {
                message.reply("Unknow command try : `c help`")
            }
        }
        else
        {
            var selectedGif = getGIF(user_message_arg)
            if(selectedGif != undefined)
            {
                message.reply(selectedGif)
            }
            else
            {
                message.reply("gif non trouvé")
            }
        }
    }
})

function IsAdmin(id)
{
    return id == "381430411940855808" || id == "511991618971238400"
}
client.login(process.env.TOKEN)