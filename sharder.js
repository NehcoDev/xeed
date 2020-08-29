const {
    ShardingManager
} = require('discord.js');
const config = require("./config.js")
const manager = new ShardingManager('./index.js', {
    token: config.token
});

manager.spawn(2);
