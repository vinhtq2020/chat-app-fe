import EventEmitter from "events";

export class Socket<T extends string> {
  private ws: WebSocket;
  private ee: EventEmitter;
  private messageHandlers: Set<(name: string, data: string) => void> =
    new Set();
  constructor(wurl: string, ee: EventEmitter = new EventEmitter()) {
    this.ee = ee;
    this.ws = new WebSocket(wurl);
    this.ws.onerror = this.error.bind(this);
    this.ws.onopen = this.open.bind(this);
    this.ws.onmessage = this.message.bind(this);
    this.ws.onclose = this.close.bind(this);
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
    this.close = this.close.bind(this);
    this.addMessageHandler = this.addMessageHandler.bind(this);
    this.removeMessageHandler = this.removeMessageHandler.bind(this);
  }
  on(name: T, listener: (...args: any[]) => void) {
    this.ee.on(name, listener);
  }

  off(name: T, listener: (...args: any[]) => void) {
    this.ee.removeListener(name, listener);
  }

  error(e: Event) {
    console.log("websocket error: ", e);
  }

  emit<R>(name: T, data: R) {
    const message = JSON.stringify({ name, data });
    this.ws.send(message);
  }

  open() {
    this.ee.emit("connect");
  }

  close() {
    this.ee.emit("disconnect");
  }

  addMessageHandler = (handler: (name: string, data: any) => void) => {
    this.messageHandlers.add(handler);
  };

  removeMessageHandler = (handler: (name: string, data: any) => void) => {
    this.messageHandlers.delete(handler);
  };

  message(e: MessageEvent) {
    try {
      const message = JSON.parse(e.data);
      this.ee.emit(message.name, message.data);
      this.messageHandlers.forEach((handler) => {
        handler(message.name, message.data);
      });
    } catch (err) {
      this.ee.emit("error", err);
      console.log(Date().toString() + ": ", err);
    }
  }
  readyState() {
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        console.log("connecting");

        // do something
        break;
      case WebSocket.OPEN:
        // do something
        console.log("open");

        break;
      case WebSocket.CLOSING:
        // do something
        console.log("closing");

        break;
      case WebSocket.CLOSED:
        console.log("CLOSED");
        // do something
        break;
      default:
        // this never happens
        console.log("never happens");

        break;
    }
  }
}
