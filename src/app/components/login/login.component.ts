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
    // this.dataservice.GetSearch().subscribe(res=> {
    //   console.log(res);
      
    // });

   //this.ran()
  }

  ran(){
    
    
    if (navigator.geolocation) {
      
      navigator.geolocation.getCurrentPosition(
        (p)=>{
          //this.check()
          let pointLatitude =  p.coords.latitude //33.99832179952015 33.998888
          let pointLongitude =   p.coords.longitude //-6.861067938071202 -6.860663 
           let centerLatitude = 33.998391;
           let centerLongitude = -6.860872;
        
           
          console.log(pointLatitude,pointLongitude);
          
          let circleRadius = 160;
          let test = this.isPointInsideCircle(
            pointLatitude,
            pointLongitude,
            centerLatitude,
            centerLongitude,
            circleRadius
          );

          if (!test) {
            alert('Position incorrecte !!')
           
          }else{
            alert('success '+pointLongitude+' '+pointLatitude)
          } 
        },()=>{
          alert('Activer geolocation du navigateur !!')
          
        });
    } else {
      alert("Geolocation is not supported by this browser.")
    }


    //console.log(this.positionMessage);
    
    // this.check()
  }
  



  degreesToRadians(degrees:any) {
    return degrees * (Math.PI / 180);
  }
  
  haversineDistance(lat1:any, lon1:any, lat2:any, lon2:any) {
    const earthRadiusInMeters = 6371000; // Earth's radius in meters
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) *
        Math.cos(this.degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusInMeters * c;
  
    return distance;
  }
  
  isPointInsideCircle(pointLatitude:any,pointLongitude:any,centerLatitude:any,centerLongitude:any,circleRadius:any) {
    const distance = this.haversineDistance(
      pointLatitude,
      pointLongitude,
      centerLatitude,
      centerLongitude
    );
  
    return distance <= circleRadius;
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
  generateUUID() {
    // Generate a random hexadecimal string of 32 characters
    
    var characters = '0123456789abcdef';
    var uuid = '';
    for (var i = 0; i < 32; i++) {
        uuid += characters.charAt(Math.floor(Math.random() * 16));
    }

    // Insert hyphens at the appropriate positions to create a valid UUID
    uuid = uuid.substr(0, 8) + '-' + uuid.substr(8, 4) + '-' + '4' + uuid.substr(13, 3) + '-' + '89ab'[Math.floor(Math.random() * 2)] + uuid.substr(16, 3) + '-' + uuid.substr(19);
    

    return uuid;
  }


  doSignin() {
		const request: any = { username: this.login.get('username')?.value, password: this.login.get('password')?.value};
      		//alert("login : " + request.username+"--"+request.password)
			
//console.log(request);

    
      		//alert("login : " + request.username)
		this.dataservice.signin(request).subscribe((result:any)=> {
      

      //console.log(result);
      sessionStorage.setItem('user', result.username);
      sessionStorage.setItem('token', 'HTTP_TOKEN ' + result.token);
      // return ;

      var date = new Date()
      
     
			sessionStorage.setItem('token', 'HTTP_TOKEN ' + result.token);
      var last_date = localStorage.getItem('timeToExp')
      var current_date = date.getTime();
      var uuid = this.generateUUID()
      

      //if (current_date>parseInt(last_date!)+ (1 * 5 * 1000) || last_date==null) {
        localStorage.setItem('uuid',uuid)
        sessionStorage.setItem(uuid,uuid)
        localStorage.setItem('userConnect',this.login.get('username')?.value!)
        sessionStorage.setItem('is_admin', result.role)
        sessionStorage.setItem('tokenExp',this.dateExp); 
        sessionStorage.setItem('check','in')
        sessionStorage.setItem('cnt','0')
        
        //sessionStorage.setItem('load','0')
        if (result.role!='ADMIN') {
          this.router.navigate(['/home'])
        } else {
          this.router.navigate(['/acceuil'])
        }
        
      
        this.dataservice.devices(result.token)
        
      //}
      // else{
      //   this.router.navigate(['/er'])
      //   // if (localStorage.getItem('sessionIsActive')=='1') {
      //   //   //alert('Une session est déjà active.');
          
      //   //   this.router.navigate(['/er'])
      //   //   //window.location.href='/'
      //   // }else{
      //   //   localStorage.setItem('uuid',this.generateUUID())
      //   //   sessionStorage.setItem(this.generateUUID(),this.generateUUID())
      //   //   sessionStorage.setItem('is_admin', result.role)
      //   //   sessionStorage.setItem('tokenExp',this.dateExp); 
      //   //   sessionStorage.setItem('check','in')
      //   //   sessionStorage.setItem('cnt','0')
          
      //   //   //sessionStorage.setItem('load','0')
      //   //   if (result.role!='ADMIN') {
      //   //     this.router.navigate(['/home'])
      //   //   } else {
      //   //     this.router.navigate(['/acceuil'])
      //   //   }
          
        
      //   //   this.dataservice.devices(result.token)
      //   // }
      // }
      
      
      
        
        
      
          
          
          
          // if (localStorage.getItem('sessionIsActive')=='1' && last_date!=null) {
          //   //alert('Une session est déjà active.');

          //   if (current_date>parseInt(last_date!)+ (1 * 30 * 1000)) {
          //     localStorage.removeItem('sessionIsActive')
          //     //alert(last_date)
          //     sessionStorage.setItem('is_admin', result.role)
          //     sessionStorage.setItem('tokenExp',this.dateExp); 
          //     sessionStorage.setItem('check','in')
          //     sessionStorage.setItem('cnt','0')
              
          //     //sessionStorage.setItem('load','0')
          //     if (result.role!='ADMIN') {
          //       this.router.navigate(['/home'])
          //     } else {
          //       this.router.navigate(['/acceuil'])
          //     }
            
          //     this.dataservice.devices(result.token)
          //   //window.location.href='/'
          //   } else{
          //     this.router.navigate(['/er'])
          //   }
            
            
          // }else if (localStorage.getItem('sessionIsActive')=='1') {
          //   this.router.navigate(['/er'])
          // } else {
          //   // Ouvre la fenêtre et active la session
          //   //alert(last_date)
          //   sessionStorage.setItem('is_admin', result.role)
          //   sessionStorage.setItem('tokenExp',this.dateExp); 
          //   sessionStorage.setItem('check','in')
          //   sessionStorage.setItem('cnt','0')
            
          //   //sessionStorage.setItem('load','0')
          //   if (result.role!='ADMIN') {
          //     this.router.navigate(['/home'])
          //   } else {
          //     this.router.navigate(['/acceuil'])
          //   }
           
         
          //   this.dataservice.devices(result.token)
            
          //   //console.log('====================================');
          // }


          // if (localStorage.getItem('sessionIsActive')=='1' ){
          //   this.router.navigate(['/er'])
          // }else{

          // }
          
          
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
