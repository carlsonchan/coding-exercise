import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ImsHomePhoneSubscriberDocument =
  HydratedDocument<ImsHomePhoneSubscriber>;

export class CallForwardNoReply {
  @Prop()
  provisioned: boolean;

  @Prop()
  destination: string;
}

export class Features {
  @Prop()
  callForwardNoReply: CallForwardNoReply;
}

@Schema({ strict: true, timestamps: true })
export class ImsHomePhoneSubscriber {
  // Add index for quicker look up
  @Prop({ unique: true })
  phoneNumber: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  domain: string;

  @Prop()
  status: string;

  @Prop()
  features: Features;
}

export const ImsHomePhoneSubscriberSchema = SchemaFactory.createForClass(
  ImsHomePhoneSubscriber,
);
