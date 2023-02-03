const { Client, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, } = require('discord.js');
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute un membre du discord')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Le membre à mute')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('time')
                .setDescription('combien de temps le membre doit être mute ?')
        )
        .addStringOption(option =>
            option.setName('raison')
                .setDescription('Quel est la raison du mute ?')
        ),

    async execute(interaction) {
        const { guild, options } = interaction;

        const user = options.getUser('user');
        const member = guild.members.cache.get(user.id);
        const time = options.getString('time');
        const convertedTime = ms(time);
        const reason = options.getString('raison') || 'Aucune raison spécifiée';

        const errEmbed = new EmbedBuilder()
            .setDescription(`Une erreur est survenue ! s'il vous plaît réessayer plus tard.`)
            .setColor('Red')

        const successEmbed = new EmbedBuilder()
            .setTitle('**:white_check_mark: Muted**')
            .setDescription(`Vous avez mute ${user}.`)
            .addFields(
                { name: "Raison", value: `${reason}`, inline: true },
                { name: "Durée", value: `${time}`, inline: true },
            )
            .setColor('Purple')
            .setTimestamp();

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true })

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
            return interaction.reply({ embeds: [errEmbed], ephemeral: true })

        if (!convertedTime)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true })

        try {
            await member.timeout(convertedTime, reason);

            interaction.reply({ embeds: [successEmbed], ephemeral: true })
        } catch (err) {
            console.log(err);

        }

    }
}

