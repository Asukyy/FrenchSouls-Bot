const { Client, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Unmute un membre du discord')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Selectionne le membre que tu veux unmute')
                .setRequired(true)),

    async execute(interaction) {
        const { guild, options } = interaction;

        const user = options.getUser('user');
        const member = guild.members.cache.get(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`Une erreur est survenue ! s'il vous plaît réessayer plus tard.`)
            .setColor('Red')

        const successEmbed = new EmbedBuilder()
            .setTitle('**:white_check_mark: Unmuted**')
            .setDescription(`Vous avez unmute ${user}.`)
            .setColor('Purple')
            .setTimestamp();

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true })

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
            return interaction.reply({ embeds: [errEmbed], ephemeral: true })

        try {
            await member.timeout(null);

            interaction.reply({ embeds: [successEmbed], ephemeral: true })
        } catch (err) {
            console.log(err);

        }

    }
}