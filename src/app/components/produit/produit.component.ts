import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/sevices/data.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatInputModule} from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vehicule } from 'src/app/models/vehicule';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  produitSelected: any={
    name:'',problemes:[]
  }

  produitVide: any={
    name:'',problemes:[]
  }
  
  
  probleme: any;
  problemes: any=[]
  problemesOld: any=[]
  hideAdd:boolean=true
  addButton:boolean=true
  problemeCopy: any=[]

  style:any = ''

  add(){
    this.showAll()
    this.addButton=true
    this.problemes=[]
    this.produitSelected = {
      name:'',problemes:[]
    }

    if (this.style=='') {
      this.style='opacity:0.5;pointer-events:none;'
    } else {
      this.style=''
    }

    this.inputText.nativeElement.value=''
   
    this.hideAdd=!this.hideAdd
    window.scrollTo(0,0)
    
  }

  fProbleme(e:any){
    //console.log(e.target.value);
    
    this.probleme=this.problemeCopy

    //console.log("fV",this.vehicule);
    this.probleme=this.probleme.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
       
  }

  valueEx: any=[]
  existe:boolean=false
  chercher(event:any){
    this.existe=false
    let dataCherche=this.dataSource
    dataCherche.filter = event.value
    this.valueEx=dataCherche.filteredData
    this.valueFilter=dataCherche.filter
  
    this.deja=false
    if (dataCherche.filteredData[0]) {
      this.existe=true
    }else{
      this.existe=false
    }
    
   
  }

  valueFilter:any

  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute){}
 
  ngOnInit(): void {
    this.getProbleme()
    this.showAll()
  }


  
  showAll() {
    this.dataservice.getProduit().subscribe(
      (data:any) => {
        let i=0
        data.forEach((element:any) => {
          element.num=i+1
          i++
        });
        this.dataSource = new MatTableDataSource<Element>(data)
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
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

  }

  getProbleme() {
    
    this.dataservice.getProbleme().subscribe(
      (data:any) => {
        this.problemeCopy=this.probleme = data
        //console.log(data);
        
      }
    )
    //console.log("111",this.probleme);
    

  }

  filter(event:any){
    this.dataSource.filter = event.value
  }

  addProduit = new FormGroup({
    produit: new FormControl('',Validators.required),
    Probleme:new FormControl()
  })

  get produit() {
    return this.addProduit.controls['produit'];
  }

  get Probleme() {
    return this.addProduit.controls['Probleme'];
  }



  displayedColumns = ['num','name','mod','supp'];
  dataSource:any = [];
  //name = this.activateRoute.snapshot.paramMap.get('name')
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  deja:boolean=false
  addNew(){

    let cnt=0
    this.valueEx.forEach((element:any) => {
      if (element.name == this.produitSelected.name) {
        this.deja=true
        cnt++
      }
    });

    
    
    if (cnt!=0) {
      this.deja=true
      
    }else{
      this.problemes.forEach((element:any) => {
        this.produitSelected.problemes.push({id:element})
      });
      
      this.dataservice.addProduit( this.produitSelected).subscribe(
        (data:any) => {
          this.ngOnInit()
        }
      )
      
      this.add()
    }

    
    
  }

  onMod(produit:any){
    this.addButton=false
    this.hideAdd=false
    this.problemes=[]
    this.produitSelected.problemes=[]
    this.produitVide.name=this.produitSelected.name = produit.name
    this.produitVide.id=this.produitSelected.id = produit.id
    
    produit.problemes.forEach((element:any) => {
      this.problemesOld.push(element.id)
      
      
    });

    produit.problemes.forEach((element:any) => {
      const result = this.problemes.filter((i:any) => i === element.id).length;
      if (result==0) {
        
        this.problemes.push(element.id)
      }
      
    });
    
    //console.log("problemes init ",this.problemes);
    window.scrollTo(0,0)

   //console.log(this.problemes);
   
    
  }

  modProduit(produit:any){
    //console.log("*****",this.produitSelected);

    
    
    // this.dataservice.editProduit(this.produitVide).subscribe(()=>{
      
    // })

    // this.problemesOld.forEach((p:any) => {
    //   this.problemes.forEach((element:any) => {
    //     if (this.problemesOld.indexOf(p) >= 0) {
    //       this.produitSelected.problemes.push({id:element})
          
    //     }
        
    //   });
      
      
    // });
    
    // console.log("--> ",this.produitVide);
    //console.log("old ",this.problemesOld);
    //console.log("problemes final ",this.problemes);
    let cnt=0
    this.valueEx.forEach((element:any) => {
      if (element.name == this.produitSelected.name) {
        this.deja=true
        cnt++
      }
    });

    
    
    if (cnt!=0) {
      this.deja=true
      
    }else{
      let dup:any = []
      this.problemes.forEach((element:any) => {

          if (this.problemesOld.indexOf(element) < 0 ) {
            this.produitSelected.problemes.push({id:element})
          }else{
            if (dup.indexOf(element) < 0) {
              
              dup.push({id:element})
            }
          }

      });

      dup.forEach((element:any) => {
        this.produitSelected.problemes.push(element)
      })

      this.dataservice.editProduit(this.produitSelected).subscribe(()=>{
        this.showAll()
      })
      this.add()
    }

    
    
  }


  @ViewChild('inputText') inputText!: ElementRef;

  // supp

  idd:any
  Sup:boolean = false

  toSupp(id:any){
    this.style='opacity:0.5;pointer-events:none;'
    this.Sup=true
    this.idd=id
  }

  hideDetail(){
    this.style=''
    
    this.Sup=false
  }

  onDelete(id:any){
    this.dataservice.deleteProduit(id).subscribe(
      ()=>{this.showAll()}
    )
    this.hideDetail()
  }

 
}
