const { Client, GatewayIntentBits,Partials, Collection, Message } = require('discord.js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');
const {DisTube} = require('distube');
const {SpotifyPlugin} = require('@distube/spotify');

const { EmbedBuilder } = require('@discordjs/builders');
dotenv.config();

const bot = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)],
});

bot.distube = new DisTube(bot,
     { 
        emitNewSongOnly: true, 
        leaveOnFinish: true,
         emitAddSongWhenCreatingQueue: false,
            plugins: [new SpotifyPlugin()]
         });
         
module.exports = bot;