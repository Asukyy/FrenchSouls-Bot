const { Client, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick un membre du discord')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Selectionne le membre que tu veux kick')
                .setRequired(true))

        .addStringOption(option =>
            option.setName('raison')
                .setDescription('Quel est la raison du kick ?')
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const user = options.getUser('user');
        const reason = options.getString("reason") || "Aucune raison donnée";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`tu ne peux pas faire cette action sur ${user} quand tu es plus faible.`)
            .setColor('Red')

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true })

        await member.kick(reason);

        const embed = new EmbedBuilder()
            .setDescription(`**${user}** a été kick pour **${reason}**`)
            .setColor('Blue')

        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
}