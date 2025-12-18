import { Component, inject, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styles: `
  li {
    cursor: pointer;
    padding: 0.5rem 1rem;
    border: 1px solid #dee2e6;
    margin-right: -1px;
  }
  `,
})
export class Pagination implements OnInit {
  currentPage = input.required<number>();
  totalProducts = input.required<number>();

  totalPages = 0;

  hasPreviousPage = false;
  hasNextPage = false;

  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    this.totalPages = Math.ceil(+this.totalProducts() / 20);
    this.hasPreviousPage = this.currentPage() > 1;
    this.hasNextPage = this.currentPage() < this.totalPages;
  }

  navigateToPreviousPage() {
    if (this.hasPreviousPage) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.currentPage() - 1 },
        queryParamsHandling: 'merge',
        onSameUrlNavigation: 'reload',
      });
    }
  }

  navigateToNextPage() {
    if (this.hasNextPage) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.currentPage() + 1 },
        queryParamsHandling: 'merge',
        onSameUrlNavigation: 'reload',
      });
    }
  }

  navigateToFirstPage() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: 1 },
      queryParamsHandling: 'merge',
      onSameUrlNavigation: 'reload',
    });
  }
}
