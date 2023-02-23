import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { ImsHomePhoneSubscriber } from 'src/schemas/ims-home-phone-subscriber.schema';
import { ImsHomePhoneSubscriberService } from './ims-home-phone-subscriber.service';

describe('ImsHomePhoneSubscriberService', () => {
  let service: ImsHomePhoneSubscriberService;
  let model: Model<ImsHomePhoneSubscriber>;

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
      providers: [
        ImsHomePhoneSubscriberService,
        {
          provide: getModelToken('ImsHomePhoneSubscriber'),
          useValue: {
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findOneAndRemove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ImsHomePhoneSubscriberService>(
      ImsHomePhoneSubscriberService,
    );
    model = module.get<Model<ImsHomePhoneSubscriber>>(
      getModelToken('ImsHomePhoneSubscriber'),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(model).toBeDefined();
  });

  it('should return a subscriber', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockImsHomePhoneSubscriber),
    } as any);

    const subscriber = await service.findOne(
      mockImsHomePhoneSubscriber.phoneNumber,
    );

    expect(subscriber).toEqual(mockImsHomePhoneSubscriber);
  });

  it('should return newly created or updated subscriber', async () => {
    jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockImsHomePhoneSubscriber),
    } as any);

    const subscriber = await service.update(mockImsHomePhoneSubscriber);

    expect(subscriber).toEqual(mockImsHomePhoneSubscriber);
  });

  it('should return a subscriber that has just been deleted', async () => {
    jest.spyOn(model, 'findOneAndRemove').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockImsHomePhoneSubscriber),
    } as any);

    const subscriber = await service.delete(
      mockImsHomePhoneSubscriber.phoneNumber,
    );

    expect(subscriber).toEqual(mockImsHomePhoneSubscriber);
  });
});
