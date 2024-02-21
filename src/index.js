import 'dotenv/config';
import { Client, EmbedBuilder, Events, GatewayIntentBits } from 'discord.js';
import getXboxMostPlayedRanking from './functions/getXboxMostPlayedRanking.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
  console.log(`Ready! Logged in as ${ readyClient.user.tag }`);
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
    default:
      await interaction.reply('Comando não encontrado!');
  }
});

client.login(process.env.DISCORD_TOKEN);
