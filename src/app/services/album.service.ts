import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlbumService {
 token ="BQB3hBshm11uo3Rv5CYWNP-s7b6GCjJhCLWmD4p8O1GBq53KZPf0_A4RQtvSJR_WFZPFzfT9CqKpsXYIuNA"
 headers: HttpHeaders = new HttpHeaders({
  'Authorization': `Bearer ${this.token}`
 });
  constructor(
    private _http: HttpClient
  ) { }

getAlbumes(): Observable<any>{
 return this._http.get('https://api.spotify.com/v1/browse/new-releases?country=ES&limit=30', {headers: this.headers});
}

getAlbumTracks(id:any): Observable<any>{
  return this._http.get('https://api.spotify.com/v1/albums/'+id+'/tracks', {headers: this.headers});
}

getTrack(id:any): Observable<any>{
  return this._http.get('https://api.spotify.com/v1/tracks/'+id, {headers: this.headers});
}

/**------------ */
}
