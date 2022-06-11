module.exports = {
	name: "kayıt",
	async func(int, db, client) {


	  let kanal = "970041237853831199"
	  let verilecekrol = "950071311860908072"
	  let alınacakrol = "950071313609924608"


	  
	  if(int.channel.id !=  kanal) return int.reply('Bu komutu sadece kayıt kanalında kullanabilirsin.')
		let etiket = int.member
		let isim = int.options.getString("isim");
		let yas = int.options.getString("yas");

		if(isNaN(yas)) {
			int.reply({
				content: `Girdiğin yaş bir sayıdan oluşmalı.`,
				ephemeral: true
			})    
			return
		  }

		int.reply({
			content: `Kayıt işlemi başarılı...\nKullanıcı: ${etiket}\nİsim: ${isim}\nYaş: ${yas}`
		})    

		await etiket.setNickname(`${isim} | ${yas}`)
		await etiket.roles.add(verilecekrol)
		await etiket.roles.remove(alınacakrol)
	}
};