import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3030, {
  cors: {
    origin: [
      'http://127.0.0.1:5500',
      'http://127.0.0.1:5173',
      'http://localhost:5173',
    ],
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);

    // Broadcast to all clients except the one that just connected
    client.broadcast.emit('user-joined', {
      message: `New user joined: ${client.id}`,
    });
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);

    this.server.emit('user-left', { message: `User left: ${client.id}` });
  }

  @SubscribeMessage('newMessage')
  handleNewMessage(@MessageBody() message: string): void {
    this.server.emit('message', {
      message,
    });
  }
}
