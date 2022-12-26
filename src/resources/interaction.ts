import { IReplyMessage, Message } from "./message.ts";
import { User } from "./user.ts";

export interface IInteraction {
  id: string;
  application_id: string;
  type: number;
  data?: {
    id: string;
    name: string;
    type: number;
    resolved?: {
      users?: Map<string, string>;
      members?: Map<string, string>;
      roles?: Map<string, string>;
      channels?: Map<string, string>;
      messages?: Map<string, string>;
      attachments?: Map<string, string>;
    };
    options?: ApplicationCommand[];
    guild_id?: string;
    target_io?: string;
  };
  guild_id?: string;
  channel_id?: string;
  member?: any;
  user?: User;
  token: string;
  version: number;
  message?: Message;
  app_permissions?: string;
  locale?: string;
  guild_locale?: string;
}

interface ApplicationCommand {
  name: string;
  type: number;
  value?: any;
  options?: ApplicationCommand[];
  focused: boolean;
}

export enum InteractionType {
  PING = 1,
  APPLICATION_COMMAND = 2,
  MESSAGE_COMPONENT = 3,
  APPLICATION_COMMAND_AUTOCOMPLETE = 4,
  MODAL_SUBMIT = 5,
}

export class Interaction implements IInteraction {
  id: string;
  application_id: string;
  type: number;
  data?:
    | {
        id: string;
        name: string;
        type: number;
        resolved?:
          | {
              users?: Map<string, string> | undefined;
              members?: Map<string, string> | undefined;
              roles?: Map<string, string> | undefined;
              channels?: Map<string, string> | undefined;
              messages?: Map<string, string> | undefined;
              attachments?: Map<string, string> | undefined;
            }
          | undefined;
        options?: ApplicationCommand[] | undefined;
        guild_id?: string | undefined;
        target_io?: string | undefined;
      }
    | undefined;
  guild_id?: string | undefined;
  channel_id?: string | undefined;
  member?: any;
  user?: User | undefined;
  token: string;
  version: number;
  message?: Message | undefined;
  app_permissions?: string | undefined;
  locale?: string | undefined;
  guild_locale?: string | undefined;
  constructor(options: IInteraction) {
    this.id = options.id;
    this.application_id = options.application_id;
    this.type = options.type;
    this.data = options.data;
    this.guild_id = options.guild_id;
    this.channel_id = options.channel_id;
    this.member = options.member;
    this.user = options.user;
    this.token = options.token;
    this.version = options.version;
    this.message = options.message;
    this.app_permissions = options.app_permissions;
    this.locale = options.locale;
    this.guild_locale = options.guild_locale;
  }
}

export interface IReplyInteraction {
  type: number;
  data?: IReplyMessage;
}

export enum InteractionCallbackType {
  PONG = 1,
  CHANNEL_MESSAGE_WITH_SOURCE = 4,
  DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5,
  DEFERRED_UPDATE_MESSAGE = 6,
  UPDATE_MESSAGE = 7,
  APPLICATION_COMMAND_AUTOCOMPLETE_RESULT = 8,
  MODAL = 9,
}
