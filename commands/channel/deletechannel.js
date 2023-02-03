const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deletechannel')
        .setDescription('Supprime un channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Le channel a supprimer')
                .setRequired(true)),
    async execute(interaction) {
        const {channel, options} = interaction;
        const channelToDelete = options.getChannel('channel');
        await channelToDelete.delete();
        await interaction.reply({content: 'Channel supprimé avec succès !', ephemeral: true});
    }
}