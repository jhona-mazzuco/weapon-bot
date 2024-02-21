import 'dotenv/config';
import { ActivityType, Client, EmbedBuilder, Events, GatewayIntentBits } from 'discord.js';
import getXboxMostPlayedRanking from './functions/getXboxMostPlayedRanking.js';
import { SENUA_MESSAGE } from './constants/senua-message.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
  console.log(`Ready! Logged in as ${ readyClient.user.tag }`);
  readyClient.user.setPresence({
    status: 'online',
    activities: [
      {
        name: 'Weapon Bot',
        type: ActivityType.Playing,
      }
    ]
  });
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  switch (interaction.commandName) {
    case 'ping':
      await interaction.reply('Pong!');
      break;
    case 'xbox-most-played':
      await interaction.deferReply();

      const ranking = await getXboxMostPlayedRanking();

      interaction.fetchReply()
        .then(async () => {
          const embed = new EmbedBuilder()
            .setTitle('Mais jogados Xbox')
            .setDescription(ranking);

          await interaction.editReply({ embeds: [embed], ephemeral: true });
        });
      break;
    case 'senua':
      await interaction.reply(SENUA_MESSAGE);
      break;
    default:
      await interaction.reply('Comando não encontrado!');
  }
});

client.login(process.env.DISCORD_TOKEN);
