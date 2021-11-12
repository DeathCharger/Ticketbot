const Discord = require('discord.js');
const { MessageButton } = require('discord-buttons');
const { prefix } = require(`../config.json`)


module.exports = {
	name: 'ticket',
	description: 'Ticket commands',
	guildOnly: true,
	execute(message, args) {

    const noargs = new Discord.MessageEmbed()
    .setTitle(`Hey there, looks like you are trying to use the ticket module`)
    .setDescription("`"+message.content+"` is not a valid command. To setup a ticket embed please use `" + prefix + "ticket setup`")
    .setColor(`BLUE`)

    if (!args.length ) return message.channel.send(noargs)

  let btn = new MessageButton()
  .setStyle('green')
  .setLabel('📧 Open Ticket')
  .setID(`guild_ticket_create`)

if (args[0] == `setup`) {
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`**You don't have permissions for this command!**`)

  const open = new Discord.MessageEmbed()
  .setTitle(`Open Ticket`)
  .setDescription(`Click on the button below to open a new ticket`)
  .setColor(`GREEN`)
  
  message.channel.send(`ㅤ`, { button: btn, embed: open })
} else if (args[0] == `close`) {
  if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`**You don't have permissions for this command!**`)

  const closet = new Discord.MessageEmbed()
.setTitle(`Close This ticket`)
.setDescription(`If you accidently opened the ticket or the ticket is no longder needed press the button below to close the ticket`)
.setColor(`BLUE`)


let bt2 = new MessageButton()
.setStyle('red')
.setLabel('❌ Close Ticket') 
.setID('guild_ticket_close')

message.channel.send(`ㅤ`, { button: bt2, embed: closet })
} else {
  return message.channel.send(noargs)
}



  }}
