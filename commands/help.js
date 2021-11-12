const Discord = require('discord.js');
const { prefix } = require(`../config.json`)


module.exports = {
	name: 'help',
	description: 'Help command',
	guildOnly: true,
	execute(message, args) { 
        const helpmenu = new Discord.MessageEmbed()
        .setColor(`BLUE`)
        .setTitle(`Help Menu`)
        .addField(`${prefix}ping`, `Latency of Bot`)
        .addField(`${prefix}ticket setup`, `Creates an embed with a "Create Ticket" button. Users can click on this button to open tickets`)
        .addField(`${prefix}ticket close`, `Sends an embed with "Close Ticket" button. Deletes the ticket`)


        message.channel.send(helpmenu)
    }}
