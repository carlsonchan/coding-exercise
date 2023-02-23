import { IsNotEmpty, IsNumberString } from 'class-validator';

export class FindOneOrDeleteParams {
  @IsNotEmpty()
  @IsNumberString()
  phoneNumber: number;
}
