module.exports = {
    name: 'ping',
    category: 'utils',
    args: false,
    description : (lang) => lang.ping.description,
    async execute(message, args) {
      const m = await message.t("PING_LOAD")
      let date = Date.now()
        m.edit(`<:signal:744123219572686869> | Websocket: **${global.client.ws.ping}ms | Message: ${date - m.createdAt} ms**`)
      
    
  },
}
