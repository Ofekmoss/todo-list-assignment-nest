import { IsString } from "class-validator";
import { IsObjectId } from "./isObjectId.validation";

export class FindOneParams {
  
    @IsString()
    @IsObjectId()
    id: string;

}