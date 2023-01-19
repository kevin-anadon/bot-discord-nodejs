// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require("lib")({ token: process.env.STDLIB_SECRET_TOKEN });
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

const VOICE_CHANNEL = "1065344995055386686";
let message = context.params.event.content;
let searchString = message.split(" ").slice(1).join(" ");
if (!(searchString === "")) {
  try {
    const answer = await ytSearch(searchString);
    const video = answer.videos[0];
    const downloadInfo = await ytdl.getInfo(video.url);

    await lib.discord.voice["@0.0.1"].tracks.play({
      channel_id: `${VOICE_CHANNEL}`,
      guild_id: `${context.params.event.guild_id}`,
      download_info: downloadInfo,
    });

    return lib.discord.channels["@0.3.0"].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `Now playing ${downloadInfo.videoDetails.title}`,
    });
  } catch {
    return lib.discord.channels["@0.3.0"].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `Song request failed 😔😟😩😭😖💔`,
    });
  }
} else {
  return lib.discord.channels["@0.3.0"].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `No String sent!! 😡`,
  });
}
