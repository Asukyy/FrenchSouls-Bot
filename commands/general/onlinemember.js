const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('onlinemember')
        .setDescription('Affiche le nom des joueurs en ligne avec leur status et leur activité en cours'),
    async execute(interaction) {
        const { guild, member } = interaction;
        const embed = new EmbedBuilder()
            .setTitle('Joueurs en ligne')
            .setColor('Blue');
        const members = guild.members.cache.filter(member => member.presence && member.presence.status !== 'offline');
        members.forEach(member => {
            let activity = 'Aucune activité en cours';
            if (member.presence.activities.length > 0) {
                activity = member.presence.activities[0].name;
            }

            embed.addFields(
                { name: `**${member.user.username}**\n`, value: `Status: **${member.presence.status}**\nActivité en cours: **${activity}**\n\n`, inline: true }
            );
        });

        // Réponse initiale avec le message
        const message = await interaction.reply({ embeds: [embed] });

        // Toutes les 5 secondes, mettez à jour le message sans de message.edit
        const interval = setInterval(async () => {
            const members = guild.members.cache.filter(member => member.presence && member.presence.status !== 'offline');
            const embed = new EmbedBuilder()
                .setTitle('Joueurs en ligne')
                .setColor('Blue');
            
            members.forEach(member => {
                let activity = 'Aucune activité en cours';
                if (member.presence.activities.length > 0) {
                    activity = member.presence.activities[0].name;
                }
            
                embed.addFields(
                    { name: `**${member.user.username}**\n`, value: `Status: **${member.presence.status}**\nActivité en cours: **${activity}**\n\n`,  inline: true }
                );
            });
            await interaction.editReply({ embeds: [embed] });
        }, 5000);
    }    
};