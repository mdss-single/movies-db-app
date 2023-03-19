import { Pipe, PipeTransform } from '@angular/core';
import { ImageConfigService } from '../services/image-config.service';

@Pipe({
  name: 'imagePath',
  standalone: true,
})
export class ImagePathPipe implements PipeTransform {
  private imageConfig = this.imageConfigService.imageConfig;

  constructor(private readonly imageConfigService: ImageConfigService) {}

  public transform(url: string, retina?: boolean): string {
    if (retina) {
      return this.imageConfig.base_url + this.imageConfig.poster_sizes[3] + url;
    }

    return this.imageConfig.base_url + this.imageConfig.poster_sizes[1] + url;
  }
}
