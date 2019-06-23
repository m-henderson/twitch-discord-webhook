# twitch-discord-webhook
Send a discord webhook when a twitch user goes live

## Usage
Run it with the following enviroment variables by cloning the repository, installing dependencies and running it:
```
CLIENT_ID=MyTwitchClientID
STREAMER_USER_ID=
SERVER_URL=https://amazingtwitchy.example.com
DISCORD_WEBHOOK_URL=https://discordapp.com/api/webhooks.......
```
It will now listen on port 3000
### Usage with Docker (untested)
Alternatively, you can also use the docker image with the same enviroment variables and publish the port:
```shell
$ docker run -p 80:3000 -e CLIENT_ID=MyTwitchClientID -e STREAMER_USER_ID=SomeID -e SERVER_URL=https://amazingtwitchy.example.com -e  DISCORD_WEBHOOK_URL=https://discordapp.com/api/webhooks.......
ronthecookie/twitch-discord-webhook```