import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {

    constructor(private readonly todosService: TodosService) {}

    @Post()
    async addTodo(
        @Body('title') todoTitle: string,
        @Body('description') todoDescription: string,
        @Body('status') todoStatus: string,
        @Body('done') todoDone: boolean,
    ) {
        const generatedId = await this.todosService.insertTodo(
            todoTitle, todoDescription, todoStatus, todoDone
        );
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
        @Body('description') todoDescription: string,
        @Body('done') todoDone: boolean,
    ) {
        await this.todosService.updateTodo(
            todoId, todoTitle, todoDescription, todoDone
        );
        return null;
    }

    @Delete(':id')
    async removeTodo(@Param('id') todoId: string) {
        await this.todosService.deleteTodo(todoId);
        return null;
    }
    
}
