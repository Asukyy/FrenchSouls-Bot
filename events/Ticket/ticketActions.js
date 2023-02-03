const {ButtonInteraction, EmbedBuilder, PermissionFlagsBits, Embed} = require('discord.js');
const {createTranscript} = require("discord-html-transcripts");
const {transcripts} = require('../../config.json');
const ticketSchema = require('../../components/modals/moderation/Ticket');

module.exports = {
    name: 'interactionCreate',

    async execute(interaction) {
        const { guild, member, customId, channel } = interaction;
        const {ManageChannels, SendMessages} = PermissionFlagsBits;

        if (!interaction.isButton()) return;

        if(!["close", "lock", "unlock"].includes(customId)) return;

        if(!guild.members.me.permissions.has(ManageChannels))
            return interaction.reply({ content: "Je n'ai pas la permission de gérer les salons", ephemeral: true });

            const embed = new EmbedBuilder().setColor('Aqua');

            ticketSchema.findOne({ChannelID: channel.id}, async (err, data) => {
                if(err) throw err;
                if(!data) return;

                const FetchedMember = await guild.members.cache.get(data.MemberID);

                switch (customId) {
                    case "close":
                        if(data.closed == true)
                            return interaction.reply({ content: "Ce ticket est déjà fermé", ephemeral: true });

                        const transcript = await createTranscript(channel, {
                            limit: -1,
                            returnBuffer: false,
                            fileName: `${member.user.username}-ticket-${data.Type}-${data.TicketID}.html`,
            });

            await ticketSchema.updateOne({ChannelID: channel.id}, {ClosedID: true});

            const transcriptEmbed = new EmbedBuilder()
                .setTitle(`Transcript Type: ${data.Type}\nId: ${data.TicketID}`)
                .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({dynamic: true}) })
                .setTimestamp();

                const transcriptProcess = new EmbedBuilder()
                .setTitle(`Sauvegarde de la transcription...`)
                .setDescription(`Veuillez patienter 10 secondes...`)
                .setColor('Red')
                .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({dynamic: true}) })
                .setTimestamp();

                const res = await guild.channels.cache.get(transcripts).send({
                    embeds: [transcriptEmbed],
                    files: [transcript],
                });

                channel.send({ embeds: [transcriptProcess] });

                setTimeout(() => {
                    member.send({
                        embeds: [transcriptEmbed.setDescription(`Accéder à la transcription: (${res.url})`)],
                    }).catch(() => channel.send('Je ne peux pas envoyer de message'));
                    channel.delete();
                }, 10000);

                break;

            case "lock":
                if(!member.permissions.has(ManageChannels))
                    return interaction.reply({content: "Vous n'avez pas la permission de verrouiller ce ticket", ephemeral: true });

                if(data.locked == false)
                    return interaction.reply({content: "Ce ticket est déjà verrouillé", ephemeral: true });

                await ticketSchema.updateOne({ChannelID: channel.id}, {LockedID: false});
                embed.setDescription(`Ticket verrouillé avec succès`);

                channel.permissionOverwrites.edit(FetchedMember, { SendMessages: true });

                return interaction.reply({ embeds: [embed] });


            case "unlock":
                if(!member.permissions.has(ManageChannels))
                    return interaction.reply({content: "Vous n'avez pas la permission de déverrouiller ce ticket", ephemeral: true });

                if(data.locked == false)
                    return interaction.reply({content: "Ce ticket est déjà déverrouillé", ephemeral: true });
                
                    await ticketSchema.updateOne({ChannelID: channel.id}, {LockedID: false});
                    embed.setDescription(`Ticket déverrouillé avec succès`);

                    channel.permissionOverwrites.edit(FetchedMember, { SendMessages: false });

                    return interaction.reply({ embeds: [embed] });
                }
        });
    }
}