// deno-lint-ignore-file
import { Message } from "../resources/message.ts";
import { OPCodes } from "./opcodes.ts";

export class GatewayManager {
  socket: WebSocket | undefined;
  token: string;
  interval = 0;

  constructor(token: string) {
    this.token = token;
  }

  start(
    intents: number[] | number,
    events: { [x: string]: (...params: any) => void }
  ) {
    const { token } = this;
    if (Array.isArray(intents)) {
      intents = intents.reduce((prev, acc) => {
        return (acc += prev);
      });
    }
    this.interval = 0;
    const payload = {
      op: 2,
      d: {
        token,
        intents,
        properties: {
          $os: "linux",
          $browser: "webcord",
          $device: "webcord",
        },
      },
    };
    this.socket = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
    this.socket.addEventListener("message", ({ data }) => {
      const payload = JSON.parse(data);
      const { t, event, op, d } = payload;

      switch (op) {
        case OPCodes.TEN: {
          const { heartbeat_interval } = d;
          this.interval = this.heartbeat(heartbeat_interval);
        }
      }
      switch (t) {
        case "READY": {
          const user = {
            name: d.user.username,
            tag: d.user.username + "#" + d.user.discriminator,
            bot: d.user.bot || false,
            id: d.user.id,
          };
          events.ready ? events.ready(user) : null;
          break;
        }
        case "MESSAGE_CREATE": {
          events.messageCreate ? events.messageCreate(new Message(d)) : null;
          break;
        }
        case "INTERACTION_CREATE": {
          events.interactionCreate ? events.interactionCreate(d) : null;
          break;
        }
      }
    });
    waitForSocketConnection(this.socket, () => {
      this.socket!.send(JSON.stringify(payload));
    });
  }

  private heartbeat(ms: number) {
    return setInterval(() => {
      this.socket!.send(JSON.stringify({ op: OPCodes.ONE, d: null }));
    }, ms);
  }
}

// https://stackoverflow.com/a/21394730
function waitForSocketConnection(socket: WebSocket, callback: () => void) {
  setTimeout(function () {
    if (socket.readyState === 1) {
      if (callback != null) {
        callback();
      }
    } else {
      waitForSocketConnection(socket, callback);
    }
  }, 5);
}
