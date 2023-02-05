const {EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createrules')
        .setDescription('Crée les regles du serveur')
        .addChannelOption(option =>
            option.setName('channel')
            .setDescription('Le salon ou envoyer les regles')
            .setRequired(true)
            )
            .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {


        const user = interaction.user;
        const member = await interaction.guild.members.fetch(user.id);


       const errEmbed = new EmbedBuilder()
            .setDescription(`tu ne peux pas faire cette action quand tu es plus faible.`)
            .setColor('Red')

        if (!member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true })

        const channel = interaction.options.getChannel('channel');
        const verifyembed = new EmbedBuilder()
            .setTitle('Bonjour et bienvenue sur French Soul, merci de bien vouloir lire et accepter les règles suivants:')
            .setDescription('1. Interdiction de harcèlement, racisme et tout autre comportement inapproprié.\n2. Pas de spam ou de publicité non autorisée.\n3. Utilisation appropriée des canaux de discussion et des salons vocaux.\n4. Pas de contenu explicite ou offensant.\n5. Respectez les décisions des modérateurs.\n6. Les cheat codes sont interdits.\n7. Les joueurs sont tenus de se montrer respectueux envers les autres joueurs.\n8. Les discussions politiques et religieuses sont limitées.\n9. Les joueurs doivent utiliser un nom d\'utilisateur approprié et non offensant.\n10. Les règles peuvent être mises à jour à tout moment, il est de la responsabilité des joueurs de les connaître et de les suivre.')
            .setColor('Green')
            let sendChannel = channel.send({
                embeds: ([verifyembed]),
                components: [
                    new ActionRowBuilder().setComponents(
                        new ButtonBuilder().setCustomId('valid').setLabel('Valider').setStyle(ButtonStyle.Success),
                    ),
                ],
            });
            if(!sendChannel)
                return interaction.reply('Une erreur est survenue');
                else{
                    interaction.reply('Les regles ont bien été envoyées');
                }
    },
};