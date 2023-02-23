import { IsString } from 'class-validator';

export class Config {
  @IsString()
  public readonly mongoHost!: string;
}
