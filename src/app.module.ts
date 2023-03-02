import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ofekmoss:0508801003@cluster0.hww98px.mongodb.net/test'),
    TodosModule
  ]
})

export class AppModule {}
