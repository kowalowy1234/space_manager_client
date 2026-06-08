import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
  selector: 'app-landing-page',
  imports: [
    ButtonModule,
    SkeletonModule,
    AnimateOnScrollModule
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {}
