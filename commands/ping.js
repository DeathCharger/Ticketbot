const Discord = require(`discord.js`)

module.exports = {
	name: 'ping',
  aliases: ['latency', 'ms'],
	description: 'Ping the bot.',
	guildOnly: true,
	execute(message, args) {
const pingresponse = new Discord.MessageEmbed()
.setTitle(`Latency Details`)
.setColor(`BLUE`)
.addField(`Websocket Latency`, "`"+message.client.ws.ping+"` ms")

message.channel.send(pingresponse)
  }}
