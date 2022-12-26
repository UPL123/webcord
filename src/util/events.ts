import { Interaction } from "../resources/interaction.ts";
import { Message } from "../resources/message.ts";

export interface EventMap {
  ready: Ready;
  messageCreate: Message;
  interactionCreate: Interaction;
  [event: string]: any;
}

export interface Ready {
  name: string;
  tag: string;
  bot: boolean;
  id: number;
}
