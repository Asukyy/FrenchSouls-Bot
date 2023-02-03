const { EmbedBuilder } = require('@discordjs/builders');
const { Client, SlashCommandBuilder, Embed, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const { openticket } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Crée un ticket')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction) {
        const { guild } = interaction;

        const embed = new EmbedBuilder()
            .setDescription("- Cliquez sur le bouton ci-dessous pour créer un ticket ! \n\n"
                + "- Utilisez le bouton 'Report bug' pour signaler un bug sur le bot.\n\n - Utilisez le bouton 'Report (Gloot)' si vous avez des idées concernant Gloot qu'on pourrait approfondir.")

        const button = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId('bug').setLabel('Report Bug').setStyle(ButtonStyle.Danger).setEmoji('👤'),
            new ButtonBuilder().setCustomId('other').setLabel('Report Other').setStyle(ButtonStyle.Primary).setEmoji('👨‍⚕️'),
            new ButtonBuilder().setCustomId('gloot').setLabel('Report (Gloot)').setStyle(ButtonStyle.Success).setEmoji('🐛'),
        );

        await guild.channels.cache.get(openticket).send({
            embeds: ([embed]),
            components: [button]
        });
        interaction.reply({ content: "Ticket créé !", ephemeral: true });
    }
}