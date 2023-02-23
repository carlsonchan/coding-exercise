import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ImsHomePhoneSubscriber,
  ImsHomePhoneSubscriberDocument,
} from '../schemas/ims-home-phone-subscriber.schema';
import { CreateUpdateImsHomePhoneSubscriberDto } from './dto/create-update-ims-home-phone-subscriber.dto';

@Injectable()
export class ImsHomePhoneSubscriberService {
  constructor(
    @InjectModel(ImsHomePhoneSubscriber.name)
    private readonly ImsHomePhoneSubscriberModel: Model<ImsHomePhoneSubscriberDocument>,
  ) {}

  async findOne(phoneNumber: number): Promise<ImsHomePhoneSubscriber> {
    return await this.ImsHomePhoneSubscriberModel.findOne({
      phoneNumber,
    }).exec();
  }

  async update(
    imsHomePhoneSubscriberDto: CreateUpdateImsHomePhoneSubscriberDto,
  ): Promise<ImsHomePhoneSubscriber> {
    const result = await this.ImsHomePhoneSubscriberModel.findOneAndUpdate(
      { phoneNumber: imsHomePhoneSubscriberDto.phoneNumber },
      { $set: imsHomePhoneSubscriberDto },
      { new: true, upsert: true },
    ).exec();

    return result;
  }

  async delete(phoneNumber: number): Promise<ImsHomePhoneSubscriber> {
    return await this.ImsHomePhoneSubscriberModel.findOneAndRemove({
      phoneNumber,
    }).exec();
  }
}
