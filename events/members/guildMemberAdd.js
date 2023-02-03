const dotenv = require('dotenv');
dotenv.config();
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    execute(member) {
        console.log(`${member.user.tag} joined the server ! 🎉`);
        const {user, guild} = member
        const welcomeChannel = member.guild.channels.cache.get('1069586538901549056');
        welcomeMessage = `Bienvenue sur FrenchSouls <@${member.id}> ! 🎉`;
        const welcomeEmbed = new EmbedBuilder()
            .setTitle('Bienvenue !')
            .setDescription(welcomeMessage)
            .setColor('Random')
            .setFields({name: 'On est maintenant', value: `${guild.memberCount}`})
            .setThumbnail(user.displayAvatarURL())
            .setTimestamp()

        welcomeChannel.send({ embeds: [welcomeEmbed] });
}
}