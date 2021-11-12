const Discord = require(`discord.js`) 
const fs = require('fs')  
const config = require(`./config.json`)
const log = console.log;
const { MessageButton } = require(`discord-buttons`)


const server = require(`./alive.js`)

  const client = new Discord.Client();
  client.commands = new Discord.Collection();
  const disbut = require('discord-buttons')(client);

  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      client.commands.set(command.name, command);
  }

if (!config.ticket_create_ping_roles_ids.length) { log(`No Role IDs provided in config.json`)}
if (!config.moderators_ids.length) { log(`No Mod IDs provided`)}
client.login(config.token).catch(console.error);



client.on(`ready`, () => {
    log(`[API] Logged in as ${client.user.username}`)
    client.user.setActivity('Tickets', { type: 'LISTENING' });
})



//COMMAND HANDLER
client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);

        const errmsg = new Discord.MessageEmbed()
        .setColor(`RED`)
        .setTitle('There was an error executing that command!');

        message.channel.send(errmsg)
	}
});

client.on(`error`, err => {
    console.log(err)
  })


  client.on('clickButton', async (button) => {

    if (button.id === 'guild_ticket_create') {
      var m = []
      const chname = `${button.clicker.user.username.toLowerCase()}-${button.clicker.user.discriminator}`
  
      const cannot = new Discord.MessageEmbed()
      .setTitle(`Cannot Open a new Ticket`)
      .setColor(`RED`)
      .setDescription(`Cannot open a new ticket as ${button.clicker.user.username} already has an active ticket`)
  
  await button.clicker.member.guild.channels.cache.forEach(ch => {
    m.push(ch.name)
  })
  
  
  if (m.some((i) => {
    return i == chname
  })) return button.channel.send(`<@${button.clicker.user.id}>`, cannot).then(msg => {
    setTimeout(() => { msg .delete()}, 5000)
  })
  
  var perms = []
  perms.push()
  
      button.clicker.member.guild.channels.create(chname, `text`).then(ch => {
        ch.updateOverwrite(ch.guild.roles.everyone, { VIEW_CHANNEL: false });
  ch.updateOverwrite(button.clicker.member, { 
    SEND_MESSAGES: true,
    VIEW_CHANNEL: true,
    ATTACH_FILES: true
    })
  
  
  if (config.moderators_ids.length) {config.ticket_mods_id.forEach(async (id) => {
    var person = await client.users.fetch(id)
    ch.updateOverwrite(person, { 
    SEND_MESSAGES: true,
    VIEW_CHANNEL: true,
    ATTACH_FILES: true,
    MANAGE_CHANNEL: true,
    MANAGE_PERMISSIONS: true
    })
  })}
  
  
        const made = new Discord.MessageEmbed()
  .setTitle(`Opened a new Ticket!`)
  .setColor(`BLUE`)
  .setDescription(`Please check <#${ch.id}>`)
  
  ch.send(`<@${button.clicker.user.id}>`).then(msg => {
    setTimeout(() => { msg .delete()}, 5000)
  })

if (config.ticket_create_ping_roles_ids)  {
    config.ticket_create_ping_roles_ids.forEach(roleid => {
        ch.send(`<@&${roleid}>`).then(m => m.delete())
    })
}
  
  
  
              button.channel.send(`<@${button.clicker.user.id}>`, made).then(msg => {
    setTimeout(() => { msg .delete()}, 5000)
  })
  const closet = new Discord.MessageEmbed()
  .setTitle(`Close This ticket`)
  .setDescription(`If you accidently opened the ticket or the ticket is no longer needed press the button below to close the ticket`)
  .setColor(`BLUE`)
  
  
  let bt2 = new MessageButton()
  .setStyle('red')
  .setLabel('❌ Close Ticket') 
  .setID('guild_ticket_close')
  
  const pleasexplain = new Discord.MessageEmbed()
  .setTitle(`Hey there! Welcome to tickets`)
  .setDescription(`Our admins have been notified, Please explain your issue`)
  .setColor(`BLUE`)
  
  ch.send(`ㅤ`, { button: bt2, embed: closet })
  ch.send(pleasexplain)
  
      })
    } else if (button.id === 'guild_ticket_close') {
      console.clear()
      const willclose = new Discord.MessageEmbed()
      .setTitle(`❌ Closing Ticket..`)
      .setDescription(`The ticket will closed in 10 seconds`)
      .setColor(`RED`)
  
      button.channel.send(willclose).then(msg => {
        setTimeout(() => {msg.channel.delete()}, 10000)
      })
    } 


})
