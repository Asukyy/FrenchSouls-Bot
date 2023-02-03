const { Client, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('glootdatav2')
        .setDescription('Affiche les data de gloot pour lAPI')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction) {
        const { message, options } = interaction;
        try {
            const response = await axios.get('https://gloot-sls.ey.r.appspot.com/api/v1');
            message.reply(response.data);
        } catch (error) {
            console.error(error);
            message.reply('Il y a eu une erreur lors de la récupération des données de l\'API Gloot.');
        }
    }
}