const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear un nombre de message')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option =>
            option.setName('nombre')
                .setDescription('Nombre de message a clear')
                .setRequired(true)),
    async execute(interaction) {
        const { channel, options } = interaction;
        const nombre = options.getInteger('nombre');
        const errEmbed = new EmbedBuilder()
            .setDescription(`Tu ne peux pas clear plus de 100 messages`)
            .setColor('Red')
        if (nombre > 100) return interaction.reply({ embeds: [errEmbed], ephemeral: true })
        await channel.bulkDelete(nombre);
        const embed = new EmbedBuilder()
            .setDescription(`**${nombre}** ont été supprimés`)
            .setColor('Blue')
        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
}