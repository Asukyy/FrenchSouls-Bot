const { Client, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, } = require('discord.js');
const warningSchema = require('../../components/modals/moderation/Warning');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('systeme de warn')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('ajouter un warn')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('utilisateur a warn')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('raison')
                        .setDescription('raison du warn')
                        .setRequired(false))
                .addStringOption(option =>
                    option.setName('preuve')
                        .setDescription('preuve du warn')
                        .setRequired(false))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('retirer un warn')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('utilisateur a retirer le warn')
                        .setRequired(true))
                .addIntegerOption(option =>
                    option.setName('id')
                        .setDescription('id du warn a retirer')
                        .setRequired(false))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('check')
                .setDescription('voir les warns d\'un utilisateur')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('utilisateur a voir les warns')
                        .setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('clear')
                .setDescription('supprimer les warns d\'un utilisateur')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('utilisateur a supprimer les warns')
                        .setRequired(true))
        ),

    async execute(interaction) {
        const {options, guildId, user, member} = interaction;

        const sub = options.getSubcommand("add", "remove", "check", "clear");
        const target = options.getUser('user');
        const raison = options.getString('raison') || "Aucune raison";
        const preuve = options.getString('preuve') || "Aucune preuve";
        const id = options.getInteger('id');
        const warDate= new Date(interaction.createdTimestamp).toLocaleDateString();

        const userTag = `${user.username}#${user.discriminator}`;

        const embed = new EmbedBuilder()

        switch(sub) {
            case "add":
                warningSchema.findOne({  GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                    if(err) throw err;

                    if(!data) {
                
                        data = new warningSchema({
                            GuildID: guildId,
                            UserID: target.id,
                            UserTag: userTag,
                            Content: [
                                {
                                    ExecuterId: user.id,
                                    ExecuterTag: user.tag,
                                    Raison: raison,
                                    Preuve: preuve,
                                    Date: warDate
                                }
                            ],
                        });
                    } else {
                        const warnContent = {
                            ExecuterId: user.id,
                            ExecuterTag: user.tag,
                            Raison: raison,
                            Preuve: preuve,
                            Date: warDate
                    }
                        data.Content.push(warnContent);
}
                    data.save();
                });
                embed.setColor(0x00ff00)
                .setDescription(`Warning ajouté à: ||${target}  ${target.id}||
                **By** ${userTag}
                **Raison** ${raison}
                **Preuve** ${preuve}
                `)
                .setFooter({text:member.user.tag, iconUrl: member.displayAvatarURL({dynamic:true})})
                .setTimestamp();

                interaction.reply({embeds: [embed]});

                break;
            case "check":
                warningSchema.findOne({  GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                    if(err) throw err;

                    if(data) {
                        embed.setColor(0x00ff00)
                        .setDescription(`${data.Content.map(
                            (w, i) =>
                            `**ID**: ${i + 1}
                            **By**: ${w.ExecuterTag}
                            Date: ${w.Date}
                            **Raison**: ${w.Raison}
                            **Preuve**: ${w.Preuve}\n
                            `
                        ).join("\n")}`)
                        .setFooter({text:member.user.tag, iconUrl: member.displayAvatarURL({dynamic:true})})
                        .setTimestamp();

                        interaction.reply({embeds: [embed]});
                    } else {
                        embed.setColor(0xff0000)
                        .setDescription(`Aucun warn trouvé pour ${target}  ID:${target.id}||`)
                        .setFooter({text:member.user.tag, iconUrl: member.displayAvatarURL({dynamic:true})})
                        .setTimestamp();

                        interaction.reply({embeds: [embed]});
                    }
                        });
                break;
            case "remove":
                warningSchema.findOne({  GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                    if(err) throw err;

                    if(data) {
                        data.Content.splice(id - 1, 1);
                        data.save();

                        embed.setColor(0x00ff00)
                        .setDescription(` Warning retiré: ||${target}  ${target.id}|| pour l'ID: ${id}
                        **By** ${userTag}
                        `)
                        .setFooter({text:member.user.tag, iconUrl: member.displayAvatarURL({dynamic:true})})
                        .setTimestamp();

                        interaction.reply({embeds: [embed]});

                    } else {
                        embed.setColor(0xff0000)
                        .setDescription(`Aucun warn trouvé pour ||${target}  ${target.id}||`)
                        .setFooter({text:member.user.tag, iconUrl: member.displayAvatarURL({dynamic:true})})
                        .setTimestamp();

                        interaction.reply({embeds: [embed]});
                    }
                        });
                break;
            case "clear":
                warningSchema.findOne({  GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                    if(err) throw err;

                    if(data) {
                        await warningSchema.findOneAndDelete({  GuildID: guildId, UserID: target.id, UserTag: userTag });

                        embed.setColor(0x00ff00)
                        .setDescription(` ||${target} ${target.id}|| a été retiré de tous les warns !`)
                        .setFooter({text:member.user.tag, iconUrl: member.displayAvatarURL({dynamic:true})})
                        .setTimestamp();

                        interaction.reply({embeds: [embed]});

                    } else {
                        embed.setColor(0xff0000)
                        .setDescription(`Aucun warn trouvé pour ||${target} ${target.id}||`)
                        .setFooter({text:member.user.tag, iconUrl: member.displayAvatarURL({dynamic:true})})
                        .setTimestamp();

                        interaction.reply({embeds: [embed]});
                    }
                        });
                break;
        }
    }
};

