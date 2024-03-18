import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { SlotsModule } from './slots/slots.module';
import { SlotsBuyerModule } from './slots-buyer/slots-buyer.module';
import { SlotDetailsModule } from './slot-details/slot-details.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ecom'),
    ConfigModule.forRoot({
      envFilePath: './.env.development.local',
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET.toString(),
      signOptions: { expiresIn: '5h' },
    }),
    AuthModule,
    RolesModule,
    UserModule,
    ProductsModule,
    SlotsModule,
    SlotsBuyerModule,
    SlotDetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
