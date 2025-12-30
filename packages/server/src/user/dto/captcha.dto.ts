import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CaptchaDto {
  @IsNotEmpty({message: 'Please select the verification code type'})
  @IsString({message: 'The id type is limited to a string'})
  type: string
}