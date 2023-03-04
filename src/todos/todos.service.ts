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

    async getTodos() {
        const todos = await this.todoModel.find({status: TodosConstants.ACTIVE}).sort({done: 1}).exec();
        return todos.map(todo => ({
            id: todo.id,
            title: todo.title,
            description: todo.description,
            status: todo.status,
            done: todo.done,
        }))
    }

    async getSingleTodo(todoId: string) {
        const todo = await this.findTodo(todoId);
        return {
            id: todo.id,
            title: todo.title,
            description: todo.description,
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
        await this.todoModel.findByIdAndUpdate(todoId, {status: "deleted"}).exec();
    }

    private async findTodo(id: string): Promise<Todo> {
        let todo;
        try {
            todo = await this.todoModel.findById(id).exec();
        } catch (err) {
            throw new NotFoundException('Could not find todo.');
        }
        if (!todo) {
            throw new NotFoundException('Could not find todo.');
        }
        return todo;
    }

}
