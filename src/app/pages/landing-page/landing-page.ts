import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-landing-page',
  imports: [
    ButtonModule,
    SkeletonModule,
    AnimateOnScrollModule,
    RouterLink
],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {}
