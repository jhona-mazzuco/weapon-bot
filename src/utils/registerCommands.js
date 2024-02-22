import 'dotenv/config';
import { REST, Routes } from 'discord.js';

const registerCommands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'xbox-most-played',
    description: 'Show the most played games of Xbox',
  },
  {
    name: 'playstation-most-played',
    description: 'Show the most played games of Playstation',
  },
  {
    name: 'senua',
    description: 'Senua description',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(process.env.APP_ID), { body: registerCommands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}
