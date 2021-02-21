const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`[-] Komutlar yüklendi.`);
    client.user.setActivity(`𝐀𝐬𝐬𝐚𝐬𝐬𝐢𝐧'𝐬 𝐂𝐫𝐞𝐞𝐝`, { type: "PLAYING"});
  client.user.setStatus("online");
};