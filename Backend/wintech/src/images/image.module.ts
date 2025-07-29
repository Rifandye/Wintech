import { Module } from '@nestjs/common';
import { ImageService } from './services/image.service';
import { ImageController } from './controllers/image.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
