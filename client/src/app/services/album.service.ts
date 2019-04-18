import { Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Album } from '../models/album';

@Injectable()
export class AlbumService{
    public url: string;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }

    addAlbum(token, album: Album){
        let params = JSON.stringify(album);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url + 'album', params, {headers: headers})
                        .map(res => res.json());
    }
}