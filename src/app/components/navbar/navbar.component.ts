import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { range } from 'rxjs';
import { DataService } from 'src/app/sevices/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  datePipe: any;
  dateLog: any;
  user: any;
  

  constructor( private router: Router,private dataservice:DataService){}
  idUser = sessionStorage.getItem('user');
  
  is_admin:any = sessionStorage.getItem('is_admin');
 
  
  tokenExp:any 
  ngOnInit(): void {
    // window.addEventListener('beforeunload', (e: BeforeUnloadEvent) => {
    //   e.preventDefault();
    //   e.returnValue = '';
    // });

    // window.addEventListener('beforeunload', (e: BeforeUnloadEvent) => {
    //   // Your custom action or confirmation message goes here
    //   const confirmationMessage: string = 'Are you sure you want to leave?';
    //   (e || window.event).returnValue = confirmationMessage; // Standard
    //   //alert(1);
    //   return confirmationMessage; // For some older browsers
    // });
    this.openWindow()
    //this.timeOut()
    //this.test()
    this.ref()
    
    
  }


  openWindow(): void {
    var date = new Date()
    localStorage.setItem('sessionIsActive','1')
    var bb = localStorage.getItem('timeToExp')
    var tt = date.getTime();
    if(bb!=null){
      
      if (tt>parseInt(bb)+ (2 * 60 * 1000)) {
        this.Logout()
        
        
      }
    }

    localStorage.setItem('timeToExp',date.getTime().toString())
    
    
    
    //console.log(tt + (1 * 60 * 1000));
    
   
  
   

  }
  






// Function to convert date strings to Date objects
convertToDateObject(dateString:any) {
    const [day, month, year, time] = dateString.split(/\/|\s|:/);
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(time[0] + time[1]), parseInt(time[3] + time[4]), parseInt(time[6] + time[7]));
}






  cnt = sessionStorage.getItem('cnt');

  ref(){

    this.dataservice.getUser().subscribe((res:any)=>{
      let user= this.user= res.filter((res:any)=>res.name==this.idUser)
      //console.log();
      sessionStorage.setItem('userID',user[0].id)
      
      
      
    },
    (error:any) => {
      if (error.error.status==500) {
        alert("session terminer")
        this.Logout()
      }
    })
    if (this.cnt=='0') {
      sessionStorage.setItem('cnt','1')
      window.location.reload()
    } 

    // this.dataservice.getUser().subscribe((res:any)=>{
     
    //   this.user= res.filter((item:any)=>item.name==this.idUser)
    // })
  }



  // test(){
    
  //     this.dataservice.getUser().subscribe(
  //       (res:any)=>{

  //       }
  //     )
      
    
  // }
 
  message:any=''
  Logout(){
    //if (this.checkStatus!='out') {
      sessionStorage.removeItem('user'); 
      sessionStorage.removeItem('tokenExp')
      sessionStorage.removeItem('token'); 
      sessionStorage.removeItem('is_admin')
      localStorage.removeItem('sessionIsActive')
      localStorage.removeItem('timeToExp')
      //sessionStorage.removeItem('cnt')
      //localStorage.setItem('user', '');
      window.location.href='/'
    //} else {
      //this.message="N'oubliez pas le check out !!"
      //setTimeout(()=>{this.message=''},4000)
    //}
    
   
   
  }

  
  

  timeOut(){
   
    
    setInterval(this.Exp, 150000);
  }
  
  Exp() {
    
    let date = new Date();
    let hours = date.getHours();
    let hourExp = date.getHours();
    let minutes = date.getMinutes();
    let minuteExp = date.getMinutes()+1;
    let seconds = date.getSeconds();
    this.datePipe = hours+":"+minutes+":"+seconds
    let dateExp = hourExp+":"+minuteExp+":"+seconds
    //console.log(this.datePipe);
    let tab= sessionStorage.getItem('tokenExp')?.split(":")
    //console.log(tab );
    
    if ( parseInt(tab![0]) == hours && (parseInt(tab![1]) < minutes  )) {
      this.Logout()
    }
   
  }

  cancel(){
    this.checkOut=false
    this.style=''
    sessionStorage.setItem('check','out')
  }

  checkOut:boolean=false
  checkStatus:any=sessionStorage.getItem('check')
  check(){
    let user = {user:{id:this.user[0].id}}
    //console.log(this.checkStatus);
    this.checkOut=false
    if (this.checkStatus=='out') {
      this.checkOut=true
      sessionStorage.setItem('check','out')
      //
    }else{
      sessionStorage.setItem('check','out')
      this.checkStatus='out'
      
      this.dataservice.addCheck(user,'in').subscribe((res)=>{
        //console.log(res);
        
        
      })
    }
    
    
  }
  style:any=''
  curDate=new Date();
  journalUser:any
  journalMessage:any=''
  Out(){
    let user = {user:{id:this.user[0].id}}
    
    this.dataservice.getJornale().subscribe((res:any)=>{
      this.journalUser=res.filter((r:any)=>(r.date.substring(8,10)==this.curDate.getDate()) && r.user.id==this.user[0].id)
      //console.log(this.journalUser);
      
      if (this.journalUser[0]==undefined) {
        this.checkOut=true
        this.journalMessage="Il faut d'abord remplir le journal !"
        this.style='opacity:0.5;'
        
      } else {
        this.dataservice.addCheck(user,'out').subscribe((res)=>{
          //console.log(res);
          
          sessionStorage.setItem('check','in')
          this.checkStatus='in'
        })
      }
      
    })
   
    
    
  }

  falsePosition:boolean=false
  positionMessage:any=''
  ran(){
    
    
    // if (navigator.geolocation) {
      
    //   navigator.geolocation.getCurrentPosition(
    //     (p)=>{
    //       //this.check()
    //       let pointLatitude = p.coords.latitude
    //       let pointLongitude = p.coords.longitude
    //       let centerLatitude = 33.99832179952015;
    //       let centerLongitude = -6.861067938071202;
    //       let circleRadius = 5000;
    //       let test = this.isPointInsideCircle(
    //         pointLatitude,
    //         pointLongitude,
    //         centerLatitude,
    //         centerLongitude,
    //         circleRadius
    //       );

    //       if (!test) {
    //         this.falsePosition=true
    //         this.positionMessage='Position incorrecte !!'
    //       }else{
    //         this.check()
    //       } 
    //     },()=>{
    //       this.positionMessage='Activer geolocation du navigateur !!'
    //     });
    // } else {
    //   alert("Geolocation is not supported by this browser.")
    // }

    this.check()
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
  
  
   
 



  
  

}
