import { Component } from '@angular/core';

@Component({
  selector: 'tmbd-not-found',
  standalone: true,
  template: '<img src="assets/images/404.jpg" alt="">',
  styles: [':host { display:block; margin: 50px auto 0; text-align:center; }']
})
export class NotFoundComponent {

}
