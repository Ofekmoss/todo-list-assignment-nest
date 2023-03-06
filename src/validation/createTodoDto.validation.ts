import { IsString, IsNotEmpty, IsEmail, IsLowercase } from 'class-validator';

export class CreateTodoDto {
  
    @IsString()
    @IsNotEmpty()
    title: string;

}