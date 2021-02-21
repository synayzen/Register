const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const Canvas = require('canvas')
    , Image = Canvas.Image
    , Font = Canvas.Font
    , path = require('path');
const snekfetch = require('snekfetch');
const fs = require('fs');
const DBL = require('dblapi.js');
const YouTube = require('simple-youtube-api');
const queue = new Map();  
const ytdl = require('ytdl-core');
const generator = require('generate-password');
const math = require('math-expression-evaluator')
const db = require('quick.db')
const moment = require('moment');
const ms = require('parse-ms');
const GIFEncoder = require('gifencoder');
require('moment-duration-format')
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} Adet komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: [Artemus] > ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


client.login(process.env.TOKEN);

//----------------GİRİŞ-------------------//

  client.on("guildMemberAdd", member => { 
    const moment = require('moment');
  const kanal = ayarlar.giriskanal;
  let user = client.users.get(member.id);
  require("moment-duration-format");
  const tarih = new Date().getTime() - user.createdAt.getTime();  
  const embed = new Discord.RichEmbed()
  let rol = ayarlar.kayıtsızROL
  let yetkiliROL = ayarlar.yetkiliROL
 member.addRole(rol)//splashen

  var kontrol;
if (tarih < 1296000000) kontrol = '<❌> **Hesap Güvenli Değil!**'
if (tarih > 1296000000) kontrol = '<✅> **Hesap Güvenli!**'
  moment.locale("tr");
  let kanal1 = client.channels.get(kanal);
    let giris = new Discord.RichEmbed()
   .setTitle (`  \  𝐀𝐬𝐬𝐚𝐬𝐬𝐢𝐧'𝐬 𝐂𝐫𝐞𝐞𝐝 𝐅𝐚𝐦𝐢𝐥𝐲 #BAKIM\  `)
    .setDescription(`
➠ ** Sunucuya Hoş Geldin! ${member} ** Seninle birlikte  ${member.guild.memberCount} Kişiyiz!

➠ Ses kanalına girerek kayıt olabilirsiniz.**

➠ ** Kayıt için bekleyin <@&${yetkiliROL}> **  kayıt edecektir.

➠ Hesabın oluşturulma tarihi:** \` ${moment(member.user.createdAt).format("YYYY DD MMMM dddd (hh:mm:ss)")} \`

${kontrol} 

`) //splashen
    
    .setThumbnail(member.avatarURL)  
    .setImage('https://cdn.discordapp.com/attachments/801730953813688340/803663058366103562/orjin.gif')
    .setTimestamp()
kanal1.send(giris)
  }); 

//-------------------------GİRİŞ_SON--------------------------//
//splashen


//----------------TAGLI_ALIM------------------------------//

client.on('userUpdate', async user => {
  let jaus0 = "sunucu-id"; //Buraya sunucunuzun IDsini yazın
  let jaus1 = "tagınız"; //Buraya tagınızı yazın
  let jaus2 = "tag-rol"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  let channel = client.guilds.get(jaus0).channels.find(x => x.name == 'ekip-rol'); //tagrol-log yerine kendi log kanalınızın ismini yazabilirsiniz
  if (!jaus1) return;
  if (!jaus2) return;
  if (!channel) return;
  let member = client.guilds.get(jaus0).members.get(user.id);
  if (!member) return;
  if (!member.roles.has(jaus2)) {
    if (member.user.username.includes(jaus1)) {
      member.addRole(jaus2)
      const tagaljaus = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(`<@${user.id}> adlı kişi, ${jaus1} aile aldığından dolayı <@&${jaus2}> rolüne erişti.`)
      .setTimestamp()
      channel.send(tagaljaus)
    }
  }else{
    if (!member.user.username.includes(jaus1)) {
      member.removeRole(jaus2)
      const tagbırakjaus = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(`<@${user.id}> adlı kişi, ${jaus1} aile tagımızı sildiğinden dolayı <@&${jaus2}> rolünü kaybetti.`)
      .setTimestamp()
      channel.send(tagbırakjaus)
    }
  }
});

//---------------TAG_MESAJI------------------------//

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'tag') {
    msg.channel.send('** ⚔ **')  // bunu düzeltirsiniz normalde otomatik siliyordu ama böyle daha olur diye düzeltim : D  veya cimrilik yaptım
   }
}); 

//-------------MESAJ_LOG-----------------------------//

client.on("messageUpdate", async (oldMessage, newMessage) => {
if(newMessage.author.bot || newMessage.channel.type === "dm") return;
  let slog = newMessage.guild.channels.find(c => c.name === "801730944587268116") // idli şekle getirirsin istiyorsan düzeltirsin
  if (oldMessage.content == newMessage.content) return;
  let sikerimemreyi = new Discord.RichEmbed()
  .setColor("BLACK")
  .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL)
  .addField("Kullanıcı", newMessage.author)
  .addField("Eski Mesaj", oldMessage.content, true)
  .addField("Yeni Mesaj", newMessage.content, true)
  .addField("Kanal Adı", newMessage.channel.name, true)
  .addField("Mesaj ID", newMessage.id, true)
  .setThumbnail(newMessage.author.avatarURL)
  .setFooter(`Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours()+3}:${newMessage.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  slog.send(sikerimemreyi)
});
client.on("messageDelete", async (deletedMessage) => {
if(deletedMessage.author.bot || deletedMessage.channel.type === "dm") return;
  let slog = deletedMessage.guild.channels.find(c => c.name === "801730944587268116")// idli şekle getirirsin istiyorsan düzeltirsin
  let jauscoolama = new Discord.RichEmbed()
  .setColor("BLACK")
  .setAuthor(`Mesaj Silindi`, deletedMessage.author.avatarURL)
  .addField("Kullanıcı", deletedMessage.author)
  .addField("Silinen Mesaj", deletedMessage.content, true)
  .addField("Kanal Adı", deletedMessage.channel.name, true)
  .addField("Mesaj ID", deletedMessage.id, true)
  .setThumbnail(deletedMessage.author.avatarURL)
  .setFooter(`Bilgilendirme  • bügün saat ${deletedMessage.createdAt.getHours()+3}:${deletedMessage.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  slog.send(jauscoolama)
});

//-----------FOTO_CHAT_LOG---------------------//

function extension(attachment) {

    let imageLink = attachment.split('.');

    let typeOfImage = imageLink[imageLink.length - 1];

    let image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);

    if (!image) return '';

    return attachment;

}

client.on('message', async message => {

if(message.channel.id === 'foto-chat-log') {

  let image = message.attachments.size > 0 ? await extension(message.attachments.array()[0].url) : '';

 if (message.attachments.size < 1) return;

const jausss = new Discord.RichEmbed()

.setImage(image)

client.channels.get('log-kanalı').send(jausss)

}})





//-------------------BOTA_SESLİ_HOŞGELDİN----------------------//

const googleTTS = require('google-tts-api');
client.on("voiceStateUpdate", async (oldMember, newMember) => {
  let kanalID = "801730965751201802";
  if (newMember.id !== client.user.id && newMember.voiceChannel &&
newMember.voiceChannel.id === kanalID) {
    googleTTS("Kanal Hoş Geldin!", "tr", 1).then(soylenecek => {
      newMember.voiceChannel.join().then(kanal => {
        kanal.playStream(soylenecek).on("end", () => {
          setTimeout(() => {
              newMember.voiceChannal.leave();
            }, 2000)
          });
        });
      });
  };
});

client.on("ready", () => {
  client.channels.get("801730967910875188").join();
});

