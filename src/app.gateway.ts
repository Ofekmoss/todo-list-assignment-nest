import { OnGatewayConnection, WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import * as TodosConstants from "./constants/todos.constants"

@WebSocketGateway({cors: true})
export class AppGateway {
    @WebSocketServer()
    server;

  @SubscribeMessage(TodosConstants.TODO_CHANGE_EVENT)
  handleMessage(@MessageBody() message: string): void {
    this.server.emit(TodosConstants.TODO_CHANGE_EVENT, {})
  }
}