import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { fileLoader, TypedConfigModule } from 'nest-typed-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Config } from './config';
import { ImsHomePhoneSubscriberModule } from './ims-home-phone-subscriber/ims-home-phone-subscriber.module';

@Module({
  imports: [
    TypedConfigModule.forRoot({
      schema: Config,
      load: fileLoader(),
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [TypedConfigModule],
      useFactory: (config: Config) => {
        const options: MongooseModuleOptions = {
          uri: config.mongoHost,
        };
        return options;
      },
      inject: [Config],
    }),
    ImsHomePhoneSubscriberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
