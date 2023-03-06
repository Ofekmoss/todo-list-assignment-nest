import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './todo.model';
import * as TodosConstants from "../constants/todos.constants"

@Injectable()
export class TodosService {

    constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

    async insertTodo(title: string) {
        const newTodo = new this.todoModel({
            title
        });
        const result = await newTodo.save();
        return {
            id: result.id
        };
    }

    async getActiveTodos() {
        const todos = await this.todoModel.find({status: TodosConstants.ACTIVE}).sort({done: 1}).exec();
        return todos.map(todo => ({
            id: todo.id,
            title: todo.title,
            status: todo.status,
            done: todo.done,
        }))
    }

    async getSingleTodo(todoId: string) {
        const todo = await this.findTodo(todoId);
        return {
            id: todo.id,
            title: todo.title,
            status: todo.status,
            done: todo.done,
        }
    }

    async updateTodo(todoId: string, title: string, done: boolean) {
        const updatedTodo = await this.findTodo(todoId);
        if (title) updatedTodo.title = title;
        if (done !== undefined) updatedTodo.done = done;
        await updatedTodo.save();
    }

    async deleteTodo(todoId: string) {
        let todo = await this.todoModel.findByIdAndUpdate(todoId, {status: TodosConstants.DELETED}).exec();
        if (!todo) {
            throw new NotFoundException(TodosConstants.NOT_FOUND_ERROR);
        }
    }

    private async findTodo(id: string): Promise<Todo> {
        let todo = await this.todoModel.findById(id).exec();
        if (!todo) {
            throw new NotFoundException(TodosConstants.NOT_FOUND_ERROR);
        }
        return todo;
    }

}
