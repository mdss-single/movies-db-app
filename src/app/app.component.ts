import {
  Component,
  OnInit
} from '@angular/core';
import { ImageConfigService } from './shared/services/image-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public readonly title = 'movies-db-app';

  constructor(private readonly imageConfigService: ImageConfigService) {}

  public ngOnInit(): void {
    this.imageConfigService.loadImageConfig();
  }
}
