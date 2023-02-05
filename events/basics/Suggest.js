const { PermissionFlagsBits, EmbedBuilder, User } = require('discord.js');
const suggestion = require('../../components/modals/moderation/Suggestion');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        const {member,guildId, customId, message, guild} = interaction;
        const channel = guild.channels.cache.get('1071812501685145610');

        const AcceptMessage = new EmbedBuilder()
            .setColor('Green')
            .setDescription("Votre suggestion a été accepté merci de votre contribution!");

        const RefuseMessage = new EmbedBuilder()
            .setColor('Red')
            .setDescription("Votre suggestion a été refusé je m'en excuse!");


        if(!interaction.isButton()) return;

        if(customId === 'accept' || customId == 'refuse') {
            if(!member.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply({ content: "Vous n'avez pas la permission de faire ça !", ephemeral: true });

            suggestion.findOne({GuildId: guildId, MessageId: message.id}, async (err, data) => {
                if(err) throw err;
                
                if(data ) 
                return interaction.reply({ content: "Aucune donnée n'a été trouvé !", ephemeral: true });
                const embed = message.embeds[0];
                if(!embed)
                 return interaction.reply({ content: "Aucun embed n'a été trouvé !", ephemeral: true });

                switch(customId) {
                    case 'accept':
                        embed.data.fields[2]= {name: 'Status', value: 'Accepté', inline: true};
                        const acceptedEmbed = EmbedBuilder.from(embed).setColor('Green');
                        message.edit({embeds: [acceptedEmbed]});
                        interaction.reply({ content: "Le message a été accepté !", ephemeral: true});
                        channel.send({ embeds: [AcceptMessage] });
                        channel.send({ embeds: [acceptedEmbed] });
                        message.delete();
                        break;
                    case 'refuse':
                        embed.data.fields[2]= {name: 'Status', value: 'Refusé', inline: true};
                        const refusedEmbed = EmbedBuilder.from(embed).setColor('Red');
                        message.edit({embeds: [refusedEmbed]});
                        interaction.reply({ content: "Le message a été refusé !", ephemeral: true});
                        channel.send({ embeds: [RefuseMessage] });
                        channel.send({ embeds: [refusedEmbed] });
                        message.delete();
                        break;
                }
            })
        }
    }
}