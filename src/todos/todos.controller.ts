import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTodoDto } from 'src/validation/createTodoDto.validation';
import { FindOneParams } from 'src/validation/FindOneParams.validation';
import { UpdateTodoDto } from 'src/validation/updateTodoDto.validation';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {

    constructor(private readonly todosService: TodosService) {}

    @Post()
    async addTodo(
        @Body() createTodoDto: CreateTodoDto,
    ) {
        const generatedId = await this.todosService.insertTodo(createTodoDto.title);
        return generatedId;
    }

    @Get()
    async getAllTodos() {
        return await this.todosService.getActiveTodos();
    }

    @Get(':id')
    async getTodo(@Param() params: FindOneParams) {
        return await this.todosService.getSingleTodo(params.id);
    }

    @Put(':id')
    async updateTodo(
        @Param() params: FindOneParams,
        @Body() updateTodoDto: UpdateTodoDto,
    ) {
        await this.todosService.updateTodo(
            params.id, updateTodoDto.title, updateTodoDto.done
        );
    }

    @Delete(':id')
    async removeTodo(@Param() params: FindOneParams) {
        await this.todosService.deleteTodo(params.id);
    }

}
