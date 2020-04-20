const Discord = require('discord.js');
const client = new Discord.Client();

const { tts } = require('./utils');
const settings = require('./settings');

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {

    if (message.content.includes('-tts')) {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            const text = message.content.replace('-tts', '');
            const audio = await tts(text);

            const dispatcher = connection.play(audio);

            dispatcher.on('finish', () => {
                connection.disconnect();
            });

            dispatcher.on('error', () => {
                connection.disconnect();
            });
        } else {
            message.reply('Você precisa estar em um canal para escutar a mensagem.');
        }
    }
});

client.login(settings.token);