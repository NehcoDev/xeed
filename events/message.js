module.exports = async (message) => {
    let client = global.client;

if(message.channel.type === "dm") return;

if (!message.author.bot) {
  let guildData = await client.databaseCache.guilds.get(message.guild.id);
  let userData = await client.db.getOrCreateUser(message.author);


  if(!guildData){
    let gD = await client.db.getGuild(message.guild);
    await client.databaseCache.guilds.set(message.guild.id, gD);
    guildData = await client.databaseCache.guilds.get(message.guild.id);
  }

  if(guildData.blacklisted) return;

  if(!message.content.startsWith(guildData.prefix) || !message.guild || message.author.bot) return;

  const args = message.content.slice(guildData.prefix.length).split(/ +/);
  let commandName = args.shift().toLowerCase();
  let cmd = client.commands.get(commandName) || client.commands.find(cmdd => cmdd.aliases && cmdd.aliases.includes(commandName));
  if(!cmd) return;

  let data = {};
  data.guild = guildData //await client.db.getGuild(message.guild)
  data.user = userData;
  const Language = require(`../languages/${data.guild.language}`); // This language constructor is from https://github.com/Androz2091/AtlantaBot because i really like their method
  const lang = Language;
  message.language = new Language();

  if(data.user.blacklisted) return; // If the user is blacklisted then ignore. Here an example: let user = client.databaseCache.users.get("ANY ID"); user.blacklisted = true; user.save()

  message.t = async (...args) => {
    return message.channel.send(message.language.get(...args))
  }

  if(cmd.category && cmd.category === "owner"){
    if(message.author.id !== client.config.ownerID) return message.t("NOT_OWNER")
  }

  
    if(cmd.userPermission && !message.member.hasPermission(cmd.userPermission)) return message.t("NO_ENOUGH_PERMS")
    if(cmd.args && !args.length) {
      return message.t("NO_ARGS")
    }


  cmd.execute(message, args, data)
}
}
