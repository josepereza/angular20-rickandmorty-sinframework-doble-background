import { Routes } from '@angular/router';
import { Hero } from './pages/hero/hero';

export const routes: Routes = [

     { path: '', component: Hero },
    { path: 'characters', loadComponent:()=>import('./pages/character-list/character-list')},
    { path: 'character/:id', loadComponent:()=>import('./pages/character-detail/character-detail')},
    { path: '**', redirectTo: '' }
];
