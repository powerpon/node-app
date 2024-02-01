import { Socket } from "net";
import { Server } from "http";

export default function gracefulServerShutdown(server: Server){
    let connections: Socket[] = [];

    server.on('connection', (connection) => {
        connections.push(connection);
        connection.on('close', () => {
            connections = connections.filter((currentConnection) => currentConnection != connection);
        });
    });

    function gracefulShutdown() {
        console.log('Shutting down...');
        server.close(() => {
            process.exit(0);
        });
        setTimeout(() => {
            console.log('Error, forcefully shutting down...');
            process.exit(1);
        }, 20000);
        connections.forEach((currentConnection) => currentConnection.end());
        setTimeout(() => {
            connections.forEach((currentConnection) => currentConnection.destroy());
        }, 10000);
    }

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
}
