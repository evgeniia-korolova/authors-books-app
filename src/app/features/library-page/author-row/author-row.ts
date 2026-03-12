import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Author } from '../../../core/models/author.model';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { ResponsiveService } from '../../../core/services/responsive-service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-author-row',
  imports: [RouterLink, TitleCasePipe, MatIconModule],
  templateUrl: './author-row.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorRow {
  protected readonly responsiveService = inject(ResponsiveService);
  
  author = input.required<Author>();
  removeAuthor = output<Author>();
  editAuthor = output<Author>();

  onEdit(author: Author) {    
    this.editAuthor.emit(author);
  }



  onRemove(author: Author) {
    this.removeAuthor.emit(author);
  }
}
