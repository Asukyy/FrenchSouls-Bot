const {Client} = require('discord.js')

module.exports = {
    name: 'ready',
    once: true,

    //si un membre se connecte au serveur alors ca le dit dans le salon de logs
    async execute(client) {
        client.on('ready', member => {
            const channel = member.guild.channels.cache.find(ch => ch.name === 'modlog');
            if (!channel) return;
            channel.send(`Welcome to the server, ${member}`);
        });
    }
}