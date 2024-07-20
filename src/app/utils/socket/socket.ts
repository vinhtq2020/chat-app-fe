import EventEmitter from "events";

export class Socket {
  private ws: WebSocket;
  private ee: EventEmitter;
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
  }
  on(name: string, listener: (...args: any[]) => void) {
    this.ee.on(name, listener);
  }

  off(name: string, listener: (...args: any[]) => void) {
    this.ee.removeListener(name, listener);
  }

  error(e: Event) {
    console.log("websocket error: ", e);
  }

  emit<R>(name: string, data: R) {
    const message = JSON.stringify({ name, data });    
    this.ws.send(message);
  }

  open(event: Event) {
    this.ee.emit("connect");
  }

  close() {
    this.ee.emit('disconnect');
  }
  message(e: MessageEvent) {
    try {
      const message = JSON.parse(e.data);      
      this.ee.emit(message.name, message.data);
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
