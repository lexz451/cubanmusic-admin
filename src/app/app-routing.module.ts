import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'about',
      loadChildren: () => import('./modules/about/about.module').then((m) => m.AboutModule),
    },
  ]),
  Shell.childRoutes([
    {
      path: 'artists',
      loadChildren: () => import('./modules/artists/artists.module').then((m) => m.ArtistsModule) },
  ]),
  Shell.childRoutes([
    {
      path: 'groups',
      loadChildren: () => import('./modules/groups/groups.module').then((m) => m.GroupsModule) },
  ]),
  Shell.childRoutes([
    {
      path: 'organizations',
      loadChildren: () => import('./modules/organizations/organizations.module').then((m) => m.OrganizationsModule),
    },
  ]),
  Shell.childRoutes([
    {
      path: 'labels',
      loadChildren: () => import('./modules/labels/labels.module').then((m) => m.LabelsModule),
    },
  ]),
  Shell.childRoutes([
    {
      path: 'awards',
      loadChildren: () => import('./modules/awards/awards.module').then((m) => m.AwardsModule),
    },
  ]),
  Shell.childRoutes([
    {
      path: 'venues',
      loadChildren: () => import('./modules/venues/venues.module').then((m) => m.VenuesModule),
    },
  ]),
  Shell.childRoutes([
    {
      path: 'albums',
      loadChildren: () => import('./modules/albums/albums.module').then((m) => m.AlbumsModule),
    },
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload',
      urlUpdateStrategy: 'deferred',
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
