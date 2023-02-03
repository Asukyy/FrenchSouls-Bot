const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, GuildCategory } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-channel')
        .setDescription('Créer un channel customisé')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addStringOption(option =>
            option.setName('channeltype')
                .setRequired(true)
                .setDescription('set le type du channel')
                .addChoices(
                    { name: "Text channel", value: "textchannel" },
                    { name: "Voice channel", value: "voicechannel" },
                )
        )
        .addStringOption(option =>
            option.setName('channelname')
                .setDescription('set le nom du channel')
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName('parent')
                .setDescription('set le parent du channel')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildCategory)
        )
        .addRoleOption(option =>
            option.setName('permissions')
                .setDescription('set les permissions du channel')
                .setRequired(true)
        )
        .addRoleOption(option =>
            option.setName('everyone')
                .setDescription('tag everyone')
                .setRequired(true)
        ),
    async execute(interaction) {
        const { guild, member, options } = interaction;

        const { ViewChannel, ReadMessageHistory, SendMessages, Connect, Speak } = PermissionFlagsBits;

        const channelType = options.getString('channeltype');
        const channelName = options.getString('channelname');
        const parent = options.getChannel('parent');
        const permissions = options.getRole('permissions');
        const everyone = options.getRole('everyone');

        if (channelType === 'textchannel') {
            await guild.channels.create({
                name: `${channelName}`,
                type: ChannelType.GuildText,
                parent: parent,
                permissionOverwrites: [
                    {
                        id: permissions,
                        allow: [ViewChannel, SendMessages, ReadMessageHistory],
                    },
                    {
                        id: everyone,
                        deny: [ViewChannel, SendMessages, ReadMessageHistory],
                    },
                ],
            });
        }

        if (channelType === 'voicechannel') {
            await guild.channels.create({
                name: `${channelName}`,
                type: ChannelType.GuildVoice,
                parent: parent,
                permissionOverwrites: [
                    {
                        id: permissions,
                        allow: [ViewChannel, Connect, Speak],
                    },
                    {
                        id: everyone,
                        deny: [ViewChannel, Connect, Speak],
                    },
                ],
            });
        }
        await interaction.reply({ content: 'Channel créé avec succès !', ephemeral: true });
    }

}