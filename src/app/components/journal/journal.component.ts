import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import { DataService } from 'src/app/sevices/data.service';
import dayGridPlugin  from '@fullcalendar/daygrid';
import  interactionPlugin  from '@fullcalendar/interaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit{
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  curDate=new Date();


  constructor(private dataservice:DataService , private router: Router){}
  ngOnInit(): void {
    this.showAllReclamation()
    
   
  }

  todo = new FormGroup({
    reclamation: new FormControl('',Validators.required),
    duree: new FormControl('',Validators.required),
    description: new FormControl()
  })

  get reclamation() {
    return this.todo.controls['reclamation'];
  }

  get duree() {
    return this.todo.controls['duree'];
  }

  get description() {
    return this.todo.controls['description'];
  }


  Reclamation:any
  Jornal:any=[]
  JornalAdmin:any=[]
  Duree: any=[{duree:'30min'},{duree:'1h'},{duree:'2h'},{duree:'3h'}]
  Description: any;

  reclamationCopy:any=[]
  user:any
  users: any;
  
  load:any = 1

  fReclamation(e:any){
    //console.log(e.target.value);
    this.Reclamation=this.reclamationCopy
    this.Reclamation=this.Reclamation.filter((v:any) => v.ident.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
       
  }



  getJornal(){
    this.Jornal=[]
    if (this.is_admin=='USER') {
      this.dataservice.getJornale().subscribe(
        (data:any) => {
          
          //console.log(this.Reclamation);
          this.Reclamation.forEach((r:any) => {
            let i=0
            data.forEach((l:any) => {
              if (l.user.id==this.user[0].id) {
                if (r.id==l.reclamation_id) {
                  this.Jornal.push({title:r.ident,date:l.date.substring(0,10),id:l.id,color:this.color[Math.floor(Math.random() * this.color.length)]})
                }
                
              }
              i++
              
              
            });
            
          })
          
         
          
          //console.log(this.Jornal);
          this.jsc()
          
          
          
        })
    }
    
  }

  getJornalAdmin(n:any,user:any){
    this.JornalAdmin=[]
    
    this.dataservice.getJornale().subscribe(
      (data:any) => {
        
        //console.log(data);
        this.Reclamation.forEach((r:any) => {
          let i=0
          data.forEach((l:any) => {
            if (n==1 || user=='0') {
              
                if (r.id==l.reclamation_id) {
                  this.JornalAdmin.push({title:r.ident,date:l.date.substring(0,10),id:l.id,color:this.color[Math.floor(Math.random() * this.color.length)]})
                }
                
              
            } else {
              if (l.user.id==user) {
                if (r.id==l.reclamation_id) {
                  this.JornalAdmin.push({title:r.ident,date:l.date.substring(0,10),id:l.id,color:this.color[Math.floor(Math.random() * this.color.length)]})
                }
                
              }
            }
            
            i++
            
            
          });
          
         })
        
       
        
        //console.log(this.JornalAdmin);
        this.jscAdmin()
        
        
        
      })
  }


  showAllReclamation() {
    
    this.dataservice.getReclamation().subscribe(
      (data:any) => {
        this.Reclamation = this.reclamationCopy=data
        if (this.is_admin=='USER') {
          this.getJornal()
          
        } else {
          this.getJornalAdmin(1,null)
        }
        
      },
      (error:any)=>{
        if (error.error.status==500) {
          sessionStorage.removeItem('user'); 
          sessionStorage.removeItem('tokenExp')
          sessionStorage.removeItem('token'); 
          sessionStorage.removeItem('is_admin')
          
          window.location.href='/'
        }
      },()=>{
       this.load=0
      }
    )

    

    this.dataservice.getUser().subscribe((res:any)=>{
      this.users = res.filter((res:any)=>res.appRoles[0].roleName=='USER')
      this.user= res.filter((res:any)=>res.name==this.idUser)
    })

    
  }

  hideAdd:boolean=true
  addButton:boolean=true

  add(){
    this.addButton=true
    this.todo.get('reclamation')!.setValue('')
    this.todo.get('duree')!.setValue('')
    this.todo.get('description')!.setValue('')
    //console.log(this.Jornal);
    this.hideAdd=!this.hideAdd

    this.style = (this.hideAdd == false) ? 'opacity:0.5;pointer-events:none;' : ''
    window.scrollTo(0,0)
    
  }

  dateJoornale:any
  idJournale:any
  onMod(rec:any){
    this.addButton=false
    this.hideAdd=false
    //console.log(rec.event._def.publicId);

    
    this.dataservice.getIdJornale(rec.event._def.publicId).subscribe((j:any)=>{
      this.dataservice.getIdReclamation(j.reclamation_id).subscribe((r:any)=>{
        this.dateJoornale=j.date
        this.idJournale=j.id
        this.todo.get('reclamation')!.setValue(r.id)
        this.todo.get('duree')!.setValue(j.durree)
        this.todo.get('description')!.setValue(j.discription)
      },
      (error:any)=>{
        this.error='Error !!!'
      })
      
      
    },
    (error:any)=>{
      this.error='Error !!!'
    })
    
    
    
    //console.log(rec.event._context.options.events[0])
    window.scrollTo(0,0)
  }

  selectedRec:any
  infoReclamation(rec:any){
 
    this.addButton=false
    this.hideAdd=false
    this.dataservice.getIdJornale(rec.event._def.publicId).subscribe((j:any)=>{
      var selectedRec = this.Reclamation.filter((res:any)=>res.id == j.reclamation_id) 
      let i=0
      //console.log(j);
    
      var references:any
      var solutions:any
      var problemes:any
      selectedRec.forEach((l:any) => {
        references=''
        solutions=''
        problemes=''
        let cp=0
        l.problemes.forEach((p:any) => {
          if (cp==0) {
            problemes = problemes+p.name
          } else {
            problemes = problemes+' + '+p.name
          }
        
          cp++
        });
        cp=0
        l.solutions.forEach((s:any) => {
          if (cp==0) {
            solutions = solutions+s.name
          } else {
            solutions = solutions+' + '+s.name
          }
        
          cp++
          
        });
        cp=0
        l.references.forEach((r:any) => {
          if (cp==0) {
            references = references+r.name
          } else {
            references = references+' + '+r.name
          }
          cp++
        });

        let dateM = l.date_modification.substring(0,10)+' '+l.date_modification.substring(11,19)
        let dateC = l.date_creation.substring(0,10)+' '+l.date_creation.substring(11,19)
        let dateJ = j.date.substring(0,10)+' '+j.date.substring(11,19)

        var val={dateJournale:dateJ,dureeJ:j.durree,j:'0',num:l.ident,imei:l.device.uniqueid,ref:references,istodo:l.istodo,solution:solutions,description:l.description,probleme:problemes,product:l.product.name,id:l.id,statut:l.statut,ville:l.device.ville.name,vehicule:l.device.name,user:l.client.name,dateCreation:dateC,dateModification:dateM}
        this.selectedRec=val
        i++
      });
      

      //console.log(this.selectedRec);
      
    },
    (error:any)=>{
      this.error='Error !!!'
    })
    //this.reclamation.filter((res:any)=>res.ident == '') 
    
    
  }

  onChangeUser(user:any){
    //console.log(user.value);
    this.getJornalAdmin(0,user.value)
  }

  addNew(){
    // reclamation => response.id
    this.hideAdd=!this.hideAdd
      let data:any={}
      
      //console.log(this.todo.get('vehicule')!.value);
     
      
      
      data = {
        reclamation_id: this.todo.get('reclamation')!.value,
        durree: this.todo.get('duree')!.value ,
        discription: this.todo.get('description')!.value,
        date: this.curDate,
        user: { id: this.user[0].id }
      };
      


      //let log:any={}
      
      this.dataservice.addJornal(data).subscribe(
        ()  => {
          this.getJornal()
          
          // log = {
          //   id_rec: response.id ,
            
          //   op: 'CREATE'
          // };
          //console.log(log);
          // this.dataservice.addLog(log).subscribe(()=>{
            
          // })
          
    
      },
      (error)=>{
        this.error='Error Add Journal !!!'
      },()=>{
        this.style=''
      })
  }
    

    
  

  dddd(){
    this.hideAdd=!this.hideAdd
  }
  
  userId:any
  modTodo(){
    this.hideAdd=!this.hideAdd
    let data:any={}
    
    
    data = {
      id:this.idJournale,
      reclamation_id: this.todo.get('reclamation')!.value,
      durree: this.todo.get('duree')!.value ,
      discription: this.todo.get('description')!.value,
      date: this.dateJoornale,
      user: { id: this.user[0].id }
    };

    this.dataservice.editJornal(data).subscribe(()=>{

      this.getJornal()
     // window.location.reload()
    },
    (error)=>{
      this.error='Error Mod !!!'
    })
  }

  error:any=''

  
  

  
  hide:boolean=true
  style:any
  traite:boolean=true

  detail(recl:any){
    this.hide=false
    //console.log(desc);
    this.style='opacity:0.5;pointer-events:none;'
    
    
    
    
    //this.elem.first.nativeElement.setAttribute("style", "opacity:0.5;")
    
  }

  hideDetail(){
    this.style='opacity:1;'
    this.hide=true
  }

  onDelete(id:any){
    // this.dataservice.deleteUser(id).subscribe(
    //   ()=>{this.showAll()}
    // )
    
  }


  
  fff:any={
    title: 'Event1',
    start: '2023-07-04'
  }
  Events: any = [this.fff]
  
  
  
  calendarOptions: CalendarOptions ={
  
  }

  color:any=['#66ccff','#8080ff','#379006','#4da6ff','#a3a3c2']

  jsc(){
    //console.log(this.color[Math.floor(Math.random() * this.color.length)]);
    
    const calendarEl = document.getElementById('cala')
    const calendar = new Calendar(calendarEl!, {
      plugins: [dayGridPlugin,interactionPlugin ],
      events:this.Jornal,
      eventClick:this.onMod.bind(this),
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay',
        
      },
      buttonText: {
        today:    'Ce jour',
        month:    'Moi',
        week:     'Semaine',
        day:      'Jour'
      },
      locale: 'fr',
      contentHeight: 550,
      eventColor: this.Jornal.color,
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true
      
    })
    calendar.render()
  }



  jscAdmin(){
    //console.log(this.color[Math.floor(Math.random() * this.color.length)]);
    
    const calendarEl = document.getElementById('cala-admin')
    const calendar = new Calendar(calendarEl!, {
      plugins: [dayGridPlugin,interactionPlugin ],
      events:this.JornalAdmin,
      eventClick:this.infoReclamation.bind(this),
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay',
        
      },
      buttonText: {
        today:    'Ce jour',
        month:    'Moi',
        week:     'Semaine',
        day:      'Jour'
      },
      locale: 'fr',
      contentHeight: 550,
      eventColor: this.Jornal.color,
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true
      
    })
    calendar.render()

  }
}
