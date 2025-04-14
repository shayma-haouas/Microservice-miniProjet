import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UniversiteComponent } from './universite.component';

@NgModule({
  declarations: [UniversiteComponent],
  imports: [CommonModule, FormsModule],
  exports: [UniversiteComponent]
})
export class UniversiteModule {}
