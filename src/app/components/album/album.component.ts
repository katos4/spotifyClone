import { Component, OnInit, ViewChild, ElementRef, Renderer2, SecurityContext } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';
import * as moment from 'moment';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
  providers: [AlbumService]
})
export class AlbumComponent implements OnInit {
  @ViewChild("playButton") playButton: ElementRef | undefined;

  public tracks:any[] = [];
  public trackDuration = ""
  public nowPlaying = ""
  public nowArtist = ""
  public imagePlayer= "../../../assets/botonplay.png"
  public listenFull = ""
  public listenMsg = ""
  public errorSong = ""
  public albumTitle = ""
  public albumTitleImg = ""
  public music = new Audio();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _albumService: AlbumService,
    private renderer: Renderer2,
    public sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    this.loadPage()
  }
  
  loadPage(){
    let id, name, img;
    this._route.params.subscribe(params => {
      id = params['id'];
      name = params['name']
      img = params['img']
      this.albumTitle = name;
      this.albumTitleImg = img;
      this.getAlbumTracks(id)
    });
  }

  getAlbumTracks(id:any){
    this._albumService.getAlbumTracks(id).subscribe((data:any) => {
      this.tracks = data.items
      //console.log(data)
      this.tracks.forEach(track => {
       track.duration_min = this.milisecondToMin(track.duration_ms)
      //console.log(track)
      })
      //console.log(this.tracks)
    })
  }

  milisecondToMin(valor:any){
    var time = moment(valor).format("mm:ss")
    return time;
  }

 
  playAudio(track:any){
    if(track == null || track == ""){
      console.log('audio no disponible')
      this.errorSong = "Esta canción no está disponible"
    }else {
      //console.log(track)
      this.music.src = track.preview_url;
      this.music.play();
      this.nowPlaying = track.name;
      this.nowArtist = track.artists[0].name;
      this.imagePlayer = '../../../assets/botonpausa.png';
      if(track.external_urls.spotify){
        this.listenFull = track.external_urls.spotify
        this.listenMsg = "Escucha la canción entera aqui"
      }else {
        this.listenMsg = ""
      }
      
    }
  }


  stopAudio(){
   if(this.imagePlayer !== "../../../assets/botonplay.png" ){
    this.music.pause();
    this.nowPlaying = ""
    this.nowArtist = ""
    this.imagePlayer = '../../../assets/botonplay.png';
    this.errorSong = ""
    this.listenFull =""
    this.listenMsg = ""
   }
  }

  /**------ */
}
