import * as mongoose from 'mongoose';
import * as TodoConstants from '../constants/todos.constants';

export const TodoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    status: {type: String, required: true, default: TodoConstants.ACTIVE},
    done: {type: Boolean, required: true, default: false},
});

export interface Todo extends mongoose.Document{
    id: string;
    title: string;
    description: string;
    status: string;
    done: boolean;
}