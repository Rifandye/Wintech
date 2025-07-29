import { Controller, Get, Query } from '@nestjs/common';
import { ImageService } from '../services/image.service';

@Controller('/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('/')
  getAllImage(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ): any[] {
    const lim = limit ? parseInt(limit, 10) : 5;
    const off = offset ? parseInt(offset, 10) : 0;

    return this.imageService.getImagesWithLimit(lim, off);
  }
}
