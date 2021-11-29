import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-albumes',
  templateUrl: './albumes.component.html',
  styleUrls: ['./albumes.component.css'],
  providers: [AlbumService]
})
export class AlbumesComponent implements OnInit {
public albumes:any[] = []
public albumImage:any[] = []
search = new FormControl('');
filtro_valor = ''

  constructor(
    private _albumService: AlbumService
  ) { }


  ngOnInit() {
   this.getAlbumes()
   this.searchTrackOrArtist()
 
  }

  searchTrackOrArtist(){
  this.search.valueChanges
   .pipe(
      debounceTime(100)
   ).
   subscribe(value => {
     //console.log(value);
     this.filtro_valor = value
   })
  }

  getAlbumes(){
    this._albumService.getAlbumes().subscribe((data:any) => {
      this.albumes = data.albums.items
     /* this.albumes.forEach(album => {
        this.albumImage.push(album.images[1].url)
        //console.log(album.images[1].url)
      })*/
      
     //console.log(this.albumes)
      
    })
  }

}
