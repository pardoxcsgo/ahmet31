const { Client, Intents, MessageActionRow, MessageButton , MessageEmbed, Collection, MessageSelectMenu } = require('discord.js');
const db = require('quick.db')
module.exports = {
	name: "unjail",
	async func(int, client) {
        let yetkili = "952769534916444191"
        if(!int.member.roles.cache.find(x => x.id== yetkili)) return int.reply(`Yeterli izne sahip değilsin.`)
        let etiket = int.options.getMember("etiket");
        db.set(`${etiket.id}_jail`, "false");
        etiket.roles.remove("950071316306878474")
        etiket.roles.add("950071311860908072")


	}
};