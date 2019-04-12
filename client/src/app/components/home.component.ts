import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'artist-list',
    templateUrl: '../views/home.html',
})

export class HomeComponent implements OnInit{
    public title: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
    ){
        this.title = 'Artists';
    }

    ngOnInit(){
        console.log('home.component.ts loaded');
    }
}
