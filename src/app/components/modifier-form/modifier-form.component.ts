import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/sevices/data.service';

@Component({
  selector: 'app-modifier-form',
  templateUrl: './modifier-form.component.html',
  styleUrls: ['./modifier-form.component.css']
})
export class ModifierFormComponent implements OnInit {


  constructor(private dataservice:DataService,  private router: Router,private activateRoute: ActivatedRoute){}
  idUser = sessionStorage.getItem('user');
  is_admin = sessionStorage.getItem('is_admin');

  ville: any;
  vehicule: any;
  produit:any;
  probleme:any;
  solution:any;

  curDate=new Date();

  forms: Form[] = [];
  client:any=''
  reclamation:any
  newForm: any= {
    vehiculeId:0,user: this.client, villeId: 0 , produitId: 0, problemeId: 0 ,refId:0, solutionId: 0 , description:'',file:'',statut:1,dateModification: this.curDate
  }

  loading:boolean=true
 

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
  
  
  ngOnInit() :void {
    
    this.showAll();
    this.showAllProduit();
    this.showRef(null)
    
    
    this.getSolution()
    this.changeButton()
    //this.valider()
    //this.editReclamation();
    
    
    
  }

  getSolution() {
    this.dataservice.getSolution().subscribe(
      (data:any) => {
        this.solution=this.solutionCopy = data.filter((res:any)=>res.id != 18)
      }
    )

  }

  selectedFile: any; 
  

  
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

  check(){
    this.newForm.refId=0
  }

  

  idForm = this.activateRoute.snapshot.paramMap.get('form')
  selected= new FormControl();
  selectedVehicule= new FormControl();
  selectedProduit= new FormControl();
  selectedProbleme= new FormControl();
  selectedSolution= new FormControl();
  selectedRef= new FormControl();

  disableSelect = new FormControl(true);

  getReclamation(){
    this.dataservice.getIdReclamation(this.idForm).subscribe(
      (res:any)=>{
        
        //console.log(res.product.problemes);
        this.showVehicule(res.device.ville.id)
        this.showProbleme(res.product.id,res)
        //console.log("probleme ",res.solutions)
        //this.showSolution(res.problemes)
        this.newForm.dateCreation=res.date_creation
        this.newForm.description=res.description
        //console.log("reclamation ",this.newForm)
        //if (res.refId==0) {
        //}
 
        this.selected.setValue(res.device.ville.id)
        this.selectedVehicule.setValue(res.device.id)
        this.selectedProduit.setValue(res.product.id)
        
        this.selectedRef.setValue(res.references.id)
        this.newForm.description=res.description
        this.newForm.file=res.imgurl
        this.newForm.ident=res.ident

        if (!res.istodo) {
          this.client=res.client.id
        }
        
        //console.log(res.problemes.id);
        //this.selectedRef.setValue(res.refId)
        
       
        
        
         
        if (res.statut=='traité') {
          // console.log("===",res.solution.id);
          //this.selectedSolution.setValue(res.solutions)
          this.valider()
        }else{
          this.newForm.statut=0
          this.newForm.solutionId=0
          //this.solution=res.product.problemes[0].solutions
        }

       
        if (res.references[0].id!=3) {
          this.disableSelect.setValue(true)
          this.showRef(res.references)
        }else{
          this.disableSelect.setValue(false)
          this.newForm.refId=0
        }

      }
      )
      
  }
  
  showVehicule(id:any) {
    if (id==18) {
      this.showAddDevice=true
    }
    
    this.dataservice.getVehicule().subscribe((result:any)=>{
      
      
      this.vehiculeCopy=this.vehicule = result.filter(
        (res:any)=>res.ville.id == id
        
        )
        
        
        
    })
      
  }



  showProbleme(id:any,reclamation:any) {

    let problemes:any=[]
    reclamation.problemes.forEach((p:any) => {
      problemes.push(p.id)
    })
    //console.log("// ",this.produit);
    
    
    
    this.dataservice.getProbleme().subscribe((res:any)=>{
     
      //console.warn(res);
      
      
      // this.produit.forEach((p:any) => {
      //   if (p.id==id) {
      //     p.problemes.forEach((pr:any) => {
      //       res.forEach((r:any) => {
      //         if (r.id==pr.id) {
      //           this.problemeCopy.push(r)
      //         }
      //       });
            
            
            
      //     })
      //   }
        
        
      // })
      this.probleme=this.problemeCopy = res.filter((res:any)=>res.id != 16)
    
      this.showSolution(reclamation)
    })
    this.selectedProbleme.setValue(problemes)

  }

  showSolution(reclamation:any) {
    let solutions:any=[]
    reclamation.solutions.forEach((p:any) => {
      solutions.push(p.id)
    })

    //console.log(this.selectedProbleme.value);
    

    let arSol:any=[]


    this.dataservice.getSolution().subscribe((res:any)=>{
      
      this.solution=this.solutionCopy = res
      //console.log("++",this.solutionCopy);
      
    })
    
    
    this.selectedSolution.setValue(solutions)

  }

  
  showAll() {
    
    this.dataservice.getVille().subscribe(
      (data:any) => {
        this.ville = data,
        this.villeCopy=data
        //console.log(this.ville)
      },
      (error:any)=>{
        // if (error.error.status==500) {
        //   sessionStorage.removeItem('user'); 
        //   sessionStorage.removeItem('tokenExp')
        //   sessionStorage.removeItem('token'); 
        //   sessionStorage.removeItem('is_admin')
          
        //   window.location.href='/'
        // }
      }
    )
    this.dataservice.getUser().subscribe((res:any)=>{
      this.user= res.filter((item:any)=>item.username==this.idUser)
    })

  }
  showAllProduit() {
    this.dataservice.getProduit().subscribe(
      (data:any) => {
        this.produit = data,
        this.produitCopy=data
        this.getReclamation()
        //console.log(this.produit)
      }
    )
    

  }

  showRef(ref:any) {
    let references:any=[]
    this.dataservice.getReference().subscribe(
      (data:any) => {
        this.refCopy= this.ref = data.filter((res:any)=>res.id != 3)

        if (ref != null) {
          
          this.refCopy.forEach((l:any) => {
          
            ref.forEach((r:any) => {
              if (r.id == l.id) {
                references.push(l.id)
              }
            });
          });
        }

        

        //console.log(data)
      }
    )
    
    
    this.selectedRef.setValue(references)

  }

 
 

  changeProduit:boolean=false
  onSelectVille(ville_id:any){
    if (ville_id==18) {
      this.showAddDevice=true
    }
    this.allValid=false
    this.newForm.vehiculeId=0
    this.selectedvehicule.id=0
    this.dataservice.getVehicule().subscribe((result:any)=>{
      
      
      this.vehiculeCopy=this.vehicule = result.filter(
        (res:any)=>res.ville.id == ville_id,
        
        
        )
        
        
      })
      //console.log("////",this.vehicule)
   
  }

  onSelectProduit(id:any){
    this.changeProduit=true
    this.newForm.solutionId=0
    this.newForm.problemeId=0
    // this.dataservice.getProbleme().subscribe((res:any)=>{
    //   this.newForm.problemeId=0
    //   this.probleme.id=0
    //   this.newForm.solutionId=0
    //   this.newForm.refId=0
    //   this.solution.id=0
    //   this.disableSelect.setValue(false)
      
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
    //   //console.log("++",this.problemeCopy);
      
    // })
   
  }

  onSelectProbleme(id:any){
   
    this.allValid=false

    this.dataservice.getSolution().subscribe((res:any)=>{
      this.newForm.solutionId=0
      
      this.Traite=false
      this.solutionCopy=[]
      
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
  



  

 

 

  

 


  allValid:boolean=true
  Traite:boolean=true
  clearSol(n:any){
    if (n==0) {
      
      this.newForm.solutionId=0
    }
    this.valider()
  } 
  valider(){
    
    
    switch (this.newForm.statut) {
      case 0:
        if (this.newForm.vehiculeId==0  || this.newForm.villeId==0 || this.newForm.produitId==0  ) {
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


 
  
  issetId:boolean = true

  


  changeButton(){
    if (this.idForm == null) {
      this.issetId = false
    }
    
  }
  user:any

  dataLog:any
  statut:any
  error:any=''
  mod(form:any){
    
    if (this.allValid) {
      switch (this.newForm.statut) {
        case 0:
           this.statut='en cours'
          break;
        case 1:
           this.statut='traité'
          break;
      }

      if (this.client=='') {
        this.client=this.user[0].id
      }

      let data
     

      let Problemes:any=[]

      if (this.newForm.problemeId==0) {
        Problemes.push({id:16})
      }else{

        this.newForm.problemeId.forEach((id:any) => {
          
          Problemes.push({id:id})
        });
      }
      

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
          id:this.idForm,
          device: { id: this.newForm.vehiculeId },
          product: { id: this.newForm.produitId },
          problemes: Problemes,
          solutions: [{ id:4 }],
          references: Reference,
          statut: this.statut,
          istodo:false,
          ident:this.newForm.ident,
          imgurl:this.newForm.file,
          description: this.newForm.description,
          date_creation: this.newForm.dateCreation,
          date_modification: this.newForm.dateModification,
          client: { id: this.client }
        };
      } else {
        this.newForm.solutionId.forEach((id:any) => {
          
          Solutions.push({id:id})
        });
        data = {
          id:this.idForm,
          device: { id: this.newForm.vehiculeId },
          product: { id: this.newForm.produitId },
          problemes: Problemes,
          solutions: Solutions,
          statut: this.statut,
          imgurl:this.newForm.file,
          istodo:false,
          ident:this.newForm.ident,
          references: Reference,
          description: this.newForm.description,
          date_creation: this.newForm.dateCreation,
          date_modification: this.newForm.dateModification,
          client: { id: this.client }
        };
      }
      
      const test = {
        
        device: { id: 1 },
        product: { id: 4 },
        probleme: { id: 1 },
        solution: { id: 1 },
        statut: "traite",
        description: "Issue with the device ",
        date_creation: "2023-06-13T10:00:00",
        date_modification: null,
        client: { id: 12 }
          
      
      };
      //console.log("555555",data);
      //this.dataLog = data
      this.encour='encour'
      this.style='opacity:0.5;pointer-events:none;'
      this.dataservice.editReclamation(data).subscribe((response)=>{
        let log:any={}
          log = {
            id_rec: response.id ,
            
            op: 'UPDATE'
          };
          //console.log(log);
          this.dataservice.addLog(log).subscribe(()=>{
            setTimeout(()=>{
              this.encour=''
              this.message='success'
            },1000)
            if (this.select==true) {
              
              this.uploadFile(this.idForm)
            }else{
              if (this.is_admin=='USER') {
                this.router.navigate(['/home'])
              } else {
                this.router.navigate(['/acceuil'])
              }
              
            }
          },(error)=>{
            this.error='Error Log !!!'
          })
          
        
        
      },(error)=>{
        console.log(error);
        
        this.error='Error Mod!!!'
      }
      )
      
      
      
        
//        this.uploadFile()
    }
    
  }

  encour:any=''
  style:any
  message:any=''
  success(){
    
    
  }

  @ViewChild('inputFile') inputFile!: ElementRef;
  @ViewChildren('loading') elem!:  QueryList<ElementRef>;
  cancel(){
    this.newForm.file=''
    this.selectedFile=undefined
    this.inputFile.nativeElement.value=''
    this.elem.first.nativeElement.setAttribute("style", "visibility:hidden;")
   
    this.select=false
    

  }
  charge(){
    if (this.fileValid && this.newForm.file=='' ) {
      this.elem.first.nativeElement.setAttribute("style", "visibility:visible;")
    } 
    if (this.selectedFile) {
      this.elem.first.nativeElement.setAttribute("style", "visibility:visible;")
    } 
    
  }



  select:boolean=false
  fileValid:boolean=true
  onFileSelected(event:any) {  
    if (event && event.target.files.length > 0) { 
      this.selectedFile =  event.target.files[0]; 
      this.newForm.file=this.selectedFile.name
      this.fileValid=true
      this.select=true
      this.elem.first.nativeElement.setAttribute("style", "visibility:hidden;")
      
    } 
    
                                        
  }

  

  uploadFile(id:any): void {
    if (this.selectedFile) {
      let formData: FormData = new FormData();
      //alert('????????????'+this.selectedFile)
      formData.append('file', this.selectedFile);
      formData.append('recid', id);
      
      this.dataservice.uploadImg(formData)
    }
  }

  editReclamation(){
   
    this.dataservice.getIdReclamation(this.idForm).subscribe((res:any)=>{
      
        this.newForm = res
        
        
      })
      //console.log(this.newForm)
      
    
    
  }
}
