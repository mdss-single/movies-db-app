import {
  JsonPipe,
  NgForOf,
  NgIf
} from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

type PaginationList = PageNumber[];
type PageNumber = number;

@Component({
  selector: 'tmbd-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  imports: [
    NgForOf,
    NgIf,
    JsonPipe
  ],
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() public currentPage: number = 0;
  @Input() public totalPages: number = 0;
  @Output() public pageChange = new EventEmitter<number>();

  private get lastPageInList(): PageNumber {
    const lastPage = Math.min(this.totalPages, this.currentPage + 2);
    return lastPage < 5 ? 5 : lastPage;
  }

  public get pages(): PaginationList {
    return [...Array(this.lastPageInList + 1).keys()].slice(1);
  }

  public get pagesShiftBefore(): boolean {
    return this.currentPage - 2 > 1;
  }

  public get pagesShiftAfter(): boolean {
    return this.currentPage + 2 < this.totalPages;
  }

  public previousClick(): void {
    this.currentPage -= 1;
    this.emitValue(this.currentPage);
  }

  public nextClick(): void {
    this.currentPage += 1;
    this.emitValue(this.currentPage);
  }

  public onPageClick(page: PageNumber): void {
    if (this.currentPage === page) {
      return;
    }

    this.currentPage = page;
    this.emitValue(this.currentPage);
  }

  private emitValue(page: PageNumber): void {
    this.pageChange.emit(page);
  }
}
