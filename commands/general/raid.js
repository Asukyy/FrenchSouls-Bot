// const { ActionRowBuilder } = require('@discordjs/builders');
// const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, PermissionFlagsBits, ButtonStyle } = require('discord.js');

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('raid')
//         .setDescription('propose un raid au membre avec timer'),
//     async execute(interaction) {
//         const {options,member,guild} = interaction;
//         const raid = options.getString('raid');
//         const timer = options.getString('timer');

//         const embed = new EmbedBuilder()
//             .setColor('Orange')
//             .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
//             .addFields(
//                 { name: "Raid:", value: raid, inline: false },
//                 { name: "Timer:", value: timer, inline: true },
//             )
//             .setTimestamp()

//         const button = new ActionRowBuilder().addComponents(
//             new ButtonBuilder().setCustomId('participe').setLabel('Je participe').setStyle(ButtonStyle.Success),
//             new ButtonBuilder().setCustomId('participe-pas').setLabel('Je ne participe pas').setStyle(ButtonStyle.Danger),
//         );

//         try {
//             const message = await interaction.reply({ embeds: [embed], components: [button], fetchReply: true });
//         }
//         catch (error) {
//             console.log(error);
//         }
//     }
// }
