const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Affiche la latence'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Pong !')
            .setDescription(`🏓 Latence : ${Date.now() - interaction.createdTimestamp}ms`)
            .setTimestamp()
        await interaction.reply({ embeds: [embed] });
    }
}