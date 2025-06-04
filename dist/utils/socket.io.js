import { Server } from "socket.io";
export default class IO extends Server {
    static instance = undefined;
    constructor(server) {
        super(server, {
            cors: {
                origin: process.env.Client_URL || 'http://localhost:3000',
                credentials: true
            }
        });
    }
    static init(server) {
        if (IO.instance)
            throw new Error("Socket.io already initialized");
        IO.instance = new IO(server);
    }
    static getIO() {
        if (!IO.instance)
            throw new Error("Socket.io not initialized. Call init() first.");
        return this.instance;
    }
}
