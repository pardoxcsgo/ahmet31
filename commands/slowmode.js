module.exports = {
	name: "slowmode",
	async func(int, db, client) {
		let yetkili = "950071290964893786"
        if(!int.member.roles.cache.find(x => x.id== yetkili)) return int.reply(`Yeterli izne sahip değilsin.`)

		let süre = int.options.getString("süre");

        int.channel.setRateLimitPerUser(süre)

		int.reply({
			content: `**Başarılı.!**\nSlowmode Atan: ${int.member}\nSüre: ${süre}`
		})    

	}
};