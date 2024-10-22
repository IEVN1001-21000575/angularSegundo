import { Routes } from "@angular/router";

export default [
  {
    path: 'empleados',
    loadComponent: () => import('./emplea/registro'),
  },
] as Routes;
