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
    //   console.log(e.currentTarget!);
    //   if (e.currentTarget!) {
        
    //   }
      
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
    //this.timeOut()
    //this.test()
    this.openWindow()
    this.ref()
    
    
  }


  openWindow(): void {
    var date = new Date()
    localStorage.setItem('sessionIsActive','1')
    var uuidLast = localStorage.getItem('uuid')
    sessionStorage.getItem(uuidLast!)

    if ( sessionStorage.getItem(uuidLast!) == null) {
      
        
      window.location.href='/'
      
      
    }
    
    var bb = localStorage.getItem('timeToExp')
    var tt = date.getTime();


    setInterval(()=>{
      let uuidLast = localStorage.getItem('uuid')
      if ( sessionStorage.getItem(uuidLast!) == null) {
      
        
        window.location.href='/'
        
        
      }
    },60000)
    // if(bb!=null){
      
    //   if (tt>parseInt(bb)+ (4 * 60 * 60 * 1000)) {
       
    //     this.Logout()
        
        
    //   }
    // }

    // localStorage.setItem('timeToExp',date.getTime().toString())
    
    
    
    //console.log(tt + (1 * 60 * 1000));
    
   
  
   

  }
  






// Function to convert date strings to Date objects
convertToDateObject(dateString:any) {
    const [day, month, year, time] = dateString.split(/\/|\s|:/);
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(time[0] + time[1]), parseInt(time[3] + time[4]), parseInt(time[6] + time[7]));
}






  cnt = sessionStorage.getItem('cnt');

  ref(){
    if (this.cnt!='1') {
      sessionStorage.setItem('cnt','1')
      window.location.reload()
    } else{

      // const year = this.curDate.getFullYear();
      // const month = String(this.curDate.getMonth() + 1).padStart(2, '0'); // Ajoute un zéro si le mois est < 10
      // const day = String(this.curDate.getDate()).padStart(2, '0'); // Ajoute un zéro si le jour est < 10
      
      // const formattedDate = `${year}-${month}-${day} 00:00:00`;
      // let data = {
      //   client:{id:sessionStorage.getItem('userID')},
      //   date:formattedDate
      // }

      // //console.log(data);
      
      // this.dataservice.isCheckIn(data).subscribe((item:any)=>{
      //   //console.log(item[item.length-1]);
      //   if (item.length != 0) {
          
      //     if (item[item.length-1].checkValue != 'IN') {
      //       sessionStorage.setItem('check','in')
      //       this.checkStatus='in'
      //     }else{
      //       //this.checkOut=true
      //       this.checkStatus='out'
      //       sessionStorage.setItem('check','out')
      //     }
      //   }
        
      // })

      this.dataservice.getUser().subscribe((res:any)=>{
        let user= this.user= res.filter((res:any)=>res.name==this.idUser)
        //console.log();
        sessionStorage.setItem('userID',user[0].id)

        const year = this.curDate.getFullYear();
        const month = String(this.curDate.getMonth() + 1).padStart(2, '0'); // Ajoute un zéro si le mois est < 10
        const day = String(this.curDate.getDate()).padStart(2, '0'); // Ajoute un zéro si le jour est < 10
        
        const formattedDate = `${year}-${month}-${day} 00:00:00`;
        let data = {
          client:{id:user[0].id},
          date:formattedDate
        }

        //console.log(data);
        
        this.dataservice.isCheckIn(data).subscribe((item:any)=>{
          //console.log(item[item.length-1]);
          if (item.length != 0) {
            
            if (item[item.length-1].checkValue != 'IN') {
              sessionStorage.setItem('check','in')
              this.checkStatus='in'
            }else{
              //this.checkOut=true
              this.checkStatus='out'
              sessionStorage.setItem('check','out')
            }
          }
          
        })
        
        
      },
      (error:any) => {
        if (error.error.status==500) {
          alert("session terminer")
          this.Logout()
        }
      })
    }
   

    // this.dataservice.getUser().subscribe((res:any)=>{
     
    //   this.user= res.filter((item:any)=>item.name==this.idUser)
    // })
  }



 
  message:any=''
  Logout(){
    
      // sessionStorage.removeItem('user'); 
      // sessionStorage.removeItem('tokenExp')
      // sessionStorage.removeItem('token'); 
      // sessionStorage.removeItem('is_admin')
      // localStorage.removeItem('sessionIsActive')
      // localStorage.removeItem('timeToExp')
      // sessionStorage.setItem('cnt','0')

      localStorage.clear()
      sessionStorage.clear()
     
      window.location.href='/'
   
    
   
   
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
      // sessionStorage.setItem('check','out')
      // this.checkStatus='out'
      
      this.dataservice.addCheck(user,'in').subscribe((res)=>{
        //console.log(res);
        sessionStorage.setItem('check','out')
        this.checkStatus='out'
        
        
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
        this.checkOut = true
        this.journalMessage = "N'oubliez pas de remplir le journal !"
        this.style = 'opacity:0.5;'
        
      } 
      this.dataservice.addCheck(user,'out').subscribe((res)=>{
        //console.log(res);
        
        sessionStorage.setItem('check','in')
        this.checkStatus='in'
      })
      
      
    })
   
    
    
  }


  showNav:any = '0'


  onTouchStart(e:any){
    this.showNav = '1'
  }

  falsePosition:boolean=false
  positionMessage:any=''
  ran(){
    
    
    if (navigator.geolocation) {
      
      navigator.geolocation.getCurrentPosition(
        (p)=>{
          //this.check()
          
          let pointLatitude = 33.998391 // p.coords.latitude //33.99832179952015 
          let pointLongitude = -6.860872 // p.coords.longitude //-6.861067938071202 
          //console.log(this.user[0]);
          
          let inPos:boolean = false
          this.user[0].parcs.forEach((p:any) => {
            
            let centerLatitude = p.lat
            let centerLongitude = p.lon;
            //console.log(pointLatitude,pointLongitude);
            
            let circleRadius = 160;
            let test = this.isPointInsideCircle(
              pointLatitude,
              pointLongitude,
              centerLatitude,
              centerLongitude,
              circleRadius
            );
            
            //console.log(p.name,test , pointLatitude,pointLongitude);
            
  
            if (test) {
              inPos = true
            } 
          });


          if (!inPos) {
            this.falsePosition=true
            this.positionMessage='Position incorrecte !!'
            setTimeout(()=>{
              this.positionMessage=''
            },3000)
          }else{
           this.check()
          } 

        },()=>{
          this.positionMessage='Activer geolocation du navigateur !!'
          setTimeout(()=>{
            this.positionMessage=''
          },3000)
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
  
  
   
 



  
  

}
