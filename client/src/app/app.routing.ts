import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import user
import { HomeComponent } from './components/home.component';
import { UserEditComponent } from './components/user-edit.component';

// import artist
import { ArtistListComponent } from './components/artist-list.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'artists/:page', component: ArtistListComponent},
    {path: 'my-data', component: UserEditComponent},
    {path: '**', component: HomeComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
