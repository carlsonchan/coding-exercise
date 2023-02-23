import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { ImsHomePhoneSubscriber } from '../schemas/ims-home-phone-subscriber.schema';
import { CreateUpdateImsHomePhoneSubscriberDto } from './dto/create-update-ims-home-phone-subscriber.dto';
import { FindOneOrDeleteParams } from './dto/find-one-or-delete.dto';
import { ImsHomePhoneSubscriberService } from './ims-home-phone-subscriber.service';

@Controller('ims/subscriber')
export class ImsHomePhoneSubscriberController {
  constructor(
    private imsHomePhoneSubscriberService: ImsHomePhoneSubscriberService,
  ) {}

  /**
   * Retrieve the subscriber identified by the provided phone number.
   * Validates phone number to ensure it only contains number.
   * @param params phoneNumber: string
   * @returns Subscriber resource if it exist or throws 404 error
   */
  @Get(':phoneNumber')
  async findOne(
    @Param() params: FindOneOrDeleteParams,
  ): Promise<ImsHomePhoneSubscriber> {
    const result = await this.imsHomePhoneSubscriberService.findOne(
      params.phoneNumber,
    );

    if (result == undefined) {
      throw new HttpException(
        'Subscriber record not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  /**
   * Add or update a subscriber identified by the provided phone number.
   * Validates phone number to ensure it only contains number and matches phone number in body
   * @param params phoneNumber: string
   * @param imsHomePhoneSubscriberDto subscriber object
   * @returns Newly created/updated subscriber resource or throw 400 error if the phone number
   * does not match phone number in body
   */
  @Put(':phoneNumber')
  async createOrUpdate(
    @Param() params: FindOneOrDeleteParams,
    @Body() imsHomePhoneSubscriberDto: CreateUpdateImsHomePhoneSubscriberDto,
  ): Promise<ImsHomePhoneSubscriber> {
    if (params.phoneNumber != imsHomePhoneSubscriberDto.phoneNumber) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    return await this.imsHomePhoneSubscriberService.update(
      imsHomePhoneSubscriberDto,
    );
  }

  /**
   * Remove the subscriber identified by the phone number.
   * Validates phone number to ensure it only contains number.
   * @param params phoneNumber: string
   * @returns Throws 404 error if the subscriber resource is not found
   */
  @Delete(':phoneNumber')
  async delete(@Param() params: FindOneOrDeleteParams): Promise<void> {
    const result = await this.imsHomePhoneSubscriberService.delete(
      params.phoneNumber,
    );

    if (result == undefined) {
      throw new HttpException(
        'Subscriber record not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
