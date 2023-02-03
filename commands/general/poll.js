const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Créer un sondage')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('La question du sondage')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Le channel ou le sondage sera envoyé')
                .setRequired(true)),
    async execute(interaction) {
        const { channel, options } = interaction;
        const question = options.getString('question');
        const channelPoll = options.getChannel('channel');
        const embed = new EmbedBuilder()
            .setTitle('Sondage')
            .setDescription(question)
            .setColor('Blue')
        const msg = await channelPoll.send({ embeds: [embed] });
        await msg.react('✅');
        await msg.react('❌');
        await interaction.reply({ content: 'Sondage envoyé !', ephemeral: true });
    }
}
