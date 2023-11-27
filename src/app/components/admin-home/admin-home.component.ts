import { Component, ElementRef, OnInit,QueryList,ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/sevices/data.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatInputModule} from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vehicule } from 'src/app/models/vehicule';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {saveAs} from 'file-saver';


import * as XLSX from "xlsx";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  dataToExport:any=[]
  searcheIcon:boolean=true

  /*
  ville: any;
  vehicule: any;
  produit:any;
  probleme:any;
  solution:any;

  selectedville:any=-1
  


  villes: any[]=[];
  curDate=new Date();
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');


  asec:any
  desc:any

  forms:any;
  formsMod:any;
  formsEmpty:any;
  formsModVille:any=[];
  form: any = {
    vehiculeId:'',user: '', villeId: '' ,ville: '', produitId: '', problemeId: '' , solutionId: '', description:'' ,statut:'',dateCreation: null,dateModification: null
  }

  constructor(private dataservice:DataService, private router: Router){}
  ngOnInit() :void {
    //this.showAll();
    this.getForm();
    this.showAll()
    
    
    
    //this.onSelect(this.selectedville.id);
    
  }

  
  showAll() {
    
    this.dataservice.getVille().subscribe(
      (data:any) => {
        this.ville = data
        //console.log(this.ville.length)
      }
    )
    
    
    

  }
  

  getForm(){
    this.dataservice.getReclamation().subscribe(
      (data:any) => {
        this.forms = data,
        console.log(this.forms)
      }
    )
    
  }

 
  selected:boolean=false
  


  test(){
    for (let obj of this.forms) {
      this.dataservice.getFormVehicule(obj.vehiculeId).subscribe(
        (data:any) => {
          obj.vehiculeId=data.title
          
         // console.log('data : '+ obj.vehiculeId);
          
        }
      )
    }
    
    
  }
  ne:Number=0
  empty:boolean=false
  afficherTest() {
    this.selected=true
    if (this.selectedville==0) {
      this.ne=1
      if (this.formsMod!=null) {
        this.forms=this.formsMod
      }
      alert('d='+this.desc+' '+'a='+this.asec)
      if (this.asec=='') {
        this.forms.sort((a:any,b:any) =>  new Date(a.dateCreation).getDate() - new Date(b.dateCreation).getDate())
      } else {
        this.forms.sort((a:any,b:any) =>  new Date(b.dateCreation).getDate() - new Date(a.dateCreation).getDate())
      }
      
      this.boucle(this.forms)
      
    } else if(this.selectedville==-1){
      
      this.selected=false
      this.formsModVille=[]
      this.selectedville=-1
    }else{
      if (this.formsMod!=null) {
        this.forms=this.formsMod
      }
      
      this.ne=0
      for (let obj of this.forms){
        if (obj.villeId==this.selectedville) {
          this.formsModVille.push(obj),
          
          this.ne=(this.ne.valueOf() + 1)
          //console.log(this.ne);
          
        }
      }
      if (this.formsModVille=='') {
        this.empty==true
      }


      //this.forms.sort((a:any,b:any) =>  new Date(b.dateCreation).getDate() - new Date(a.dateCreation).getDate())
      
      this.boucle(this.forms)
      this.formsMod=this.forms
      this.forms=this.formsModVille
      //console.log("lod"+this.formsMod);
      
      
      this.formsModVille=[]
    }

    
    
    

  }


  boucle(x:any){
    for (let obj of x) {
      //console.log('data : '+obj.villeId);
      this.dataservice.getFormVehicule(obj.vehiculeId).subscribe(
        (data:any) => {
          obj.vehicule=data.title
          
          //console.log('data : '+ obj.vehiculeId);
          
        }
      )
      this.dataservice.getFormVille(obj.villeId).subscribe(
        (data:any) => {
          obj.ville=data.title
          
        }//,console.log('ville'+obj.ville)
        
        
      )
      this.dataservice.getFormProduit(obj.produitId).subscribe(
        (data:any) => {
          obj.produit=data.title
          
        }
      )
      this.dataservice.getFormProbleme(obj.problemeId).subscribe(
        (data:any) => {
          obj.probleme=data.title
          
        }
      )
      this.dataservice.getFormUser(obj.user).subscribe(
        (data:any) => {
          obj.username=data.username
          
        }
      )
      if (obj.solutionId!=0) {
        
        this.dataservice.getFormSolution(obj.solutionId).subscribe(
          (data:any) => {
            obj.solution=data.title
            
          }
        )
      }
      
    }
  }


  
  valider(id:any){
    this.dataservice.validStatut(id.target.value,2).subscribe(()=>{
      this.forms[id.target.value-1].statut=2
    })
    //this.router.navigate(['/acceuil'])

  }
  invalider(id:any){
    this.dataservice.validStatut(id.target.value,0).subscribe(()=>{
      this.forms[id.target.value-1].statut=0
    })

  }*/

 

  
  displayedColumns = ['num','user','ville','vehicule','dateCreation','dateModification','img','description','log','mod','valider'];
  dataSource:any = [];
  //name = this.activateRoute.snapshot.paramMap.get('name')
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('inputField') inputField!: ElementRef; 

  constructor(private dataservice:DataService,private router: Router,private http:HttpClient){}

  traite:boolean=true
  load:any=1


  ngOnInit(): void {
    
    //this.router.navigate(['/acceuil'])
    this.showAll()
    this.loaded()
    //this.dw()
    //console.log(this.cnt);
    //this.timer.subscribe((t) => this.showAll());
    sessionStorage.setItem('download','end')
   
  }
  
  end:boolean=false


  exportArrayToExcel(arr: any[]) {
    
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(arr);
    XLSX.utils.book_append_sheet(wb, ws, 'test');
    XLSX.writeFile(wb, `exp.xlsx`);
  }

  
  
  idDw:any
  download(recl:any){
    this.end=true
    
    this.idDw=recl.id
    // this.dw()
    this.dataservice.downloadImage(recl).subscribe((blob:any) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = recl.img; // Change the filename as needed
      a.click();
      window.URL.revokeObjectURL(url);
      // const link = document.createElement('a');
      // link.href = window.URL.createObjectURL(blob);
      // link.download = recl.img; // filename
      // link.click()
      // window.location.reload()
      //this.dw()
      this.end=false
      //saveAs(blob,recid.img)
    })
    

  }
  

  data:any=[]
   showAll() {
    /*
    this.dataservice.getReclamation().subscribe(
      

      (data:any) => {
        
        data.sort((a:any, b:any) => b.id - a.id)   // Sort
        let i=0
        data.filter((res:any)=>res.istodo==false).forEach((l:any) => {
          const exten = (l.imgurl+"").split(".")
          
          var val={num:l.ident,imei:l.device.uniqueid,ext:exten[exten.length-1],ref:l.reference.name,img:l.imgurl,id:l.id,solution:l.solution.name,probleme:l.probleme.name,product:l.product.name,statut:l.statut,ville:l.device.ville.name,description:l.description,vehicule:l.device.name,user:l.client.name,dateCreation:l.date_creation,dateModification:l.date_modification}
          this.data[i]=val
          i++
        });
        
        //console.log(this.data);
        console.log(!this.ikchwaniknwan);
        this.setLoad(!this.ikchwaniknwan)
        this.dataSource = new MatTableDataSource<Element>(this.data)
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
        
           
        
      }
    )*/
    this.dataservice.getReclamation().subscribe(
      (data: any) => {
      data.sort((a: any, b: any) => b.id - a.id); // Sort data based on 'id' in descending order
      
      this.data = [];
     
      for (const l of data) {
        if (!l.istodo) {
          let problemes:any=''
          let solutions:any=''
          let references:any=''
          const exten = (l.imgurl+'').split('.');
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
          const item = {
            num: l.ident,
            imei: l.device.uniqueid,
            ext: exten[exten.length - 1],
            ref: references,
            img: l.imgurl,
            id: l.id,
            solution: solutions,
            probleme: problemes,
            product: l.product.name,
            statut: l.statut,
            ville: l.device.ville.name,
            description: l.description,
            vehicule: l.device.name,
            user: l.client.name,
            dateCreation: l.date_creation,
            dateModification: l.date_modification
          };
          this.data.push(item);
        }
      }

      this.dataSource = new MatTableDataSource(this.data);
      
      this.dataToExport = this.dataSource.filteredData
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     
      },
      ()=>{},
      ()=>{
        this.load = 0
        this.style=''
        this.btnReload = 'pointer-events: all'
        this.iconReload = ''
      }

      ); 

  }


  loaded(){
    this.showAll()
    
  }

   

  logData:any
  idRec:any
  historique(id:any){
    this.idRec=id
    this.dataservice.getLog().subscribe((res:any)=>{
      this.logData = res.filter((f:any)=>f.reclamation_id == id)
      //
      //this.logData.befor=data
      let i = 0
      res.forEach((l:any) => {
        const data=(l.befor).split("|")
       
        
        l.befor=data
        i++
      });
      //console.log(this.logData[0]);
      
    })
  }
 
  setLoad(l: boolean){
    this.load= l;
  }
 
 

  filter(event:any){
    this.dataSource.filter = event.value
    if (event.value == '') {
      this.searcheIcon=true
    } else {
      this.searcheIcon=false
    }
    
    this.dataToExport = this.dataSource.filteredData
  }

  


 

  valider(id:any){
    this.dataservice.getIdReclamation(id).subscribe((res:any)=>{
      res.statut='valider'
      
      this.dataservice.validStatut(res).subscribe(()=>{
        //this.dataSource.data[id-1].statut='valider'
        this.showAll()
      })
    })
    
    //this.router.navigate(['/acceuil'])

  }
  error:any=''
  invalider(id:any){
    this.dataservice.getIdReclamation(id).subscribe((res:any)=>{
      res.statut='en cours'
      
      this.dataservice.validStatut(res).subscribe(()=>{
        //this.dataSource.data[id-1].statut='valider'
        this.showAll()
      },(error)=>{
        this.error='Error mod!!!'
      })
    })
    

  }

  btnReload:any = 'pointer-events: all'
  iconReload:any = ''

  reload(){
    this.message=''
    this.style='opacity:0.5;pointer-events: none'
    this.btnReload = 'background: #80808017;pointer-events: none'
    this.iconReload = 'transform: rotate(180deg);transition: 3s ease-in-out;'
    if (this.inputField) {
      this.inputField.nativeElement.value = ''; 
    }
    this.searcheIcon=true
    

    this.showAll()
  }

  clearSearcheInput(){
    if (this.inputField) {
      this.inputField.nativeElement.value = ''; 
    }
    this.filter('')
    this.searcheIcon=true
  }
  
  message:any=''
  Sup:boolean=false
  

  success(){
    this.message='Supp success'
    this.style='opacity:0.5;pointer-events:none;'
    setTimeout(()=>this.reload(),1000)
    
  }

  toSupp(id:any){
    this.style='opacity:0.5;pointer-events:none;'
    this.Sup=true
    this.idRec=id
  }

  supp(){
    this.hideDetail()
    let id=this.idRec
    let log:any={}
    log = {
      id_rec: id ,
      
      op: 'DELETE'
    };
    //console.log(log);
    this.dataservice.addLog(log).subscribe(()=>{
      this.dataservice.deleteReclamation(id).subscribe((response)=>{
        this.success()
        
      })
    },(error)=>{
      this.error='Error Supp!!!'
    })
    

  }
 
  description:any
  hide:boolean=true
  HideLog:boolean=true
  style:any

  detail(recl:any){
    this.hide=false
    //console.log(desc);
    this.description=recl
    this.style='opacity:0.5;pointer-events:none;'
    
    
    
    
    //this.elem.first.nativeElement.setAttribute("style", "opacity:0.5;")
    
  }

  detailLog(recl:any){
    this.HideLog=false
    this.hideLog=true
    this.hide=true
    //console.log(desc);
    this.description=recl
    this.style='opacity:0.5;pointer-events:none;'
    
    
    
    
    //this.elem.first.nativeElement.setAttribute("style", "opacity:0.5;")
    
  }

  hideLog:boolean=true
  log(d:any){
    this.hideLog=false
    //let desc=d
    //console.log(desc);
    //this.description=d
    this.style='opacity:0.5;pointer-events:none;'
    //console.log(d);
    
    this.historique(d)
    
    
    //this.elem.first.nativeElement.setAttribute("style", "opacity:0.5;")
    
  }

  hideLOG(){
    this.style='opacity:1;'
    this.hideLog=true
  }

  hideDetail(){
    this.style='opacity:1;'
    this.hide=true
    this.Sup=false
  }

  hideDetailLog(){
    this.HideLog=true
    this.log(this.idRec)
    
  }

  


 
}


