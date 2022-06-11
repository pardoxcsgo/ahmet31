const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require("./config.json");
const commands = [

new SlashCommandBuilder()
  .setName('unjail')
  .setDescription('Bir kullanıcıyı listeden kaldırırsınız.')
  .addUserOption(option => 
    option.setName("etiket")
    .setDescription("Bir kullanıcı seçin.")
    .setRequired(true)),
new SlashCommandBuilder()
  .setName('sil')
  .setDescription('Sohbetten mesajları siler.')
  .addStringOption(option =>
  option.setName('miktar')
  .setDescription(`Kaç tane mesaj silmek istiyorsun?`)
  .setRequired(true)),
  new SlashCommandBuilder()
  .setName('başvuru')
  .setDescription('Yetkili başvuru mesajı'),
  new SlashCommandBuilder()
  .setName('jail')
  .setDescription('Bir kullanıcıyı karalisteye gönderirsiniz.')
  .addUserOption(option => 
    option.setName("etiket")
    .setDescription("Bir kullanıcı seçin.")
    .setRequired(true))
    .addStringOption(option => 
      option.setName("süre")
      .setDescription("Bir süre belirtin. (Dakika Cinsinden)")
      .setRequired(true)),
  new SlashCommandBuilder()
  .setName('ban')
  .setDescription('Bir kullanıcıyı sunucudan kalıcı olarak uzaklaştırır.')
  .addUserOption(option => 
    option.setName("etiket")
    .setDescription("Sunucudan kalıcı olarak uzaklaştırmak istediğin kullanıcıyı etiketlemelisin.")
    .setRequired(true)),
      new SlashCommandBuilder()
      .setName('kayıt')
      .setDescription('Bir kullanıcıyı kayıt edersiniz.')
        .addStringOption(option => 
          option.setName("isim")
          .setDescription("Bir isim belirtin.")
          .setRequired(true))
          .addStringOption(option => 
            option.setName("yas")
            .setDescription("Bir yaş belirtin.")
          .setRequired(true)),
        new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Komutu kullandığınız kanala yavaşlık ekler.')
          .addStringOption(option => 
            option.setName("süre")
            .setDescription("Kanala kaç saniye slowmode eklemek istiyorsunuz")
            .addChoices({
              name: 'Devre Dışı Bırak', 
              value: '0'
            },{
              name: '2 Saniye', 
              value: '2'
            },{
              name: '5 Saniye', 
              value: '5'
            },{
              name: '8 Saniye', 
              value: '8'
            },{
              name: '20 Saniye', 
              value: '20'
            },{
              name: '1 Dakika', 
              value: '60'
            })
           
            .setRequired(true)),
            new SlashCommandBuilder()
            .setName('rolkoruma')
            .setDescription('Rol korumayı açıp kapatabilirsiniz.')
              .addStringOption(option => 
                option.setName("durum")
                .setDescription("Açmak mı istiyorsun? Kapatmak mı?")
                .addChoices({
                  name: 'Devre Dışı Bırak', 
                  value: 'kapat'
                },{
                  name: 'Aktif Et', 
                  value: 'aç'
                })
               .setRequired(true)),
               new SlashCommandBuilder()
               .setName('kanalkoruma')
               .setDescription('Kanal korumayı açıp kapatabilirsiniz.')
                 .addStringOption(option => 
                   option.setName("durum")
                   .setDescription("Açmak mı istiyorsun? Kapatmak mı?")
                   .addChoices({
                     name: 'Devre Dışı Bırak', 
                     value: 'kapat'
                   },{
                     name: 'Aktif Et', 
                     value: 'aç'
                   })
                  .setRequired(true))
]
const rest = new REST({ version: '9' }).setToken(config.token);

(async () => {
  try {

    await rest.put(
      Routes.applicationCommands(config.clientId),
      { 
        body: commands
      },
    );

    console.log('Komut Eklendi');
  } catch (error) {
    console.error(error);
  }
})();