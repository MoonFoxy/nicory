module.exports = {
  name: "take",
  hidden: false,
  module: "Экономика",
  description: "Заберет указанное количество денег у юзера",
  aliases: ['take', 'Забрать', 'забрать', 'Взять', 'взять'],
  usage: "take @пинг_юзера <количество денег>",
  cooldown: 0,
  args: false,
  async execute(message, args, client){
    const Discord = require('discord.js')
    const db = require('../utils/database.coffee')

    const getMember = require("../utils/getMember.js");
    id=getMember(args[0])

    const user = message.guild.members.resolve(id)
    let amount = parseInt(args.slice(1))
    let balance = await db.get(`${message.guild.id}_${message.author.id}`, 'money', parseInt(0));
    let int = parseInt(balance - amount)

    if (amount < 1) {
      return await message.reply('укажите сумму больше чем 0')
    }

    await db.set(`${message.guild.id}_${message.author.id}`, 'money', int);
    message.reply(`С баланса ${user} было снято ${amount} кредитов!`)
  },
  permissions: ["ADMINISTRATOR"]
};