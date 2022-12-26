import { IReplyMessage } from "../resources/message.ts";
import { Embed } from "../util/embed.ts";
import { WebhookConfig } from "../util/webhook.ts";

export class Webhook {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  async message(message: IReplyMessage) {
    await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async modify(options: WebhookConfig) {
    await fetch(this.url, {
      method: "PATCH",
      body: JSON.stringify(options),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
