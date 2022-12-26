import { GatewayManager } from "../util/gateway.ts";
import { EventMap } from "../util/events.ts";
import { IReplyMessage, Message } from "../resources/message.ts";
import { API_URL } from "../util/const.ts";
import { Interaction, IReplyInteraction } from "../resources/interaction.ts";

export class Bot {
  token: string;
  intents: number | number[];
  private gateway: GatewayManager | undefined;
  events: { [str: string]: (...params: any) => void };

  constructor(intents: number[] | number) {
    this.intents = intents;
    this.token = "";
    this.events = {};
  }

  on<K extends keyof EventMap>(
    type: K,
    listener: (this: Bot, ev: EventMap[K]) => any
  ) {
    this.events[type] = listener;
  }

  login(token: string) {
    this.token = token;
    this.gateway = new GatewayManager(token);
    this.gateway.start(this.intents, this.events);
  }

  async sendMessage(channel_id: string, message: IReplyMessage) {
    const data = await (
      await fetch(`${API_URL}/channels/${channel_id}/messages`, {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
          Authorization: `Bot ${this.token}`,
          "Content-Type": "application/json",
        },
      })
    ).json();
    return data;
  }

  async replyMessage(message: Message, reply: IReplyMessage) {
    reply.message_reference = {
      message_id: message.id,
    };
    const data = await (
      await fetch(`${API_URL}/channels/${message.channel_id}/messages`, {
        method: "POST",
        body: JSON.stringify(reply),
        headers: {
          Authorization: `Bot ${this.token}`,
          "Content-Type": "application/json",
        },
      })
    ).json();
    return data;
  }

  async replyInteraction(interaction: Interaction, reply: IReplyInteraction) {
    await fetch(
      `${API_URL}/interactions/${interaction.id}/${interaction.token}/callback`,
      {
        method: "POST",
        body: JSON.stringify(reply),
        headers: {
          Authorization: `Bot ${this.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return true;
  }
}
