import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlbumesComponent } from './components/albumes/albumes.component';
import { AlbumComponent } from './components/album/album.component';

const routes: Routes = [
  {path: '', component: AlbumesComponent},
  {path: 'albumes', component: AlbumesComponent},
  {path: 'album/:id/:name/:img', component: AlbumComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
