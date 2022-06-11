module.exports = {
	name: "ban",
	async func(int, db, client) {
		if(!int.member.roles.cache.find(x => x.id== "950071290964893786")) return int.reply(`Yeterli izne sahip değilsin.`) // BAN ATABILECEK ROL ID GIRIN
		let etiket = int.options.getMember("etiket");

		await etiket.ban()

		int.reply({
			content: `Belirttiğin kullanıcı başarıyla sunucudan uzaklaştırıldı.`
		})    

	}
};