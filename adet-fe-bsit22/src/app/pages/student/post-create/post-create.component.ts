import { Component }    from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {
  title       = '';
  categoryId  = '';
  description = '';
  loading     = false;
  success     = false;

  categories = [
    { id: '1', name: 'Textbook' },
    { id: '2', name: 'Notes' },
    { id: '3', name: 'Drafting Tools' },
    { id: '4', name: 'Laboratory Equipment' },
    { id: '5', name: 'Art Supplies' },
    { id: '6', name: 'Calculator' },
    { id: '7', name: 'USB / Storage' },
    { id: '8', name: 'Other' },
  ];

  onSubmit() {
    this.loading = true;
    // TODO: connect to API
    setTimeout(() => { this.loading = false; this.success = true; }, 1000);
  }
}
