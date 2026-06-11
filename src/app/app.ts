import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Skeleton } from "primeng/skeleton";
import { ButtonDirective } from "primeng/button";
import { AppHeaderComponent } from "./shared/components/header-component/header-component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AppHeaderComponent
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('client');

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    if (this.authService.isSignedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }
}
