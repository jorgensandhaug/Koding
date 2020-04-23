const Discord = require("discord.js")
const client = new Discord.Client()
const prefix = "."

client.on("message", msg=>{
    if(!msg.content.startsWith(prefix) || msg.author.isBot) return
    const args = msg.content.slice(prefix.length).split(/ +/)
    const command = args.shift()
    
    if(command == "ping") msg.channel.send("pong")
    else if(command == "avatar"){ const avatar = msg.author.avatarURL(); if(avatar)msg.channel.send(avatar); else msg.channel.send("Du har ikke noen avatar");}
    else if(command == "kick"){
        const user = msg.mentions.users.first()
        if(user){
            const member = msg.guild.member(user)
            if(member){
                member.kick("Sorry hvis dette ble dumt")
                msg.channel.send(msg.mentions.users.first().username + " was succesfully kicked")
            }
        }
        else msg.channel.send("Du har ikke tagget en person")
    }
})

client.login("NzAxNDMyMjczOTM3MTA0OTM2.Xpxbvg.0F8CitKFX-yfWTIbEg838wy3fKg")