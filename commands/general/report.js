const { ActionRowBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, PermissionFlagsBits, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Signaler un message')
        .addUserOption(option =>
            option.setName('messageid')
                .setDescription('Le membre que vous voulez débannir')
                .setRequired(true)
        ),
    async execute(interaction) {
        const { options } = interaction;

        const user = options.getUser('messageid');
        const channel = guild.channels.cache.get('1069378097738158225');
        

        //crée un embed avec oui ou non comme boutton dans le salon channel
        const embed = new EmbedBuilder()
            .setDescription(`Voulez-vous signaler ce message ?`)
            .setColor('#00ff00')
            .setTimestamp();
        const button = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId('yes').setLabel('Oui').setStyle(ButtonStyle.Danger).setEmoji('👍'),
            new ButtonBuilder().setCustomId('no').setLabel('Non').setStyle(ButtonStyle.Primary).setEmoji('👎'),
        );
        await channel.send({
            embeds: ([embed]),
            components: [button]
        });
        interaction.reply({ content: "Report effectué !", ephemeral: true });
    }
}