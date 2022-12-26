import { Embed } from "../util/embed.ts";
import { User } from "./user.ts";

export interface IReplyMessage {
  content?: string;
  tts?: boolean;
  embeds?: Embed[];
  allowed_mentions?: {
    role: string[];
    users: string[];
    everyone: string[];
  };
  message_reference?: {
    message_id?: string;
    channel_id?: string;
    guild_id?: string;
    fall_if_not_exists?: boolean;
  };
  /** TODO: Complete types */
  components?: any[];
  /** TODO: Complete types */
  sticker_ids?: any[];
  /** TODO: Complete types */
  files?: any[];
  payload_json?: string;
  /** TODO: Complete types */
  attachments?: any[];
  flags?: number;
}

export class ReplyMessage {
  options: IReplyMessage;
  constructor(options: IReplyMessage) {
    this.options = options;
  }
}

export interface IMessage {
  id: string;
  channel_id: string;
  author?: User;
  type?: number;
  content?: string;
  tts?: boolean;
  embeds?: Embed[];
  message_reference?: {
    message_id: string;
    channel_id: string;
    guild_id: string;
    fall_if_not_exists: boolean;
  };
  /** TODO: Complete types */
  components?: any[];
  /** TODO: Complete types */
  stickers?: any[];
  /** TODO: Complete types */
  sticker_items?: any[];
  /** TODO: Complete types */
  files?: any[];
  payload_json?: string;
  attachments?: any[];
  flags?: number;
}

export class Message implements IMessage {
  id: string;
  channel_id: string;
  author?: User;
  type?: number;
  content?: string;
  tts?: boolean;
  embeds?: Embed[];
  message_reference?: {
    message_id: string;
    channel_id: string;
    guild_id: string;
    fall_if_not_exists: boolean;
  };
  /** TODO: Complete types */
  components?: any[];
  /** TODO: Complete types */
  stickers?: any[];
  /** TODO: Complete types */
  sticker_items?: any[];
  /** TODO: Complete types */
  files?: any[];
  /** TODO: Complete types */
  payload_json?: string;
  /** TODO: Complete types */
  attachments?: any[];
  flags?: number;
  constructor(options: IMessage) {
    this.id = options.id;
    this.channel_id = options.channel_id;
    this.author = options.author;
    this.type = options.type;
    this.content = options.content;
    this.tts = options.tts;
    this.embeds = options.embeds;
    this.message_reference = options.message_reference;
    this.components = options.components;
    this.stickers = options.stickers;
    this.sticker_items = options.sticker_items;
    this.files = options.files;
    this.payload_json = options.payload_json;
    this.attachments = options.attachments;
    this.flags = options.flags;
  }
}
