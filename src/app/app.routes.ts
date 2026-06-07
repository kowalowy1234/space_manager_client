import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { Dashboard } from './pages/dashboard/dashboard';
import { SignInPage } from './pages/sign-in-page/sign-in-page';
import { SignUpPage } from './pages/sign-up-page/sign-up-page';

export const routes: Routes = [
    {
        path: "",
        component: LandingPage
    },
    {
        path: "sign-in",
        component: SignInPage
    },
    {
        path: "sign-up",
        component: SignUpPage
    },
    {
        path: "dashboard",
        component: Dashboard
    }
];
