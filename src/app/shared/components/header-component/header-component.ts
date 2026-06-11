import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Skeleton } from "primeng/skeleton";
import { ButtonDirective } from "primeng/button";

@Component({
  selector: 'app-header-component',
  imports: [
    Skeleton,
    ButtonDirective,
    RouterLink
],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class AppHeaderComponent {
}
