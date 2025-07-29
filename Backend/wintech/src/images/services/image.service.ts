import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/services/database.service';

@Injectable()
export class ImageService {
  constructor(private readonly databaseService: DatabaseService) {}

  getImagesWithLimit(limit: number, offset = 0): any[] {
    const images = this.databaseService.getImages();
    return images.slice(offset, offset + limit);
  }
}
