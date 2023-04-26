import {
  NgForOf,
  NgIf
} from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

type PaginationList = number[];
type PageNumber = number;

@Component({
  selector: 'tmbd-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() public currentPage: number = 0;
  @Input() public totalPages: number = 0;
  @Output() public pageChange = new EventEmitter<number>();

  private get pages(): PaginationList {
    const pages = [];

    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

  private get startPage(): PageNumber {
    const startPage = Math.max(1, this.currentPage - 2);
    return startPage > this.totalPages - 4 ? this.totalPages - 4 : startPage;
  }

  private get endPage(): PageNumber {
    const endPage = Math.min(this.totalPages, this.currentPage + 2);
    return endPage < 5 ? 5 : endPage;
  }

  public get pagesList(): PaginationList {
    return this.pages.slice(this.startPage - 1, this.endPage);
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
