const config = require("./config.json");
const axios = require("axios");
const { Database } = require("ark.db");
const db = new Database();
const db2 = require('quick.db')
const { readdirSync } = require("fs");
const { Modal, TextInputComponent, showModal } = require('discord-modals');
const { Client, Intents, MessageActionRow, MessageButton , MessageEmbed, Collection, MessageSelectMenu } = require('discord.js');
require(`transcript-messages`);
const client = new Client({ intents: 32767 });
const discordModals = require("discord-modals");
const fs = require("fs");


discordModals(client);
client.login(config.token);
client.on("ready",async () => {   console.log(`${client.user.username} ismi ile giriş yapıldı! | DETAYLAR: ${client.channels.cache.size} adet kanala, ${client.guilds.cache.size} sunucuya ve ${client.users.cache.size} kullanıcıya hizmet veriliyor!`);
});
client.on("ready", () => {
  let jailler = db.get("jailler") || [];
  let jailRol = "950071316306878474"
  jailler.forEach(a => {
      setTimeout(() => {
          let member = client.guilds.cache.get("944592410204319776").members.cache.get(a.id);
          member.roles.remove(jailRol);
          db2.set(`${member.user.id}_jail`, "false");
      }, a.sure - Date.now());
  });
});
// Komutlar Klasörünü Çekelim...
client.commands = new Collection();
readdirSync("./commands/").forEach(f => {
  let cmd = require(`./commands/${f}`);
  client.commands.set(cmd.name,cmd);
});
// Komutlar Klasörünü Çekelim...

client.on("interactionCreate",async int => {
  if(int.isCommand())    client.commands.get(int.commandName)?.func(int,client, db , new MessageEmbed().setColor(int.guild.me.roles.highest.color) );
});


let kufurliste = ["amk","aq","sg","siktir","amına","oç","orospu"];
let reklamliste = ["discord.gg","discord.com/invite"];
let yetkili = "954861776971890738" // KÜFÜR VE REKLAM KORUMADAN ETKILENMEYECEK ROL ID
client.on("messageCreate",async message => {
  if(reklamliste.some(k => message.content.includes(k))) {
    if(message.member.roles.cache.get(yetkili)) return false
    if(message.author.bot) return false
    message.delete().catch(err => {  }); 
    message.channel.send(`${message.author} oww.. Bu linki burada paylaşmana izin vermeyeceğim.`)
  }
  if(kufurliste.some(k => message.content.includes(k))) {
    if(message.member.roles.cache.get(yetkili)) return false
    if(message.author.bot) return false
    message.delete().catch(err => {  }); 
    message.channel.send(`${message.author} bunu yazmak bu sunucuda yasaklanmış.`)
  }
})



client.on("roleDelete", async (role, member, guild) => {
  let sistem = db2.fetch(`rolkoruma_${role.guild.id}`)
  if(sistem === 'aktif'){
  let kanal = "969324232435699713" // BIRI KANAL SILINCE MESAJ ATACAK KANAL ID

  role.guild.roles.create({
    name: role.name,
    reason: "Rol silindi.",
    permissions: role.permissions,
    color: role.color,
  });
  client.channels.cache.get(kanal).send(`**${role.name}** adında bir rol silindi ve ben geri oluşturdum.`)
} else {
  return
}});
client.on("channelDelete", async (channel) => {
  let sistem = db2.fetch(`kanalkoruma_${channel.guild.id}`)
 let kanal = "969324232435699713" 
  if(sistem === 'aktif'){
  channel.clone()
  client.channels.cache.get(kanal).send(`**${channel.name}** adında bir kanal silindi ve ben geri oluşturdum.`)
} else {
  return
}
})



client.on("guildMemberAdd", async member => {
  let rol = ["950071286187573268","958807755295162398","950428738301100073","950071309029744681","950071314545246228","950071320480210994"] // SUNUCUYA GİRENE VERİLECEK ROL ID
  let kanal = "970041237853831199" // SUNUCUYA BIRI KATILINCA MESAJ ATACAK KANAL ID
  setTimeout(function() {
  member.roles.add(rol);
  }, 500)
  setTimeout(function() {
    member.roles.add(rol);
    }, 1000)
    setTimeout(function() {
      member.roles.add(rol);
      }, 1500)
      setTimeout(function() {
        member.roles.add(rol);
        }, 2000)
        setTimeout(function() {
          member.roles.add(rol);
          }, 2500)
          setTimeout(function() {
            member.roles.add(rol);
            }, 3000)
  client.channels.cache.get(kanal).send(`${member} sunucumuza hoş geldin.\nKayıt olmak için **/kayıt**`)
})




  client.on("guildMemberAdd", (member) => {
    if (member.guild.id == "944592410204319776") {
        if(db2.get(`${member.user.id}_jail`) == "true"){
            member.roles.add("950071316306878474")
        };
    };
});


client.on("guildMemberRemove", (member) => {

  member.guild.members.ban(member.id);
  
});

client.on("interactionCreate",async int => {
if(int.customId == "basvuru"){
  let modal = new Modal() 
  .setCustomId('yetkili-basvuru-modal')
  .setTitle('YETKİLİ BAŞVURU')
  .addComponents([
    new TextInputComponent()
    .setCustomId('yetkili-basvuru-modal-isim')
    .setLabel('İsim Ve Yaş')
    .setStyle('SHORT') 
    .setMinLength(3)
    .setMaxLength(12)
    .setPlaceholder('İsim Ve Yaş')
    .setRequired(true),
    new TextInputComponent()
    .setCustomId('yetkili-basvuru-modal-yas')
    .setLabel('Aktiflik Süresi (Saat Olarak)')
    .setStyle('SHORT') 
    .setMinLength(1)
    .setMaxLength(2)
    .setPlaceholder('Aktiflik Süresi (Saat Olarak)')
    .setRequired(true),
    new TextInputComponent()
    .setCustomId('yetkili-basvuru-modal-cinsiyet')
    .setLabel('Kaç Sunucuda Yetkilisiniz?')
    .setStyle('SHORT') 
    .setMinLength(1)
    .setMaxLength(2)
    .setPlaceholder('Kaç Sunucuda Yetkilisiniz?')
    .setRequired(true),
    new TextInputComponent()
    .setCustomId('yetkili-basvuru-modal-ortalama-aktiflik')
    .setLabel('Adminlik Deneyiminiz Var Mı?')
    .setStyle('SHORT') 
    .setMinLength(4)
    .setMaxLength(4)
    .setPlaceholder('Var & Yok')
    .setRequired(true),
  ]);

  showModal(modal, {
    client: client, 
    interaction: int
  });
};

})

client.on('modalSubmit', async (modal) => {
  let kanal = "968532601130352751"
if(modal.customId === "yetkili-basvuru-modal"){
    
    let isim = modal.getTextInputValue('yetkili-basvuru-modal-isim');
    let aktiflik = modal.getTextInputValue('yetkili-basvuru-modal-yas');
    let sunucuyetkili = modal.getTextInputValue('yetkili-basvuru-modal-cinsiyet');
    let adminlikdeneyimi = modal.getTextInputValue('yetkili-basvuru-modal-ortalama-aktiflik');
    let sunucu = modal.guild.name;
await modal.deferReply({ephemeral : true});
 modal.followUp({content : "Başvurunuz alındı.",ephemeral : true});
      client.channels.cache.get(kanal).send({
        embeds : [new MessageEmbed().setColor("RANDOM").addField(`Başvuran`,`<@${modal.user.id}>`).addField("İsim Yaş",`${isim}`).addField("Aktiflik Süresi",aktiflik).addField("Kaç Sunucuda Yetkili",sunucuyetkili).addField("Kaç Sunucuda Admin",`${adminlikdeneyimi}`)]
      })
  }

client.on("guildMemberAdd", async member => {
  let entry = await member.guild.fetchAuditLogs({type: 'BOT_ADD'}).then(audit => audit.entries.first());
  if (!member.user.bot || !entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !config.botProtection) return;
  cezalandir(member.id, "ban");
  let user = beta.users.cache.get(entry.executor.id)
  let logKanali = beta.channels.cache.get("969324232435699713");
  if (logKanali) { logKanali.send(new MessageEmbed().setThumbnail(user.displayAvatarURL({dynamic:true})).setColor("BLUE").setTitle('Sunucuya izinsiz bir bot eklendi!').setDescription(`${member} adlı botu, ${entry.executor} adlı yetkili tarafından sunucuya izinsiz eklendi! \n\nEkleyen yetkili ve bot sunucudan yasaklandı.`).setFooter(`Beta Koruma Sistemi`).setTimestamp())}});


});
client.on('message', message => {
  if(message.author.id != "909049515976323142") return false;
  message.react('⚔️')

});
client.on('message', message => {
  if(message.author.id != "685247231385010307") return false;
  message.react('⚔️')

});