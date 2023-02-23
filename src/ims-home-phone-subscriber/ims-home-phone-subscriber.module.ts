import { Module } from '@nestjs/common';
import { ImsHomePhoneSubscriberService } from './ims-home-phone-subscriber.service';
import { ImsHomePhoneSubscriberController } from './ims-home-phone-subscriber.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ImsHomePhoneSubscriber,
  ImsHomePhoneSubscriberSchema,
} from '../schemas/ims-home-phone-subscriber.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ImsHomePhoneSubscriber.name,
        schema: ImsHomePhoneSubscriberSchema,
      },
    ]),
  ],
  providers: [ImsHomePhoneSubscriberService],
  controllers: [ImsHomePhoneSubscriberController],
})
export class ImsHomePhoneSubscriberModule {}
