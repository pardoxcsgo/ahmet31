const { Client, Intents, MessageActionRow, MessageButton , MessageEmbed, Collection, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: "başvuru",
	async func(int, db, client) {
        let yetkili = "950071290964893786"
        if(!int.member.roles.cache.find(x => x.id== yetkili)) return int.reply(`Yeterli izne sahip değilsin.`)
        let row = new MessageActionRow().addComponents(
            new MessageButton()
            .setStyle("PRIMARY")
            .setLabel("Başvuru")
            .setCustomId(`basvuru`)
          );
      
          int.channel.send({
            content: "Aşağı kısımdan başvuru gönderebilirsiniz.",
            components : [row]
          });

	}
};