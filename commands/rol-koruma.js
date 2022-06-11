const { Client, Intents, MessageActionRow, MessageButton , MessageEmbed, Collection, MessageSelectMenu } = require('discord.js');
const db = require('quick.db')
module.exports = {
	name: "rolkoruma",
	async func(int, client) {
        let yetkili = "954861776971890738"
        if(!int.member.roles.cache.find(x => x.id== yetkili)) return int.reply(`Yeterli izne sahip değilsin.`)
        let durum = int.options.getString("durum");
        if(durum === "aç"){
            db.set(`rolkoruma_${int.guild.id}`, 'aktif')


            int.reply({
                content: `Gerekli ayarlamalar yapıldı.`
            })    
        }
        
        if(durum === "kapat"){
            db.delete(`rolkoruma_${int.guild.id}`)


            int.reply({
                content: `Gerekli ayarlamalar yapıldı.`
            })    
        }


	}
};