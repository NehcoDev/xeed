let client = global.client;

const fs = require("fs");

client.on("ready", async () => {
  await init()
  await require("./utils/cacheGuilds");
  await require("./utils/cacheUsers");
  await client.wait(1000);
  await console.log(global.chalk.blue("[BOT]") + ` successfully logged to the bot`)
  console.log(global.chalk.blue("[BOT]") + ` the bot is now ready`)
  setTimeout(async function() {


    setInterval(async function() {
        
    client.user.setActivity(`.help | ${client.guilds.cache.size} servers & ${client.users.cache.size} users`, {type: "WATCHING"}); 
        },20000);
    },10000);
    client.channels.cache.get('721746776910200885').send(`**Connecté sur ${client.user.username}#${client.user.discriminator}**`)
})

async function init(){
  const core = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

  for (const file of core) {
    const command = require(`./commands/${file}`);
    command.path = `./commands/${file}`
    command.client = client;
    client.commands.set(command.name.toLowerCase(), command);
    console.log(global.chalk.blue("[BOT]") + ` ${file} loaded`)
    }
    await console.log(global.chalk.yellow("----------------------------------------------------------------"));


    await fs.readdir("./events/", async (_err, files) => {
        await files.forEach(async (file) => {
            if (!file.endsWith(".js")) return;
            const event = require(`./events/${file}`);
            let eventName = file.split(".")[0];
            await console.log(global.chalk.blue("[BOT]") + ` event ${eventName} loaded`);
            client.on(eventName, event.bind(null));
            delete require.cache[require.resolve(`./events/${file}`)];
        });
        await console.log(global.chalk.yellow("----------------------------------------------------------------"));
        await console.log(global.chalk.blue("[BOT]") + ` the bot is now ready`);

    });
}
