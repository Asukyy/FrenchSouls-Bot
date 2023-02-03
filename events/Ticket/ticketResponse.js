const { ChannelType, ButtonStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionFlagsBits } = require('discord.js');
const ticketSchema = require('../../components/modals/moderation/Ticket');
const { ticketParent, everyone } = require('../../config.json');

module.exports = {

    name: 'interactionCreate',
    async execute(interaction) {
        const { guild, member, customId, channel } = interaction;
        const { ViewChannel, SendMessages, ManageChannels, ReadMessageHistory } = PermissionFlagsBits;
        const ticketId = Math.floor(Math.random() * 9000) + 10000;

        if (!interaction.isButton()) return;

        if (!["gloot", "bug", "coding", "other"].includes(customId)) return;

        if (!guild.members.me.permissions.has(ManageChannels))
            interaction.reply({ content: "Je n'ai pas la permission de gérer les salons", ephemeral: true });

        try {
            await guild.channels.create({
                name: `${member.user.username}-ticket-${ticketId}`,
                type: ChannelType.GuildText,
                parent: ticketParent,
                permissionOverwrites: [
                    {
                        id: everyone,
                        deny: [ViewChannel, SendMessages, ReadMessageHistory],
                    },
                    {
                        id: member.id,
                        allow: [ViewChannel, SendMessages, ReadMessageHistory],
                    },
                ],
            }).then(async (channel) => {
                const newTicketSchema = await ticketSchema.create({
                    GuildID: guild.id,
                    MemberID: member.id,
                    TicketID: ticketId,
                    ChannelID: channel.id,
                    ClosedID: false,
                    LockedID: false,
                    TypeID: customId,
                })
                const embed = new EmbedBuilder()
                    .setTitle(`${guild.name}  - Ticket: ${customId}`)
                    .setDescription(`Bonjour ${member.user.username}, bienvenue dans votre ticket. Nous vous répondrons dès que possible.`)
                    .setFooter({ text: `Ticket ID: ${ticketId}`, iconURL: member.displayAvatarURL({ dynamic: true }) })
                    .setColor('#00FF00')
                    .setTimestamp()

                const button = new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('close').setLabel('Fermer le ticket').setStyle(ButtonStyle.Primary).setEmoji('❌'),
                    new ButtonBuilder().setCustomId('lock').setLabel('Verrouiller le ticket').setStyle(ButtonStyle.Secondary).setEmoji('🔒'),
                    new ButtonBuilder().setCustomId('unlock').setLabel('Déverrouiller le ticket').setStyle(ButtonStyle.Secondary).setEmoji('🔓'),
                );

                channel.send({
                    embeds: ([embed]),
                    components: [button]
                });
                interaction.reply({ content: "Ticket créé avec succès !", ephemeral: true });
            });
        } catch (err) {
            return console.log(err);
        }
    }
}