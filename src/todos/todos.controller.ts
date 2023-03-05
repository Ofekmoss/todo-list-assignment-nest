import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { MessageBody, SubscribeMessage } from '@nestjs/websockets/decorators';
import { Server } from 'socket.io';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {

    constructor(private readonly todosService: TodosService) {}

    @Post()
    async addTodo(
        @Body('title') todoTitle: string,
    ) {
        const generatedId = await this.todosService.insertTodo(todoTitle);
        return generatedId;
    }

    @Get()
    async getAllTodos() {
        return await this.todosService.getTodos();
    }

    @Get(':id')
    async getTodo(@Param('id') todoId: string) {
        return await this.todosService.getSingleTodo(todoId);
    }

    @Put(':id')
    async updateTodo(
        @Param('id') todoId: string,
        @Body('title') todoTitle: string,
        @Body('done') todoDone: boolean,
    ) {
        await this.todosService.updateTodo(
            todoId, todoTitle, todoDone
        );
        return null;
    }

    @Delete(':id')
    async removeTodo(@Param('id') todoId: string) {
        await this.todosService.deleteTodo(todoId);
        return null;
    }

}
