import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

interface IMessages {
  id: string;
  text: string;
  userId: string;
  username: string;
}

const PORT_WEBSOCKET = process.env.PORT_WEBSOCKET || 3002;

@WebSocketGateway(Number(PORT_WEBSOCKET), { transports: ['websocket'] })
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  messages: IMessages[] = [];

  constructor(private logger: Logger) {}
  @WebSocketServer()
  server: Server;

  afterInit(server: any) {
    console.log('##############################');
    console.log(`WEBSOCKET is running on port ${PORT_WEBSOCKET}`);
    console.log('##############################');
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    this.server.emit('message', [payload]);
    this.messages.push(payload);
  }

  handleConnection(client: any, ...args: any[]) {
    client.emit('connection', 'Successfully connected to the server');
    client.emit('message', this.messages);
  }

  handleDisconnect(client: any) {}
}
