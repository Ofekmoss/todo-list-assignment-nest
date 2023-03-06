import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'
import { AppGateway } from './app.gateway';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    TodosModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
  ],
  providers: [AppGateway]
})

export class AppModule {}
