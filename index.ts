import TwitchClient from "twitch";
import express from "express";
import DiscordWebhook, { Webhook } from "discord-webhook-ts";
const app = express();
const port = process.env.PORT || 3000;
const clientId = process.env.CLIENT_ID;
const streamerUserId = process.env.STREAMER_USER_ID;
const serverURL = process.env.SERVER_URL;
const discordWebhookURL = process.env.DISCORD_WEBHOOK_URL;
if (!clientId || !streamerUserId || !serverURL || !discordWebhookURL)
    throw new TypeError("One of the required enviroment variables weren't set");
const discordWebhook = new DiscordWebhook(discordWebhookURL);
const twitchClient = TwitchClient.withClientCredentials(clientId);
twitchClient.helix.webHooks.subscribeToStreamChanges(streamerUserId, {
    callbackUrl: `${serverURL}/webhook`
});
app.use(express.json());
interface MinimalTwitchUser {
    started_at: string;
    user_name: string;
    title: string;
    thumbnail_url: string;
}
app.get("/webhook", (req, res) => {
    if (!req.body.data) return;
    const twitchy: MinimalTwitchUser = req.body.data[0];
    const started = new Date(twitchy.started_at);
    started.setMinutes(0, 0, 0);
    const now = new Date();
    now.setMinutes(0, 0, 0);
    if (now.getTime() !== started.getTime()) return res.sendStatus(204); // the stream didnt just start
    discordWebhook.execute({
        content: "@here",
        embeds: [
            {
                author: {
                    name: twitchy.user_name + " is now live (click to watch)",
                    url: "https://twitch.tv/"+twitchy.user_name
                },
                image: {
                    url: twitchy.thumbnail_url
                    .replace("{width}", "1280")
                    .replace("{height}", "720")
                }
            }
        ]
    });
    res.sendStatus(200);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
