import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/sevices/data.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatInputModule} from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vehicule } from 'src/app/models/vehicule';

import * as XLSX from "xlsx";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{
  
  newForm: any= {
    vehiculeId:0,user: 0, villeId: 0 , produitId: 0, problemeId: 0 , solutionId: 0 , description:'',file:'',statut:1,dateCreation: '',dateModification: null
  }
  

  curDate=new Date();

  traite:any=1
  data:any=[]
  Jornal:any=[]


  ID = sessionStorage.getItem('userID');

  description:any
  hide:boolean=true
  style:any
  
  tous:boolean=true
  mes:boolean=false

  displayedColumns = ['num','user','ville','vehicule','dateCreation','dateModification','description','mod'];
  dataSource:any = [];
  //name = this.activateRoute.snapshot.paramMap.get('name')
  User = sessionStorage.getItem('user');
 
  is_admin:any = sessionStorage.getItem('is_admin');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute,private router: Router){}
 
  ngOnInit(): void {
    this.showAll(0)
    // this.reloadAll()
    // this.getJournal()
    
    //this.redirect()

    //if (sessionStorage.getItem('load')=='0') {
      //this.router.navigate(['/forms'])
      //window.location.reload()
      
    //}
    
    //this.showAll(0)
    //console.log(this.cnt);
  }

  redirect(){
    if (this.is_admin=='ADMIN') {
      this.router.navigate(['/acceuil'])
    }
  }

  
  

   async getJournal(){
    this.Jornal=[]
    this.dataservice.getJornale().subscribe(
      async (data:any) => {
       this.Jornal = await data.filter((res:any)=>(res.date.substring(8,10)==this.curDate.getDate()) && res.user.id==this.ID)
        
      
        //console.log(todayJournal);
        //console.log(this.ID);
        
       this.showAll(0)
        
        
        
      },
      (error:any)=>{
        if (error.error.status==500) {
          // sessionStorage.removeItem('user'); 
          // sessionStorage.removeItem('tokenExp')
          // sessionStorage.removeItem('token'); 
          // sessionStorage.removeItem('is_admin')
          
          // window.location.href='/'
        }
      }
      )
      //
    //
  }

  centent:any = 'display: contents;'

  noReclam:any=''
  allReclamation(s:any){
    let mydata:any = []
    if (s==1) {
      mydata = this.data.filter((res:any)=>res.user==this.User)
      
      //console.log(mydata.length , mydata);
      
      if (mydata.length == 0) {
        this.noReclam='1'
      }
      
      this.dataSource = new MatTableDataSource<Element>(mydata)
                
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
      this.traite=0
    
      this.style='opacity:1;pointer-events:all;'
      this.btnReload = 'pointer-events: all;'
      this.btnReloadContenet = 'pointer-events: all;display: contents;'
      this.style=''
      this.iconReload = ''
    }else if(s==2) {
      this.dataSource = new MatTableDataSource<Element>(this.data)
                
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        
        this.dataSource.sort = this.sort
      }, 500);
      
  
      this.traite=0
    
      this.style='opacity:1;pointer-events:all;'
      this.btnReload = 'pointer-events: all'
      this.btnReloadContenet = 'pointer-events: all;display: contents;'
      this.style=''
      this.iconReload = ''
    } else {
      this.dataSource = new MatTableDataSource<Element>(this.data)
                
      this.dataSource.paginator = this.paginator;
      setTimeout(() => {
        
        this.dataSource.sort = this.sort
      }, 500);
      
  
      this.traite=0
    
      this.style='opacity:1;pointer-events:all;'
      this.btnReload = 'pointer-events: all'
      this.btnReloadContenet = 'pointer-events: all;display: contents;'
      this.style=''
      this.iconReload = ''
     
    }
  }

  async showAll(s:any) {
    let problemes:any=''
    let solutions:any=''
    let references:any=''
    let mydata:any = []
    
      this.dataservice.getReclamation().subscribe(
      
        async (data:any) => {
          if (data[0]) {
            
                data.sort((a:any, b:any) => b.id - a.id)   // Sort
                
            
              
                let i=0
                this.data=data
                
                this.data.forEach((l:any) => {
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
                  var val={selected:'',j:'0',num:l.ident,imei:l.device.uniqueid,ref:references,istodo:l.istodo,solution:solutions,description:l.description,probleme:problemes,product:l.product.name,id:l.id,statut:l.statut,ville:l.device.ville.name,vehicule:l.device.name,user:l.client.name,dateCreation:l.date_creation,dateModification:l.date_modification}
                  this.data[i]=val
                  i++
                });


                this.allReclamation(2)
                
              
                
                
              
          }else{
            this.traite=0
          }
         
        },
        (error)=>{
          if (error.error.status==500) {
            // sessionStorage.removeItem('user'); 
            // sessionStorage.removeItem('tokenExp')
            // sessionStorage.removeItem('token'); 
            // sessionStorage.removeItem('is_admin')
            localStorage.clear()
            sessionStorage.clear()
            
            window.location.href='/'
          }
        },
        ()=>{
          this.style='opacity:1;pointer-events:all;'
          this.btnReload = 'pointer-events: all'
          this.btnReloadContenet = 'pointer-events: all;display: contents;'
          this.style=''
          this.iconReload = ''


        })
      
      
    //}
    


      

      // let i=0
       
      //   if (s==1) {
      //     this.data=data.filter((res:any)=>res.client.name==this.User)
      //     if (this.data[0]!=undefined) {
      //       this.Jornal.forEach((j:any) => {
      //         this.data.forEach((l:any) => {
      //           var val
      //           if (j.reclamation_id==l.id) {
      //              val={num:l.ident,j:1,imei:l.device.uniqueid,ref:l.reference.name,istodo:l.istodo,solution:l.solution.name,description:l.description,probleme:l.probleme.name,product:l.product.name,id:l.id,statut:l.statut,ville:l.device.ville.name,vehicule:l.device.name,user:l.client.name,dateCreation:l.date_creation,dateModification:l.date_modification}
                  
      //           }else{
      //              val={num:l.ident,j:0,imei:l.device.uniqueid,ref:l.reference.name,istodo:l.istodo,solution:l.solution.name,description:l.description,probleme:l.probleme.name,product:l.product.name,id:l.id,statut:l.statut,ville:l.device.ville.name,vehicule:l.device.name,user:l.client.name,dateCreation:l.date_creation,dateModification:l.date_modification}
      //           }
      //           this.data[i]=val
      //           i++
      //         });
      
      //       });
            
      //     }
          
      //   } else{
      //     this.data=data
      //     this.Jornal.forEach((j:any) => {
      //       this.data.forEach((l:any) => {
      //         var val
      //         if (j.reclamation_id==l.id) {
      //            val={num:l.ident,j:'1',imei:l.device.uniqueid,ref:l.reference.name,istodo:l.istodo,solution:l.solution.name,description:l.description,probleme:l.probleme.name,product:l.product.name,id:l.id,statut:l.statut,ville:l.device.ville.name,vehicule:l.device.name,user:l.client.name,dateCreation:l.date_creation,dateModification:l.date_modification}
                
      //         }else{
      //            val={num:l.ident,j:'0',imei:l.device.uniqueid,ref:l.reference.name,istodo:l.istodo,solution:l.solution.name,description:l.description,probleme:l.probleme.name,product:l.product.name,id:l.id,statut:l.statut,ville:l.device.ville.name,vehicule:l.device.name,user:l.client.name,dateCreation:l.date_creation,dateModification:l.date_modification}
      //         }
      //         this.data[i]=val
      //         i++
      //       });
    
      //     });
         
          
      //   }


      


  }

  
  dataToExport:any=[]
  searcheIcon:boolean=true
  @ViewChild('inputField') inputField!: ElementRef;

  filter(event:any){
    this.dataSource.filter = event.value

    if (event.value == '') {
      this.searcheIcon=true
    } else {
      this.searcheIcon=false
    }
    
    this.dataToExport = this.dataSource.filteredData
  }

  clearSearcheInput(){
    if (this.inputField) {
      this.inputField.nativeElement.value = ''; 
    }
    this.filter('')
    this.searcheIcon=true
  }

  async reloadAll(){
    //await this.getJournal()
    this.showAll(0)
    
  }

  btnReload:any = 'pointer-events: all'
  btnReloadContenet:any = 'pointer-events: all;display: contents;'
  iconReload:any = ''

  reload(){
    
    this.style='opacity:0.5;pointer-events: none'
    this.btnReload = 'background: #80808017;pointer-events: none'
    this.btnReloadContenet = 'background: #80808017;pointer-events: none;display: contents;'
    this.iconReload = 'transform: rotate(180deg);transition: 3s ease-in-out;'
    if (this.inputField) {
      this.inputField.nativeElement.value = ''; 
    }
    this.searcheIcon=true
    
    this.noReclam=''
    if (this.tous==true) {
      this.showAll(0)
    } else {

      this.allReclamation(1)
    }
  }

  exportArrayToExcel(arr: any[]) {
    
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(arr);
    XLSX.utils.book_append_sheet(wb, ws, 'test');
    XLSX.writeFile(wb, `exp.xlsx`);
  }
  
  

  

  detail(recl:any){
    this.hide=false
    //console.log(desc);
    this.description=recl
    this.style='opacity:0.5;pointer-events:none;'
    
    
    var dataTree = this.data
      dataTree.map((dd:any)=>{
        if (dd.id == recl.id) {
          
          dd.selected = '1'
        }else{
          dd.selected = ''
        }
      })

   

      this.dataSource.filteredData = dataTree
    
    //this.elem.first.nativeElement.setAttribute("style", "opacity:0.5;")
    
  }

  hideDetail(){
    this.style='opacity:1;'
    this.hide=true

    setTimeout(()=>{
      this.data.map((dd:any)=>{
        dd.selected = ''
        
      })
      this.dataSource.filteredData = this.data
    },500)
  }

  

  journal(e:any){
    //console.log(e);
    let data:any={}
      
    data = {
      reclamation_id: e.id,
      durree: '' ,
      discription: '',
      date: this.curDate,
      user: { id: this.ID }
    };
    

    //console.log(data);
    //let log:any={}
    
    this.dataservice.addJornal(data).subscribe(
      ()  => {
        this.getJournal()
        
        
        
  
    // },
    // (error)=>{
    //   //this.error='Error Add Journal !!!'
     })
    
  }

 
  all(s:any){
    this.style='opacity:0.3;pointer-events:none;'
    this.noReclam=''
    this.clearSearcheInput()
    if (s==0) {
      this.tous=false
      this.mes=true
      this.allReclamation(1)
    } else {
      this.tous=true
      this.mes=false
      this.allReclamation(0)
    }
  }


  
  // ngOnInit(): void {
    
  // }

 
  
  

  // getJournal(){
  //   //this.Jornal=[]
  //   this.dataservice.getJornale().subscribe(
  //     async (data:any) => {
  //      this.Jornal = await data.filter((res:any)=>(res.date.substring(8,10)==this.curDate.getDate()) && res.user.id==this.ID)
        
  //     },
  //     ()=>{
        
  //     }
  //     ,
  //     async ()=>{
        
  //       await this.showAll(0,this.Jornal)
  //     }
  //     )
    
  // }
  // async showAll(s:any,jou:any) {
    
  //   console.log("this.Journale : ",this.Jornal);
  //   console.log("jou : ",jou);
    
  //   this.dataservice.getReclamation().subscribe(
      
  //     async (data:any) => {
  //       data.sort((a:any, b:any) => b.id - a.id)   // Sort
        
       
  //       if (s==1) {
  //         let i=0
  //         this.data=data.filter((res:any)=>res.client.name==this.User)
  //         if (this.data[0]!=undefined) {
  //           this.data.forEach((l:any) => {
  //             var val={j:'0',num:l.ident,imei:l.device.uniqueid,ref:l.reference.name,istodo:l.istodo,solution:l.solution.name,description:l.description,probleme:l.probleme.name,product:l.product.name,id:l.id,statut:l.statut,ville:l.device.ville.name,vehicule:l.device.name,user:l.client.name,dateCreation:l.date_creation,dateModification:l.date_modification}
  //             this.data[i]=val
  //             i++
  //           });
  //         }
          
  //       } else{
  //         let i=0
  //         this.data=data
  //         this.data.forEach((l:any) => {
            
  //           var val={j:'0',num:l.ident,imei:l.device.uniqueid,ref:l.reference.name,istodo:l.istodo,solution:l.solution.name,description:l.description,probleme:l.probleme.name,product:l.product.name,id:l.id,statut:l.statut,ville:l.device.ville.name,vehicule:l.device.name,user:l.client.name,dateCreation:l.date_creation,dateModification:l.date_modification}
  //           this.data[i]=val
  //           i++
  //         });
          
  //       }
        
       
        
        
  //       this.data.forEach((l:any) => {
  //         jou.forEach((x:any) => {
  //           if (x.reclamation_id==l.id) {
  //             l.j='1'
  //             //alert(123)
  //           }
  //         });
  //       });
       
          
  //       console.log("data",this.data);
  //       this.dataSource = new MatTableDataSource<Element>(this.data)
        
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort
  //   this.traite=0
       
  //     })


      


  // }


  // filter(event:any){
  //   this.dataSource.filter = event.value
  // }

  // ref(){
  //   this.getJournal()
  //   this.showAll(0,this.Jornal)
    
  // }
  
  // reload(){
  //   if (this.tous==true) {
  //     this.showAll(0,this.Jornal)
  //   } else {
  //     this.showAll(1,this.Jornal)
  //   }
    
  // }

  

  // detail(recl:any){
  //   this.hide=false
  //   //console.log(desc);
  //   this.description=recl
  //   this.style='opacity:0.5;pointer-events:none;'
    
    
    
  // }

  // hideDetail(){
  //   this.style='opacity:1;'
  //   this.hide=true
  // }

  

  // journal(e:any){
  //   //console.log(e);
  //   let data:any={}
      
  //   data = {
  //     reclamation_id: e.id,
  //     durree: '' ,
  //     discription: '',
  //     date: this.curDate,
  //     user: { id: this.ID }
  //   };
    
    
  //   this.dataservice.addJornal(data).subscribe(
  //     ()  => {
  //       this.getJournal()
        
        
  //    })
    
  // }

 
  // all(s:any){
  //   if (s==0) {
  //     this.tous=false
  //     this.mes=true
  //     this.showAll(1,this.Jornal)
  //   } else {
  //     this.tous=true
  //     this.mes=false
  //     this.showAll(0,this.Jornal)
  //   }
  // }

  
 

  
  
  
}
