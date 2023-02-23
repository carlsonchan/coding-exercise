import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ImsHomePhoneSubscriberController } from './ims-home-phone-subscriber.controller';
import { ImsHomePhoneSubscriberService } from './ims-home-phone-subscriber.service';

describe('ImsHomePhoneSubscriberController', () => {
  let controller: ImsHomePhoneSubscriberController;
  let service: ImsHomePhoneSubscriberService;

  const mockImsHomePhoneSubscriber = {
    phoneNumber: '1',
    username: '1user',
    password: 'p@ssw0rd!',
    domain: 'network.org',
    status: 'ACTIVE',
    features: {
      callForwardNoReply: {
        provisioned: true,
        destination: 'tel:+1',
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImsHomePhoneSubscriberController],
      providers: [
        {
          provide: ImsHomePhoneSubscriberService,
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ImsHomePhoneSubscriberController>(
      ImsHomePhoneSubscriberController,
    );
    service = module.get<ImsHomePhoneSubscriberService>(
      ImsHomePhoneSubscriberService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findOne()', () => {
    it(`should return ImsHomePhoneSubscriber`, async () => {
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValueOnce(mockImsHomePhoneSubscriber);

      const result = await controller.findOne({
        phoneNumber: mockImsHomePhoneSubscriber.phoneNumber,
      });

      expect(result).toBe(mockImsHomePhoneSubscriber);
    });

    it(`should throw not found error when phoneNumber not found`, async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);

      await expect(
        controller.findOne({
          phoneNumber: mockImsHomePhoneSubscriber.phoneNumber,
        }),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('createOrUpdate()', () => {
    it(`should return newly created or updated subscriber`, async () => {
      jest
        .spyOn(service, 'update')
        .mockResolvedValueOnce(mockImsHomePhoneSubscriber);

      const result = await controller.createOrUpdate(
        { phoneNumber: mockImsHomePhoneSubscriber.phoneNumber },
        mockImsHomePhoneSubscriber,
      );

      expect(result).toBe(mockImsHomePhoneSubscriber);
    });

    it(`should throw bad request error when the phone number and dto don't match`, async () => {
      jest.spyOn(service, 'update').mockResolvedValueOnce(null);

      await expect(
        controller.createOrUpdate(
          { phoneNumber: '0' },
          mockImsHomePhoneSubscriber,
        ),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('delete()', () => {
    it(`should successfully delete subscriber`, async () => {
      const deleteSpy = jest
        .spyOn(service, 'delete')
        .mockResolvedValueOnce(mockImsHomePhoneSubscriber);

      await controller.delete({
        phoneNumber: mockImsHomePhoneSubscriber.phoneNumber,
      });

      expect(deleteSpy).toBeCalledWith(mockImsHomePhoneSubscriber.phoneNumber);
    });

    it(`should throw not found error when phoneNumber not found`, async () => {
      jest.spyOn(service, 'delete').mockResolvedValueOnce(null);

      await expect(
        controller.delete({
          phoneNumber: mockImsHomePhoneSubscriber.phoneNumber,
        }),
      ).rejects.toThrow(HttpException);
    });
  });
});
