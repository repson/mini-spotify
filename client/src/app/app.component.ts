import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { collectAndResolveStyles } from '@angular/core/src/animation/animation_style_util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})

export class AppComponent implements OnInit{
  public title = 'Musify';
  public user: User;
  public identity;
  public token;
  public errorMessage;

  constructor(
    private _userService:UserService
  ){
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit(){

  }

  public onSubmit(){
    console.log(this.user);

    // Gets user data
    this._userService.signup(this.user).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;

        if(!this.identity._id){
          alert("The user is not logged correctly");
        }else{
          // Create element in local storage in order to have a user session

          // Gets the token
          this._userService.signup(this.user, 'true').subscribe(
            response => {
              let token = response.token;
              this.token = token;

              if(this.token.length <= 0){
                alert("The token is not created correctly");
              }else{
                // Create element in local storage in order to saved the token
                console.log(token);
                console.log(identity);
              }
            },
            error => {
              var errorMessage = <any>error;

              if(errorMessage != null){
                var body = JSON.parse(error._body);
                this.errorMessage = body.message;

                console.log(error);
              }
            }
          );
        }
      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;

          console.log(error);
        }
      }
    );
  }
}
