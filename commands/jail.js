const { Client, Intents, MessageActionRow, MessageButton , MessageEmbed, Collection, MessageSelectMenu } = require('discord.js');
const db = require('quick.db')
module.exports = {
	name: "jail",
	async func(int, client) {
        let yetkili = "952769534916444191"
        if(!int.member.roles.cache.find(x => x.id== yetkili)) return int.reply(`Yeterli izne sahip değilsin.`)
        let jailRol = "950071316306878474";
        let member = int.options.getMember("etiket");
        let sure = int.options.getString("süre");
        if(isNaN(sure)) {
			int.reply({
				content: `Girdiğin süre bir sayıdan oluşmalı.`,
				ephemeral: true
			})    
			return
		  }

      //  let member = message.guilds.members.cache.get(message.mentions.users.first().id);
      //  let sure = message.content.split(" ")[2];
        sure = parseInt(sure); // dakika cinsinden
        sure = Date.now() + sure * 60 * 1000;
        
        member.roles.cache.forEach(a => {
            member.roles.remove(a.id);
        });
        int.reply('İşlem başarılı.')
        member.roles.add(jailRol);
        db.set(`${member.user.id}_jail`, "true");
        db.push(`jailler`, {
            id: member.user.id,
            sure
        });
        
        setTimeout(() => {
            member.roles.remove(jailRol);
            db.set(`${member.user.id}_jail`, "false");
        }, sure - Date.now());

	}
};