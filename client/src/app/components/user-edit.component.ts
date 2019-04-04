import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
    selector: 'user-edit',
    templateUrl: '../views/user-edit.html',
    providers: [UserService]
})

export class UserEditComponent implements OnInit{
    public title: string;
    public user: User;
    public identity;
    public token;
    public alertMessage;

    constructor(
        private _userService: UserService
    ){
        this.title = 'Update my data';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;
    }

    ngOnInit(){
        console.log('user-edit.component.ts loaded');
    }

    onSubmit(){
        this._userService.updateUser(this.user).subscribe(
            response => {
                this.user = response.user;

                if(!response.user){
                    this.alertMessage = 'The user is not updated';
                }else{
                    // this.user = response.user;
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    document.getElementById("identity_name").innerHTML = this.user.name;

                    this.alertMessage = 'The user is updated successfully';
                }
            },
            error => {
                var errorMessage = <any>error;

                if(errorMessage != null){
                    var body = JSON.parse(error._body);
                    this.alertMessage = body.message;

                    console.log(error);
                }
            }
        );
    }
}