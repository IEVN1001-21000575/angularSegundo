import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'auth',
        loadChildren:()=> import('./auth/features/auth.route')
    },
    {
        path:'utl',
        loadChildren:()=> import('./utl/utl.route')
    }

   


];