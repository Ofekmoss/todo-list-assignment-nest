import { IsString, IsNotEmpty, IsEmail, IsLowercase, IsBoolean, IsOptional } from 'class-validator';

export class UpdateTodoDto {
  
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    done: boolean;
}