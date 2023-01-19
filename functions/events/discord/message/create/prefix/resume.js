const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const VOICE_CHANNEL = '1065344995055386686';
let message = context.params.event.content;

await lib.discord.voice['@0.0.1'].tracks.resume({
  guild_id: `${context.params.event.guild_id}`,
});

await lib.discord.channels['@0.3.0'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: `Song resumed.`
});