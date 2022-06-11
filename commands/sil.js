const { Client, Intents, MessageActionRow, MessageButton , MessageEmbed, Collection, MessageSelectMenu } = require('discord.js');
module.exports = {
	name: "sil",
	async func(int, db, client) {
if(!int.member.roles.cache.find(x => x.id== "950071283595509890")) return int.reply(`Yeterli izne sahip değilsin.`) 
        const miktar = int.options.getString('miktar');
        if (isNaN(miktar)) return int.reply('Girdiğin miktar sadece sayılardan oluşmalı.')
        int.channel.bulkDelete(miktar);

    
            await int.reply({ content: `**${miktar}** adet mesaj havaya uçuruldu.`});
  
	}
};