const { ActionRowBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, PermissionFlagsBits, ButtonStyle } = require('discord.js');
const suggestion = require('../../components/modals/moderation/Suggestion');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Suggérer une idée')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Selectionner le type de suggestion')
                .setRequired(true)
        .addChoices(
            { name: "Amélioration", value: "amélioration" },
            { name: "Discord", value: "Discord" },
            { name: "Bot", value: "Bot" },
            { name: "Gloot", value: "Gloot" },
            { name: "Autre", value: "Autre" },
        )
        )
        .addStringOption(option =>
            option.setName('description')
                .setDescription('Décrivez votre suggestion clairement')
                .setRequired(true)
        ),
    async execute(interaction) {
        const { options, guildId, member, user, guild } = interaction;
        const type = options.getString('type');
        const description = options.getString('description');

        const channel = guild.channels.cache.get('1069378097738158225');

        const embed = new EmbedBuilder()
            .setColor('Orange')
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true }) })
            .addFields(
                { name: "Suggestion:", value: description, inline: false },
                { name: "Type:", value: type, inline: true },
                { name: "Status:", value: "en attente", inline: true },
            )
            .setTimestamp()

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('accept').setLabel('Accepter').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId('refuse').setLabel('Refuser').setStyle(ButtonStyle.Danger),
        );

        try {
            const message = await channel.send({ embeds: [embed], components: [button], fetchReply: true });
            await interaction.reply({ content: "Suggestion envoyée !", ephemeral: true });
            await suggestion.create({
                GuildID: guildId, MessageID: message.id, Details: [
                    {
                        MemberID: member.id,
                        Type: type,
                        Description: description,
                    }
                ]

            });
        } catch (error) {
            console.log(error);
        }
    }
}
