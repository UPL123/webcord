import { Webhook } from "../../mod.ts";

const webhook = new Webhook(Deno.env.get("DISCORD_WEBHOOK")!);

// Sends a message saying 'Hi!'
await webhook.message({
  content: "Hi!",
});
// Modifies the Webhook user
await webhook.modify({
  name: "Custom Name",
});
