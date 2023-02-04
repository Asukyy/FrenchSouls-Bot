//recupere les data de gloot pour que je puisse utilisé l'API de gloot
const { Client, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('glootdata')
    .setDescription('Affiche les data de gloot pour lAPI')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction) {
        const { message, options } = interaction;
            try {
              const response = await axios.get('https://gloot-sls-dev.ey.r.appspot.com/api/v1');
              message.reply(response.data);
            } catch (error) {
              console.error(error);
            }
          }
}

