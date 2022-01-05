import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'about',
      loadChildren: () => import('./modules/about/about.module').then((m) => m.AboutModule),
    },
    {
      path: 'artists',
      loadChildren: () => import('./modules/artist/artist.module').then((m) => m.ArtistsModule),
    },
    {
      path: 'groups',
      loadChildren: () => import('./modules/group/group.module').then((m) => m.GroupsModule),
    },
    {
      path: 'organizations',
      loadChildren: () => import('./modules/organization/organization.module').then((m) => m.OrganizationsModule),
    },
    {
      path: 'labels',
      loadChildren: () => import('./modules/label/label.module').then((m) => m.LabelsModule),
    },
    {
      path: 'awards',
      loadChildren: () => import('./modules/award/award.module').then((m) => m.AwardsModule),
    },
    {
      path: 'venues',
      loadChildren: () => import('./modules/venue/venue.module').then((m) => m.VenuesModule),
    },
    {
      path: 'albums',
      loadChildren: () => import('./modules/album/album.module').then((m) => m.AlbumsModule),
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
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
