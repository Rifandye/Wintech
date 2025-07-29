import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DatabaseService {
  private readonly imageData: any;

  constructor() {
    const filePath = path.join(__dirname, '..', 'data', 'image.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    this.imageData = JSON.parse(fileContent);
  }

  getImages(): any[] {
    return this.imageData.images;
  }
}
