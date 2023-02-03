const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bannir un membre du discord')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Le membre à bannir')
                .setRequired(true))

        .addStringOption(option =>
            option.setName('raison')
                .setDescription('La raison du bannissement')
        ),
    async execute(interaction) {
        const { channel, options } = interaction;

        const user = options.getUser('user');
        const reason = options.getString('raison') || 'Aucune raison spécifiée';

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`Vous ne pouvez pas bannir ${user.username} !`)
            .setColor('#ff0000');

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        await member.ban({ reason });

        const embed = new EmbedBuilder()
            .setDescription(`${user.username} a été banni pour la raison ${reason} !`)
            .setColor('#00ff00')
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }

}