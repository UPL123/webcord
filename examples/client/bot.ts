import { Bot, Intents } from "../../mod.ts";

// Creates a new Bot
const bot = new Bot([Intents.GUILD_MESSAGES]);

// When an use uses an interaction
bot.on("interactionCreate", (interaction) => {
  const { user } = interaction.member;
  console.log(
    `${
      interaction.member.nick
        ? `${interaction.member.nick} (${user.username}#${user.discriminator})`
        : `${user.username}#${user.discriminator}`
    } has used '/${interaction.data?.name}'`
  );
  const { options } = interaction.data!;
  switch (interaction.data!.name) {
    case "ping": {
      bot.replyInteraction(interaction, {
        type: 4,
        data: {
          content: "Pong!",
        },
      });
      break;
    }
    case "hello": {
      bot.replyInteraction(interaction, {
        type: 4,
        data: {
          content: `Hello, ${options![0].value}`,
        },
      });
      break;
    }
  }
});

bot.on("ready", (user) => {
  console.log("Logged as " + user.tag);
  bot.sendMessage("123456789012345678", {
    content: "Logged!",
  });
});

bot.login(Deno.env.get("DISCORD_TOKEN")!);
