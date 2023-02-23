import { IsBoolean, IsNotEmpty, IsNumberString } from 'class-validator';

export class callForwardNoReply {
  @IsBoolean()
  readonly provisioned: boolean;
  @IsNotEmpty()
  readonly destination: string;
}
export class Features {
  @IsNotEmpty()
  readonly callForwardNoReply: callForwardNoReply;
}

export class CreateUpdateImsHomePhoneSubscriberDto {
  @IsNotEmpty()
  @IsNumberString()
  readonly phoneNumber: string;
  @IsNotEmpty()
  readonly username: string;
  @IsNotEmpty()
  readonly password: string;
  @IsNotEmpty()
  readonly domain: string;
  @IsNotEmpty()
  readonly status: string;
  @IsNotEmpty()
  readonly features: Features;
}
