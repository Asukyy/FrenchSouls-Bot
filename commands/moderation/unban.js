const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Débannir un membre du discord')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option.setName('userid')
                .setDescription('Le membre que vous voulez débannir')
                .setRequired(true)
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const user = options.getUser('userid');

        try {
            await interaction.guild.members.unban(user.id);

            const embed = new EmbedBuilder()
                .setDescription(`${user.username} a été débanni !`)
                .setColor('#00ff00')
                .setTimestamp();
            await interaction.reply({ embeds: [embed] });
        } catch (err) {
            console.log(err);

            const errEmbed = new EmbedBuilder()
                .setDescription(`fournissez un ID valide s'il vous plaît!`)
                .setColor('#ff0000');

            interaction.reply({ embeds: [errEmbed], ephemeral: true });
        }
    }
}