# WebCord

A little library for interacting with Discord's API.

## Usage

You can use this library to control a bot or a webhook.

### Bot

To control a bot, you must go to the [Discord Developer Portal](https://discord.com/developers/applications) and create a new Application or use an existing one.
Go to your application and open the `Bot` tab and press the `Add Bot` button and confirm. Then, press the `Reset Token` button and copy the token. Then, invite the bot to your server.

Now, you're ready to start.

```ts
import { Bot, Intents } from "https://deno.land/x/webcord@0.1.0/mod.ts";

token = "..."
chennel = "..."

// Creates a new Bot
const bot = new Bot([Intents.GUILD_MESSAGES]);

// When the bot is ready, display its tag and sends a message
bot.on("ready", (user) => {
  console.log("Logged as " + user.tag);
  bot.sendMessage(channel, {
    content: "Logged!",
  });
});

bot.login(token);
```

Replace the token with the bot's token and the channel with a channel id from the server of the bot.
When you run the script, you must see `Logged as ...#...` in the console and in the channel, you must see a message of your bot saying `Logged!`

And... Here you go!

### Webhook

To control a webhook, you must go to your Discord server, select a channel and go to its settings > Integrations > Webhooks and create a new Webhook. Then click the button to copy its url.

Now, you're ready to start.

```ts
import { Webhook } from "https://deno.land/x/webcord@0.1.0/mod.ts";

const url = "..."

const webhook = new Webhook(url);

// Sends a message saying 'Hi!'
await webhook.message({
  content: "Hi!",
});
// Modifies the Webhook user
await webhook.modify({
  name: "Custom Name",
});
```

Replace the url with your webhooks url.
When you run the script, you must see in your channel a message of your bot saying `Hi!` and the webhook's name should be changed to `"Custom Name"`

And... Here you go!

## On Beta

This project doesn't have a documentation yet and it can have some errors. If you find a bug, please report it on [Github](https://github.com/UPL123/webcord/issues)

## License

[MIT](https://choosealicense.com/licenses/mit/)
