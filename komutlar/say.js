const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if(!message.member.roles.get("791670300692709378") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.RichEmbed().setDescription("Bu Komutu Kullanmaya Yetkin Yok.")).setColor('BLACK')

	if (!message.guild) return message.author.sendMessage('Bu Komutu Sadece Sunucularda Kulanabilirsiniz.');

    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    var jaus =  message.guild.members.filter(r=>r.roles.has("792076267016159273")).size.toString()
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
  let jaus2 = '⚔'// tagın yoksa sil hata verirse artemus sunucudan yardım alabilirsin. https://discord.gg/hK9wmKT - discord.gg/artemus
    const jausunuz = new Discord.RichEmbed()
        .setColor("BLACK")
        .setAuthor(`${message.guild.name}`, `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.webp`)
        .setDescription(`
        • Sunucuda toplam \`${message.guild.memberCount}\` Üye bulunmaktadır. \n 
        • Sesli sohbette \`${count}\` Kişi bulunmaktadır.\n
        • Tagda toplam \`${message.guild.members.filter(m => m.user.username.includes(jaus2)).size}\` Kişi bulunmaktadır.\n 
        • Toplam booster \`${jaus}\` Kişi bulunmaktadır.`)
    
        .setThumbnail(message.author.avatarURL)
           .setTimestamp()
    .setFooter(`Synayzen`)
    message.channel.send(jausunuz)

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['botbilgi'],
    permLevel: 0
};

exports.help = {
    name: 'say',
    description: 'Say',
    usage: 'say'
};