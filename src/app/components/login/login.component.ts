import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/sevices/data.service';
import {Router} from "@angular/router"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Request } from 'src/app/models/request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: any;
  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute, private router: Router,private http:HttpClient){}


  UserLog: User[] = [];
  User: any= {
    username:'',
    password:'',
    is_super:'',
    is_admin:''
  }


  ngOnInit() {
    
  }

  login = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  get username() {
    return this.login.controls['username'];
  }

  get password() {
      return this.login.controls['password'];
  }

  notLogin:boolean=false


  doSignin() {
		const request: any = { username: this.login.get('username')?.value, password: this.login.get('password')?.value};
      		//alert("login : " + request.username+"--"+request.password)
			
//console.log(request);

    
      		//alert("login : " + request.username)
		this.dataservice.signin(request).subscribe((result:any)=> {
      

      //console.log(result);
      
    
          sessionStorage.setItem('is_admin', result.role)
          sessionStorage.setItem('tokenExp',this.dateExp); 
          sessionStorage.setItem('check','in')
          sessionStorage.setItem('cnt','0')
          
          
          if (localStorage.getItem('sessionIsActive')=='1') {
            //alert('Une session est déjà active.');
            this.router.navigate(['/er'])
            //window.location.href='/'
          } else {
            // Ouvre la fenêtre et active la session
            
            
            
            //sessionStorage.setItem('load','0')
            if (result.role!='ADMIN') {
              this.router.navigate(['/home'])
            } else {
              this.router.navigate(['/acceuil'])
            }
            /* 
              const token0 = sessionStorage.getItem('token')
              this.http.get<any>('http://info.geodaki.com:4243/Api/clients', {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': ''+ token0
              }),
              responseType: 'json'
              }).subscribe(
              (resp) => {
                this.UserLog=resp.filter((res:any)=>res.username==sessionStorage.getItem('user'))
                console.log(this.UserLog);
              },
              (error) => {
                console.log(error);
              }
              );
                
           */    
            
            //console.log('====================================',result);
            //console.log(result.token);
            //console.log('*************************************');
            this.dataservice.devices(result.token)
            
            //console.log('====================================');
          }
		},
				() => {
          this.notLogin=true
					this.error = 'Either invalid credentials or something went wrong';
				});
    
	}
  
  dateExp:any
  Login(){
    /*
    let formData: FormData = new FormData();
    let username:any=this.login.get('username')?.value
    let password:any=this.login.get('password')?.value
    formData.append('username', username);
    formData.append('password', password);
    this.http.post("http://192.168.100.254:4243/signin",formData)
*/


    this.dataservice.getUser().subscribe(
      (data:any) => {
        this.User = data.filter(
          (res:any)=>res.name == this.login.get('username')?.value  && res.password == this.login.get('password')?.value
        )

        if (this.User != '') {
          

          sessionStorage.setItem('user',this.User[0].id ); 

          sessionStorage.setItem('is_admin',this.User[0].is_admin ); 
          //localStorage.setItem('user', this.User[0].id);
         
          
        }else{
          this.notLogin=true
        }
        //console.log(this.User)
        //console.log(this.login.get('username'));
        
      }
    )
  }


}
