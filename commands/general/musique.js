const {VolumeInterface} = require("discord.js");
const { EmbedBuilder, SlashCommandBuilder, VoiceChannel, GuildEmoji, PermissionFlagsBits } = require('discord.js');
const client = require('../../index');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('music')
        .setDescription('Music commands')
        .addSubcommand(subcommand =>
            subcommand
                .setName('play')
                .setDescription('Jouer une musique')
                .addStringOption(option =>
                    option.setName('query')
                        .setDescription('Le nom de la musique ou URL de la musique')
                        .setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('volume')
                .setDescription('Ajuster le volume')
                .addIntegerOption(option =>
                    option.setName('percent')
                        .setDescription('Le volume en pourcentage 10 => 10%')
                        .setMinValue(1)
                        .setMaxValue(100)
                        .setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('options')
                .setDescription('Selectionner les options')
                .addStringOption(option =>
                    option.setName('options')
                        .setDescription('Selectionner les options')
                        .setRequired(true)
                        .addChoices(
                            { name: "queue", value: "queue" },
                            { name: "skip", value: "skip" },
                            { name: "pause", value: "pause" },
                            { name: "resume", value: "resume" },
                            { name: "stop", value: "stop" },
                            { name: "loop", value: "loop" },
                        )
                )
        ),
    async execute(interaction) {

        const { options, member, guild, channel } = interaction;

        const subcommand = options.getSubcommand();
        const query = options.getString('query');
        const volume = options.getInteger('percent');
        const option = options.getString('options');
        const voiceChannel = member.voice.channel;

        const embed = new EmbedBuilder();

        if (!voiceChannel) {
            embed.setColor('Red').setDescription('Vous devez être dans un salon vocal pour utiliser cette commande !');
            return interaction.reply({ embeds: [embed] });
        }

        if (!member.voice.channelId == guild.members.me.voice.channelId) {
            embed.setColor('Red').setDescription('Vous devez être dans le même salon vocal que moi pour utiliser cette commande !');
            return interaction.reply({ embeds: [embed] });
        }

        try {
            switch (subcommand) {
                case 'play':
                    client.distube.play(voiceChannel, query, { textChannel: channel, member: member });
                    return interaction.reply({ content: `🎶 | Je joue maintenant !` });
                case 'volume':
                    client.distube.setVolume(voiceChannel, volume);
                    return interaction.reply({ content: `🔊 | Le volume est maintenant à **${volume}%** !` });
                case 'options':
                    const queue = await client.distube.getQueue(voiceChannel);


                    if (!queue) {
                        embed.setColor('Red').setDescription('Il n\'y a pas de musique en cours !');
                        return interaction.reply({ embeds: [embed], ephemeral: true });
                    }

                    switch (option) {
                        case 'skip':
                            await queue.skip(voiceChannel);
                            embed.setColor("Blue").setDescription('⏭️ | La musique a été passée !');
                            return interaction.reply({ embeds: [embed], ephemeral: true });
                        case 'stop':
                            await queue.stop(voiceChannel);
                            embed.setColor("Red").setDescription('⏹️ | La musique a été mise en pause !');
                            return interaction.reply({ embeds: [embed], ephemeral: true });
                        case 'pause':
                            await queue.pause(voiceChannel);
                            embed.setColor("Orange").setDescription('⏸️ | La musique a été reprise !');
                            return interaction.reply({ embeds: [embed], ephemeral: true });
                        case 'resume':
                            await queue.resume(voiceChannel);
                            embed.setColor("Green").setDescription('▶️ | La musique a été arrêtée !');
                            return interaction.reply({ embeds: [embed], ephemeral: true });
                        case 'queue':
                            embed.setColor("Green").setDescription(`🎶 | ${queue.songs.map((song, id) => `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}`);
                            return interaction.reply({ embeds: [embed], ephemeral: true });
                        case 'loop':
                            const current = await queue.setRepeatMode(1);
                            if(current == 1) {
                                embed.setColor("Green").setDescription('🔁 | La musique est en boucle !');
                                return interaction.reply({ embeds: [embed], ephemeral: true });
                            } else {
                                embed.setColor("Red").setDescription('🔁 | La musique n\'est plus en boucle !');
                                return interaction.reply({ embeds: [embed], ephemeral: true });
                            }
                    }

            }
        } catch (err) {
            console.log(err);

            embed.setColor('Red').setDescription('❌ | Une erreur est survenue !');

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}