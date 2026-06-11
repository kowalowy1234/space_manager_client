import { Component, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { Skeleton } from "primeng/skeleton";
import { ButtonDirective } from "primeng/button";
import { AuthService } from '../../services/auth.service';
import { filter, Subscription } from 'rxjs';

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
  isSignedIn = signal(false);
  isInSignInPage = signal(false);

  subscriptions = new Subscription();

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(this.authService.isSignedInObservable().subscribe((value) => {
      if (value) {
        this.isSignedIn.set(value)
      }
    }));

    this.subscriptions.add(this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isInSignInPage.set(event.urlAfterRedirects === '/sign-in')
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
