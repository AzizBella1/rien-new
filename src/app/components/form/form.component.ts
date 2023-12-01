import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DataService } from '../../sevices/data.service'
import { Form } from 'src/app/models/form';
import { Ville } from 'src/app/models/ville';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject, Subject, interval, map, min, take, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelect } from '@angular/material/select';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
    dataLog= null;

  fonctions:any = ["AUTRE"
  ,"BALAYAGE MANUEL"
  ,"SERVICE"
  ,"INTERVENTION"
  ,"CITERNE"
  ,"LAVAGE COLONNES"
  ,"LAVAGE BACS"
  ,"SUIVI"
  ,"AMPLIROLL"
  ,"COLLECTE BACS"
  ,"COLLECTE COLONNES"
  ,"COLLECT CAISSONS"
  ,"TRANSFERT"
  ,"BALAYAGE MECANIQUE"]

  fonctionsCopy:any=this.fonctions
  addVehiculeForm = new FormGroup({
    name: new FormControl('',Validators.required),
    uniqueid:new FormControl('',Validators.required),
    fonction:new FormControl()
   
  })


  get name() {
    return this.addVehiculeForm.controls['name'];
  }

  get uniqueid() {
    return this.addVehiculeForm.controls['uniqueid'];
  }


  get fonction() {
    return this.addVehiculeForm.controls['fonction'];
  }

  

  device: any={
    name:'',
    ville:{id:0},
    uniqueid:'' ,
    fonction:''
  }


  hideAdd:boolean=true
  addButton:boolean=true
  showAddDevice:boolean=false

  addVehicule(villeId:any){
    this.hideAdd=!this.hideAdd
    this.device.ville.id=villeId
    this.style='opacity:0.1;pointer-events:none;'
    //this.add()
    
  }

 
  add(){
    this.style=''
    this.device = {
      name:'',
      ville:{id:0},
      uniqueid:'' ,
      fonction:''    

    }

    this.hideAdd=!this.hideAdd

  }

  addNewVehicule(){
    
  
    this.device.concatdev='GEORED'
    //console.log(this.device);
    
    this.dataservice.addVehicule( this.device).subscribe(
      (data:any) => {
        //console.log(data);
        data.concatdev=this.device.concatdev+data.id
        this.dataservice.editVehicule(data).subscribe(()=>{
          this.onSelectVille(this.device.ville.id)
          this.add()
        
        })
        
      
        
      })
  }





  disableSelect = new FormControl(false);


  ville: any;
  vehicule: any;
  produit:any;
  probleme:any;
  solution:any;

 
  ref: any;

  
  
  villeCopy:any=[]
  vehiculeCopy:any=[]
  produitCopy:any=[]
  refCopy:any=[]
  problemeCopy:any=[]
  solutionCopy:any=[]
  
  fVille(e:any){
    //console.log(e.target.value);
    this.ville=this.villeCopy
    this.ville=this.ville.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
       
  }

  fVehicule(e:any){
    //console.log(e.target.value);
    
    this.vehicule=this.vehiculeCopy

    //console.log("fV",this.vehicule);
    this.vehicule=this.vehicule.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
       
  }

  fProduit(e:any){
    //console.log(e.target.value);
    this.produit=this.produitCopy
    this.produit=this.produit.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
       
  }

  fProbleme(e:any){
    //console.log(e.target.value);
    
    this.probleme=this.problemeCopy

    //console.log("fV",this.vehicule);
    this.probleme=this.probleme.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
       
  }

  fSolution(e:any){
    //console.log(e.target.value);
    
    this.solution=this.solutionCopy

    //console.log("fV",this.vehicule);
    this.solution=this.solution.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
       
  }

  fRef(e:any){
    //console.log(e.target.value);
    this.ref=this.refCopy
    this.ref=this.ref.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
       
  }

  fFonction(e:any){
    //console.log(e.target.value);
    this.fonctions=this.fonctionsCopy
    this.fonctions=this.fonctions.filter((v:any) => v.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
       
  }

  

  curDate=new Date();
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');

  forms: Form[] = [];
  newForm: any= {
    vehiculeId:0,user: this.idUser, villeId: 0 , produitId: 0, problemeId: 0 ,refId:0, solutionId: 0 , description:'',file:'',statut:1,dateCreation: this.curDate,dateModification: null
  }

  selectedville: any ={
    id:0,name:''
  }
  selectedvehicule: any ={
    id:0,name:''
  }
  selectedproduit: any ={
    id:0,name:''
  }
  selectedprobleme: any ={
    id:0,name:''
  }
  selectedFile: any; 
  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute, private router: Router,
    private http: HttpClient
    ){}

  ngOnInit() :void {
    // if (sessionStorage.getItem('load')=='0') {
    //   sessionStorage.setItem('load','1')
    //   this.router.navigate(['/home'])
    //   //window.location.reload()
    // }
    this.showAll();
    this.showAllProduit();
    this.getSolution()
    //this.showAllSolution();
    this.showAllProbleme();
    //this.showProbleme()
    //this.showSolution()
    this.showRef()
    //this.editReclamation();
    this.changeButton()
    this.valider()
    this.dataservice.getReclamation().subscribe((data:any)=>{
      data.sort((a:any, b:any) => b.id - a.id)
      
      if (data[0].date_creation.substring(8,10)==this.curDate.getDate()) {
        this.lastRec=data[0]
      } else {
        this.lastRec=undefined
      }
      
      

     })
     

    

  }
  
  getSolution() {
    this.dataservice.getSolution().subscribe(
      (data:any) => {
        this.solution=this.solutionCopy = data
      }
    )

  }
  
  
  lastRec:any
  
testerTanger:any=[]
testerMarrakech:any=[]
  showAll() {
   /* this.dataservice.getTanger().subscribe(
      (data:any) => {
        //this.testerTanger = data
        let i=0
        data.forEach((l:any) => {
          var val={name:l.name,id:i+1,disabled:l.disabled,ville:{id:16}}
          this.testerTanger[i]=val
          i++
        });
        
        console.log(this.testerTanger[0])
      }
    )
    this.dataservice.getMarrakech().subscribe(
      (data:any) => {
        //this.testerTanger = data
        let i=0
        data.forEach((l:any) => {
          var val={name:l.name,id:i+1,disabled:l.disabled,ville:{id:10}}
          this.testerMarrakech[i]=val
          i++
        });
        
        console.log(this.testerMarrakech[0])
      }
    )*/
    
    this.dataservice.getVille().subscribe(
      (data:any) => {
        this.ville = data,
        this.villeCopy=data
        //console.log()
      },
      (error:any)=>{
        if (error.error.status==500) {
          sessionStorage.removeItem('user'); 
          sessionStorage.removeItem('tokenExp')
          sessionStorage.removeItem('token'); 
          sessionStorage.removeItem('is_admin')
          
          window.location.href='/'
        }
      }
    )
    this.dataservice.getUser().subscribe((res:any)=>{
      this.user= res.filter((item:any)=>item.name==this.idUser)
    })

  }
  showAllProduit() {
    this.dataservice.getProduit().subscribe(
      (data:any) => {
        this.produit = data,
        this.produitCopy=data
       // console.log(this.produit)
      }
    )

  }

  showAllProbleme(){
    this.dataservice.getProbleme().subscribe(
      (data:any) => {
        this.probleme = data,
        this.problemeCopy=data
       // console.log(this.produit)
      }
    )
  }

  

  showRef() {
    this.dataservice.getReference().subscribe(
      (data:any) => {
        this.refCopy=this.ref = data.filter((res:any)=>res.id != 1)
      
        //console.log(this.ref)
      }
    )

  }

 
 
  ttttt:any=[]
  changeVille:boolean=false
  selVille = new FormControl()
  onSelectVille(ville_id:any){
    /*this.ttttt=[]
      switch (ville_id) {
        case 10:
          console.log(this.testerMarrakech);
          
          this.ttttt=this.testerMarrakech
          break;
      
        case 16:
          console.log(this.testerTanger);
          
          this.ttttt=this.testerTanger
          break;
        
      }*/
    this.allValid=false
    this.newForm.vehiculeId=0
    this.selectedvehicule.id=0
    this.dataservice.getVehicule().subscribe((result:any)=>{
      
      
      this.vehiculeCopy=this.vehicule = result.filter(
        (res:any)=>res.ville.id == ville_id,
        
        
        )
        
      })

      if (ville_id==18) {
        this.showAddDevice=true
      }
      //console.log("////",this.vehicule)
   
  }

  onSelectProduit(id:any){
    this.newForm.problemeId=0
    //this.probleme.id=0
    this.newForm.solutionId=0
    this.newForm.refId=0
    //this.solution.id=0
    
    
    //this.Traite=false

    // this.dataservice.getProbleme().subscribe((res:any)=>{
    //   this.newForm.problemeId=0
    //   //this.probleme.id=0
    //   //this.newForm.solutionId=0
    //   this.newForm.refId=0
    //   //this.solution.id=0
      
      
    //   this.Traite=false

    //   this.problemeCopy=[]
    //   this.produit.forEach((p:any) => {
    //     if (p.id==id) {
    //       p.problemes.forEach((pr:any) => {
    //         res.forEach((r:any) => {
    //           if (r.id==pr.id) {
    //             this.problemeCopy.push(r)
    //           }
    //         });
            
            
            
    //       })
    //     }
        
        
    //   })
    //   this.probleme=this.problemeCopy
    //  //console.log("++",this.problemeCopy);
      
    // })
   
  }

  onSelectProbleme(id:any){
   
    
    this.dataservice.getSolution().subscribe((res:any)=>{
      //this.newForm.solutionId=0
      
      this.Traite=false
      //console.log(this.vehicule)
      this.solutionCopy=[]
      // this.probleme.forEach((p:any) => {
      //   if (p.id==id) {
      //     p.solutions.forEach((sol:any) => {
      //       res.forEach((r:any) => {
      //         if (r.id==sol.id) {
      //           this.solutionCopy.push(r)
      //         }
      //       });
            
            
            
      //     })
      //   }
        
        
      // })

      let arSol:any=[]
      id.forEach((i:any) => {
        this.probleme.forEach((p:any) => {
          
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
      this.solution=this.solutionCopy
      //console.log("++",this.solution);
      
    })
   
  }
  

  check(){
    this.newForm.refId=0
  }



  allValid:boolean=true
  Traite:boolean=true

  clearSol(n:any){
    if (n==0) {
      
      this.newForm.solutionId=0
      //this.Traite=!this.Traite
    }
    this.valider()
  }   
  valider(){
   
    
    switch (this.newForm.statut) {
      case 0:
        
        if (this.newForm.vehiculeId==0  || this.newForm.villeId==0 || this.newForm.produitId==0   ) {
          this.Traite=true
          this.allValid=false
            
          
        }else{
          
            
          this.allValid=true
          
          this.Traite=true
          
        }
        
        break;
      case 1:
        if (this.newForm.vehiculeId==0  || this.newForm.villeId==0 || this.newForm.produitId==0  ||this.newForm.problemeId==0 ||  (this.disableSelect.value==true && this.newForm.refId==0 ) ) {
      
          
          this.allValid=false
          this.Traite=false
          // if (this.newForm.solutionId==0) {
          // }else{
          //   this.Traite=true
          // }
          
            
          
        }else{
          if (this.newForm.solutionId==0) {
            this.Traite=false
            this.allValid=false
          }else{
            this.Traite=false
            this.allValid=true
          }
          
          
          
        }
        break;
    
      
    }
    
    
    
    
    
  }
  user:any
  statut:any
  lastFormId:any
  error:any=''
  addReclamation(){
    // reclamation => response.id
    
    let last
    let cnt 
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
      

   // if (this.allValid) {
      switch (this.newForm.statut) {
        case 0:
           this.statut='en cours'
          break;
        case 1:
           this.statut='traité'
          break;
      }

      let data:any={}
      

      
      let Problemes:any=[]
      this.newForm.problemeId.forEach((id:any) => {
          
        Problemes.push({id:id})
      });

      let Solutions:any=[]
      

      let Reference:any=[]
      

      if (this.newForm.refId==0) {
        Reference.push({id:3})
      }else{
        //console.log(this.newForm.refId);
        
        this.newForm.refId.forEach((id:any) => {
          Reference.push({id:id})
        });
      }

      
        
      if (this.newForm.solutionId==0) {
        data = {
          device: { id: this.newForm.vehiculeId },
          product: { id: this.newForm.produitId },
          problemes: Problemes,
          solutions: [{ id:4 }],
          statut: this.statut,
          istodo:false,
          description: this.newForm.description,
          references: Reference,
          date_creation: this.curDate,
          date_modification: this.curDate,
          ident: 'A'+this.curDate.getFullYear()+'/'+(this.curDate.getMonth()+1)+'/'+this.curDate.getDate()+'/'+cnt,
          client: { id: this.user[0].id }
        };
      } else {
        this.newForm.solutionId.forEach((id:any) => {
          
          Solutions.push({id:id})
        });
        data = {
          device: { id: this.newForm.vehiculeId },
          product: { id: this.newForm.produitId },
          problemes: Problemes,
          solutions: Solutions,
          references: Reference,
          statut: this.statut,
          description: this.newForm.description,
          date_creation: this.curDate,
          date_modification: this.curDate,
          istodo:false,
          ident: 'A'+this.curDate.getFullYear()+'/'+(this.curDate.getMonth()+1)+'/'+this.curDate.getDate()+'/'+cnt,
          client: { id: this.user[0].id }
        };
      }

      this.encour='encour'
      this.style='opacity:0.5;pointer-events:none;'
      //console.log(data);
      //this.dataLog = data
      let log:any={}
      

      // let test = {
      //   device: {id: 2 },
      //   product: { id: 1 },
      //   problemes: [{id:1}],
      //   solutions: [{ id:3 }],
      //   statut: "traité",
      //   istodo:false,
      //   description: '',
      //   references: [{id:1}],
      //   date_creation: "2023-08-31T14:06:04.948Z",
      //   date_modification: "2023-08-31T14:06:04.948Z",
      //   ident: "A2023/7/31/03",
      //   client: { id:}
      // };

      this.dataservice.addForm(data).subscribe(
        (response)  => {
          
          
          log = {
            id_rec: response.id ,
            
            op: 'CREATE'
          };
          //console.log(log);
          this.dataservice.addLog(log).subscribe(()=>{
            setTimeout(()=>{
              this.encour=''
              this.message='success'
            },1000)
            this.uploadFile(response.id)
          },(error)=>{
           this.error='Error Log!!!'
          })
          
          
        
          //setInterval(()=>{
          //},1000)
      
        
          

          //console.log('Reclamation created successfully', response);
          //alert('Reclamation created successfully'+ response);
          
          //alert(1)
           // Handle the response here
         },(error)=>{
          //console.log(error);
          
          this.error='Error Add !!!'
        })
        
        
      
      
        
      
    

    
  }
  
  style:any
  message:any=''
  encour:any=''
  


 
  fileValid:boolean=true
  onFileSelected(event:any) {  
    if (event && event.target.files.length > 0) { 
      this.selectedFile =  event.target.files[0]; 
      this.newForm.file=this.selectedFile.name
      this.fileValid=true

      this.elem.first.nativeElement.setAttribute("style", "visibility:hidden;")
      
    } 
    
                                        
  }

 
  @ViewChild('inputFile') inputFile!: ElementRef;

  
  @ViewChildren('loading') elem!:  QueryList<ElementRef>;
  cancel(){
    this.newForm.file=''
    this.selectedFile=undefined
    this.inputFile.nativeElement.value=''
    this.elem.first.nativeElement.setAttribute("style", "visibility:hidden;")
   
    
    

  }
  charge(){
    
    if (this.fileValid && this.newForm.file=='' ) {
      this.elem.first.nativeElement.setAttribute("style", "visibility:visible;")
    } 
    if (this.selectedFile) {
      this.elem.first.nativeElement.setAttribute("style", "visibility:visible;")
    } 
    
    
  }

  

  uploadFile(id:any): void {
    if (this.selectedFile) {
      //const zip = new JSZip();
      //const folder = zip.folder('my-folder');
      
      //folder!.file(this.selectedFile.name, this.selectedFile);
      let formData: FormData = new FormData();
      // zip.generateAsync({ type: 'blob' }).then((content) => {
       
      //   const file = new File([content],this.selectedFile.name);
      //   //console.log(file);
        
      //   formData.append('file', content,'comp.zip');
      //   //formData.append('file', this.selectedFile);
      //   formData.append('recid', id);

      //   this.dataservice.uploadImg(formData)
      // });
      formData.append('file', this.selectedFile);
      formData.append('recid', id);

      this.dataservice.uploadImg(formData)
      //alert('????????????'+this.selectedFile)
     
    }else{
      this.router.navigate(['/home'])
    }
  }

  

 
  idForm = this.activateRoute.snapshot.paramMap.get('id')
  issetId:boolean = true

  


  changeButton(){
    if (this.idForm == null) {
      this.issetId = false
    }
    
  }

  


 
}
