const {CommandInteraction} = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
        if(interaction.isCommand()) {
            console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered the ${interaction.commandName} command. 🤖`);
        }
        else {
            console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered the ${interaction.customId} interaction. 🤖`);
        }

        if(interaction.isButton() && interaction.customId === 'valid')
        {
            const role = interaction.guild.roles.cache.get('1069389788865642608');
            return interaction.member.roles.add(role).then((member) => interaction.reply({ content: `Vous avez reçu le rôle ${role.name} !`, ephemeral: true }));
        }
	},

};