import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { MockDataService } from '../../../core/services/mock-data-service';
import { AuthorRow } from "../author-row/author-row";
import { Author } from '../../../core/models/author.model';

@Component({
  selector: 'app-authors-list',
  imports: [AuthorRow],
  templateUrl: './authors-list.html',
  styleUrl: './authors-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorsList {
  private mockService = inject(MockDataService);

  authors = signal<Author[]>(this.mockService.getAuthors());
}



