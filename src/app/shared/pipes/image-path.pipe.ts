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
    const [, smallSize, , bigSize] = this.imageConfig.poster_sizes;
    const imageUrl = this.getImageUrl(smallSize, url);

    if (retina) {
      const retinaImageUrl = this.getImageUrl(bigSize, url);
      return `${imageUrl} 1x, ${retinaImageUrl} 2x`;
    }

    return imageUrl;
  }

  private getImageUrl(size: string, url: string): string {
    return this.imageConfig.secure_base_url + size + url;
  }
}
