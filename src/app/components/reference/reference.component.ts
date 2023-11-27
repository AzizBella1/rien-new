import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/sevices/data.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatInputModule} from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css']
})
export class ReferenceComponent implements OnInit {

  referenceSelected: any={
    name:''
  }
  
  style:any = ''
  reference: any;
  references: any=[]
  hideAdd:boolean=true
  addButton:boolean=true
  add(){
    this.showAll()
    this.addButton=true
    this.referenceSelected = {
      name:''
    }

    if (this.style=='') {
      this.style='opacity:0.5;pointer-events:none;'
    } else {
      this.style=''
    }
    
   
    this.hideAdd=!this.hideAdd
    window.scrollTo(0,0)
    
  }

  valueEx: any=[]
  existe:boolean=false
  chercher(event:any){
    this.existe=false
    let dataCherche=this.dataSource
    dataCherche.filter = event.value
    
    this.valueEx=dataCherche.filteredData
    this.deja=false
    if (dataCherche.filteredData[0]) {
      this.existe=true
    }else{
      this.existe=false
    }
  }
  
  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute){}
 
  ngOnInit(): void {
    this.showAll()
  }


  
  showAll() {
    this.dataservice.getReference().subscribe(
      (data:any) => {
        this.dataSource = new MatTableDataSource<Element>(data)
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },()=>{},
      ()=>{
        //this.style = ''
      }
    )

  }

  

  filter(event:any){
    this.dataSource.filter = event.value
  }

  addRef = new FormGroup({
    ref: new FormControl('',Validators.required)
  })

  get ref() {
    return this.addRef.controls['ref'];
  }

  


  displayedColumns = ['id','name','mod','supp'];
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
      if (element.name == this.referenceSelected.name) {
        this.deja=true
        cnt++
      }
    });
    if (cnt!=0) {
      this.deja=true
      
    }else{
      this.dataservice.addReference( this.referenceSelected).subscribe(
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
    this.referenceSelected.name = produit.name
    this.referenceSelected.id = produit.id
   
    
    window.scrollTo(0,0)
    
   
    
  }

  modRef(produit:any){
    let cnt=0
    this.valueEx.forEach((element:any) => {
      if (element.name == this.referenceSelected.name) {
        this.deja=true
        cnt++
      }
    });
    if (cnt!=0) {
      this.deja=true
      
    }else{
      this.dataservice.editReference(this.referenceSelected).subscribe(()=>{
        this.showAll()
      })
      this.add()
    }
    
    
  }

  
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
    this.dataservice.deleteReference(id).subscribe(
      ()=>{this.showAll()}
    )
    this.hideDetail()
  }
}
