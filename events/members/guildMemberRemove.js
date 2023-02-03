const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    name: 'guildMemberRemove',
    execute(member) {
        console.log(`${member.user.tag} left the server ! 😭`);
        const welcomeChannel = member.guild.channels.cache.get(process.env.LEAVE_CHANNEL_ID);
        welcomeChannel.send(`**${member.user.tag}** a quitté FrenchSouls !\n C'était un faux frère ! 😭`);
    }
}