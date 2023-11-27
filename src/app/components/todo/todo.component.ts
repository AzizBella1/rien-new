import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/sevices/data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  curDate=new Date();

  constructor(private dataservice:DataService){}
  ngOnInit(): void {
    this.showAllProduit()
    this.showVille()
  }

  todo = new FormGroup({
    user: new FormControl('',Validators.required),
    ville: new FormControl('',Validators.required),
    vehicule: new FormControl('',Validators.required),
    produit: new FormControl('',Validators.required),
    probleme: new FormControl(),
    solution: new FormControl(),
    description: new FormControl(),
  })

  get user() {
    return this.todo.controls['user'];
  }

  get ville() {
    return this.todo.controls['ville'];
  }

  get vehicule() {
    return this.todo.controls['vehicule'];
  }

  get produit() {
    return this.todo.controls['produit'];
  }

  get probleme() {
    return this.todo.controls['probleme'];
  }

  get solution() {
    return this.todo.controls['solution'];
  }

  get description() {
    return this.todo.controls['description'];
  }

  User:any
  Ville: any;
  Vehicule: any;
  Produit:any;
  Probleme:any;
  Solution:any;

  userCopy:any=[]
  villeCopy:any=[]
  vehiculeCopy:any=[]
  produitCopy:any=[]
  problemeCopy:any=[]
  solutionCopy:any=[]

  fUser(e:any){
    //console.log(e.target.value);
    this.User=this.userCopy
    this.User=this.User.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
       
  }

  fVille(e:any){
    //console.log(e.target.value);
    this.Ville=this.villeCopy
    this.Ville=this.Ville.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
       
  }

  fVehicule(e:any){
    //console.log(e.target.value);
    
    this.Vehicule=this.vehiculeCopy

    //console.log("fV",this.vehicule);
    this.Vehicule=this.Vehicule.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
       
  }

  fProduit(e:any){
    //console.log(e.target.value);
    this.Produit=this.produitCopy
    this.Produit=this.Produit.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
       
  }

  fProbleme(e:any){
    //console.log(e.target.value);
    
    this.Probleme=this.problemeCopy

    //console.log("fV",this.vehicule);
    this.Probleme=this.Probleme.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
       
  }

  fSolution(e:any){
    //console.log(e.target.value);
    
    this.Solution=this.solutionCopy

    //console.log("fV",this.vehicule);
    this.Solution=this.Solution.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
       
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns = ['num','user','ville','vehicule','dateCreation','dateModification','statut','description','mod'];
  dataSource:any = [];

  data:any=[]
  rec:any=[]
  lastRec:any
  load:any = 1

  showVille(){
    
    this.dataservice.getVille().subscribe(
      (data:any) => {
        this.Ville = data,
        this.villeCopy=data
      }
    )

    this.dataservice.getReclamation().subscribe((data:any)=>{
      //data.sort((a:any, b:any) => b.id - a.id)
      this.rec = data.filter((res:any)=>res.istodo==true).sort((a:any, b:any) => b.id - a.id)
      
      this.lastRec=data[0]
      if (this.lastRec.date_creation.substring(8,10)==this.curDate.getDate()) {
        this.lastRec=data[0]
      } else {
        this.lastRec=undefined
      }
      let problemes:any=''
      let solutions:any=''
      let references:any=''

      
      let i=0
      this.rec.forEach((l:any) => {
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
        
         var val={num:l.ident,solution:solutions,description:l.description,probleme:problemes,product:l.product.name,id:l.id,statut:l.statut,ville:l.device.ville.name,vehicule:l.device.name,user:l.client.name,dateCreation:l.date_creation,dateModification:l.date_modification}
         this.data[i]=val
          i++
      });
        
        //console.log(data);
        
      this.dataSource = new MatTableDataSource<Element>(this.data)
        
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
      
     },()=>{},()=>{
      this.load = 0
    })

    this.dataservice.getUser().subscribe((res:any)=>{
      this.User=this.userCopy= res
    })

    
  }



  showAllProduit() {
    this.dataservice.getProduit().subscribe(
      (data:any) => {
        this.Produit = data,
        this.produitCopy=data
      }
    )

  }

  onSelectVille(ville_id:any){
    //console.log(this.lastRec);
    
    this.todo.get('vehicule')!.setValue('')
    this.dataservice.getVehicule().subscribe((result:any)=>{
      
      
      this.vehiculeCopy=this.Vehicule = result.filter(
        (res:any)=>res.ville.id == ville_id,
        
        
        )
        
      })
   
  }

  onSelectProduit(id:any){
    
    this.dataservice.getProbleme().subscribe((res:any)=>{
      
      this.todo.get('probleme')!.setValue('')
      this.todo.get('solution')!.setValue('')
      

      this.problemeCopy=[]
      this.Produit.forEach((p:any) => {
        if (p.id==id) {
          p.problemes.forEach((pr:any) => {
            res.forEach((r:any) => {
              if (r.id==pr.id) {
                this.problemeCopy.push(r)
              }
            });
            
            
            
          })
        }
        
        
      })
      this.Probleme=this.problemeCopy
      
      
    })
   
  }

  onSelectProbleme(id:any){
    this.dataservice.getSolution().subscribe((res:any)=>{
      this.todo.get('solution')!.setValue('')
      
      //console.log(this.vehicule)
      this.solutionCopy=[]
     

      let arSol:any=[]
      id.forEach((i:any) => {
        this.Probleme.forEach((p:any) => {
          
          if (i==p.id) {
            p.solutions.forEach((sol:any) => {
              res.forEach((r:any) => {
                if (r.id==sol.id && arSol.indexOf(sol.id) < 0) {
                  
                  this.solutionCopy.push(r)
                }
              });
              
              
              
            })
          }


        });
        this.solutionCopy.forEach((s:any) => {
          arSol.push(s.id)
        });
        
      })
      this.Solution=this.solutionCopy
      //console.log("++",this.solution);
      
    })
    
    
   
  }

  hideAdd:boolean=true
  addButton:boolean=true
  
  bodyStyle:any = ''

  
  closePopup(){
    this.bodyStyle='opacity:1;pointer-events:all;'
  }

  add(){
    this.todo.get('user')!.setValue('')
    this.todo.get('ville')!.setValue('')
    this.todo.get('vehicule')!.setValue('')
    this.todo.get('produit')!.setValue('')
    this.todo.get('probleme')!.setValue('')
    this.todo.get('solution')!.setValue('')
    this.todo.get('description')!.setValue('')
    this.addButton=true

    if (this.style=='') {
      this.style='opacity:0.5;pointer-events:none;'
    } else {
      this.style=''
    }


   
   
    this.hideAdd=!this.hideAdd
    window.scrollTo(0,0)
    
  }

  ident:any
  recId:any
  onMod(rec:any){
   
    this.addButton=false
    this.hideAdd=false
    let listP:any=[]
    this.dataservice.getIdReclamation(rec).subscribe((res:any)=>{
      //console.log(res);
      this.recId=res.id
      this.userId=res.id
      this.Probleme=this.problemeCopy=res.product.problemes
      //this.Solution=this.solutionCopy=res.probleme.solutions
      this.onSelectVille(res.device.ville.id)
      this.todo.get('user')!.setValue(res.client.id)
      this.todo.get('ville')!.setValue(res.device.ville.id)
      this.todo.get('vehicule')!.setValue(res.device.id)
      this.todo.get('produit')!.setValue(res.product.id)
      
      //this.todo.get('solution')!.setValue(res.solution.id)
      this.todo.get('description')!.setValue(res.description)
      this.ident=res.ident

     // this.onSelectProduit(res.product.id)

      res.problemes.forEach((prob:any) => {
        listP.push(prob.id)
        
      })
      

      
      
      
    })
    this.todo.get('probleme')!.setValue(listP)
    

    window.scrollTo(0,0)
  }

  addNew(){
    // reclamation => response.id
    this.load = 1
      let data:any={}
      
      //console.log(this.todo.get('vehicule')!.value);
      let last
      let cnt 
      let probleme
      let solution
      if (this.lastRec==undefined) {
        cnt='01'
      }else{
        last= this.lastRec.ident.split("/")
        
        if (parseInt(last[3])<9) {
          cnt='0'+(parseInt(last[3])+1)
        } else {
          cnt=parseInt(last[3])+1
        }
      }

      let Problemes:any=[]
      

      let Solutions:any=[]
      

      let Reference:any=[{id:3}]
  


      if (this.todo.get('probleme')!.value=='') {
        Problemes.push({id:16})
        Solutions.push({id:18})
      } else {
        this.todo.get('probleme')!.value.forEach((id:any) => {
          
          Problemes.push({id:id})
        });

        // this.todo.get('solution')!.value.forEach((id:any) => {
          
        //   Solutions.push({id:id})
        // });
      }
      
      
      //if (this.todo.get('solution')!.value==null) {
        data = {
          device: { id: this.todo.get('vehicule')!.value },
          product: { id: this.todo.get('produit')!.value },
          problemes: Problemes,
          solutions: [{id:18}],
          statut: 'en cours',
         
          description: this.todo.get('description')!.value,
          references: Reference,
          date_creation: this.curDate,
          date_modification: this.curDate,
          istodo:true,
          ident: 'A'+this.curDate.getFullYear()+'/'+this.curDate.getMonth()+'/'+this.curDate.getDate()+'/'+cnt,
          client: { id: this.todo.get('user')!.value }
        };
      // } else {
      //   data = {
      //     device: { id: this.todo.get('vehicule')!.value },
      //     product: { id: this.todo.get('produit')!.value },
      //     probleme: Problemes,
      //     solution: Solutions,
      //     statut: 'en cours',
      //     istodo:true,
      //     description: this.todo.get('description')!.value,
      //     reference: Reference,
      //     date_creation: this.curDate,
      //     date_modification: this.curDate,
      //     ident: 'A'+this.curDate.getFullYear()+'/'+this.curDate.getMonth()+'/'+this.curDate.getDate()+'/'+cnt,
      //     client: { id: this.todo.get('user')!.value }
      //   };
      // }
      


      //console.log(data);
      

      let log:any={}
      
      this.dataservice.addForm(data).subscribe(
        (response)  => {
          
          
      //     log = {
      //       id_rec: response.id ,
            
      //       op: 'CREATE'
      //     };
      //     //console.log(log);
      //     // this.dataservice.addLog(log).subscribe(()=>{
        //     //   
        //     // })
        
        
       this.add()
      
       this.showVille()
          

      })
  }
    

    
  

  dddd(){
    this.hideAdd=!this.hideAdd
  }
  
  userId:any
  modTodo(){
    this.load = 1
    this.hideAdd=!this.hideAdd
    let data:any={}
    //console.log(this.todo.get('solution')!.value);
    let Reference:any=[{id:3}]
    let Problemes:any=[]
    this.todo.get('probleme')!.value.forEach((id:any) => {
        
      Problemes.push({id:id})
    });

    data = {
      id:this.recId,
      device: { id: this.todo.get('vehicule')!.value },
      product: { id: this.todo.get('produit')!.value },
      problemes: Problemes,
      solutions: [{id:18}],
      statut: 'en cours',
     
      description: this.todo.get('description')!.value,
      references: Reference,
      date_creation: this.curDate,
      date_modification: this.curDate,
      istodo:true,
      ident: this.ident,
      client: { id: this.todo.get('user')!.value }
    };
    
    //console.log(data);

    this.dataservice.editReclamation(data).subscribe(()=>{
      this.showVille()
    },
    (error)=>{
      this.error='Error !!!'
    })
  }

  error:any=''

  filter(event:any){
    this.dataSource.filter = event.value
  }

  
  

  Description:any
  hide:boolean=true
  style:any = ''
  traite:boolean=true

  detail(recl:any){
    this.hide=false
    //console.log(desc);
    this.Description=recl
    this.style='opacity:0.5;pointer-events:none;'
    
    
    
    
    //this.elem.first.nativeElement.setAttribute("style", "opacity:0.5;")
    
  }

  hideDetail(){
    this.style=''
    this.hide=true
  }


 

  onDelete(id:any){
    // this.dataservice.deleteUser(id).subscribe(
    //   ()=>{this.showAll()}
    // )
    
  }
}
