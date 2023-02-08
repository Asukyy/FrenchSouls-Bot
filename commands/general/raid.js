const { ActionRowBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, PermissionFlagsBits, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('raid')
        .setDescription('Raid token gloot')
        .setDefaultPermission(false)
        //time before delete message
        .addIntegerOption(option => option.setName('time').setDescription('Time before delete message').setRequired(true))
        //jeu sur lequel on fait le raid
        .addStringOption(option => option.setName('game').setDescription('Game').setRequired(true))
            //choices
            .addChoice('Valorant', 'Valorant')
            .addChoice('League of Legends', 'League of Legends')
            .addChoice('Apex Legends', 'Apex Legends')
            .addChoice('Rocket League', 'Rocket League')
            .addChoice('Overwatch', 'Overwatch')
            .addChoice('CS:GO', 'CS:GO')
            .addChoice('PUBG', 'PUBG')
            .addChoice('Dota 2', 'Dota 2')

        .addIntegerOption(option => option.setName('token').setDescription('Token').setRequired(true)),
    async execute(interaction) {
        //On récupère les options
        const time = interaction.options.getInteger('time');
        const game = interaction.options.getString('game');
        const token = interaction.options.getInteger('token');
        //On crée le message
        const embed = new EmbedBuilder()
            .setTitle(`Raid ${game}`)
            .setDescription(`Token : ${token}`)
            .setColor('#ff0000')
            .setTimestamp();
        //On crée le bouton
        const button = new ButtonBuilder()
            .setCustomId('raid')
            .setLabel('Gloot')
            .setStyle(ButtonStyle.PRIMARY);
        //On crée la row
        const row = new ActionRowBuilder()
            .addComponents(button);
        //On envoie le message
        const message = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });
        //On supprime le message après le temps
        setTimeout(() => {
            message.delete();
        }, time * 1000);
    }
};



