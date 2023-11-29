import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/sevices/data.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatInputModule} from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vehicule } from 'src/app/models/vehicule';

@Component({
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  Probleme: any={
    name:'',solutions:[]
  }

  solution: any;
  solutionsOld: any=[]
  sols: any=[]

  style:any = ''

  hideAdd:boolean=true
  addButton:boolean=true
  add(){
    this.getProbleme()
    this.addButton=true
    this.Probleme = {
      name:'',solutions:[]
    }

    if (this.style=='') {
      this.style='opacity:0.5;pointer-events:none;'
    } else {
      this.style=''
    }

    this.solutions=[]
    this.hideAdd=!this.hideAdd
    window.scrollTo(0,0)
    
  }


  existe:boolean=false
  valueEx: any=[]
  chercher(event:any){
    this.deja=false
    this.existe=false
    let dataCherche=this.dataSource
    this.valueEx=dataCherche.filteredData
    dataCherche.filter = event.value
    if (dataCherche.filteredData[0]) {
      this.existe=true
    }else{
      this.existe=false
    }
  }

  solutions:any=[]

  test(x:any){
    
    
    //console.log("p ",this.Probleme);
    
    //console.log(x);
    
  }

  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute){}
 
  ngOnInit(): void {
    this.showAll()
    this.getProbleme()
  }

  
  showAll() {

    
    
    this.dataservice.getSolution().subscribe(
      (data:any) => {
        this.solutionCopy=this.solution = data
        //console.log(data);
        
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

  solutionCopy:any=[]

  fSolution(e:any){
    //console.log(e.target.value);
    
    this.solution=this.solutionCopy

    //console.log("fV",this.vehicule);
    this.solution=this.solution.filter((v:any) => v.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
       
  }

  addProbleme = new FormGroup({
    probleme: new FormControl('',Validators.required),
    Solution:new FormControl('',Validators.required)
  })

  get probleme() {
    return this.addProbleme.controls['probleme'];
  }
  get Solution() {
    return this.addProbleme.controls['Solution'];
  }



  displayedColumns = ['num','name','mod','supp'];
  dataSource:any = [];
  //name = this.activateRoute.snapshot.paramMap.get('name')
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  getProbleme() {
    this.solutions=[]
    this.dataservice.getProbleme().subscribe(
      (data:any) => {
        //console.log(data);
        let i=0
        data.forEach((element:any) => {
          element.num=i+1
          i++
        });
        this.dataSource = new MatTableDataSource<Element>(data)
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      }
    )

  }

  filter(event:any){
    this.dataSource.filter = event.value
  }
  
  
  deja:boolean=false
  addNew(){
    
    let cnt=0
    this.valueEx.forEach((element:any) => {
      if (element.name == this.Probleme.name) {
        this.deja=true
        cnt++
      }
    });

    
    
    if (cnt!=0) {
      this.deja=true
      
    }else{
      this.solutions.forEach((element:any) => {
        this.Probleme.solutions.push({id:element})
      });
      
      
      this.dataservice.addProbleme( this.Probleme).subscribe(
        (data:any) => {
          this.ngOnInit()
        }
      )
      
      this.add()
    }

    

    
  }

  onMod(probleme:any){
    this.addButton=false
    this.hideAdd=false
    this.solutions=[]
    this.Probleme.solutions=[]
    this.Probleme.name = probleme.name
    this.Probleme.id = probleme.id

    probleme.solutions.forEach((element:any) => {
      this.solutionsOld.push(element.id)
      
      
    });

    probleme.solutions.forEach((element:any) => {
      const result = this.solutions.filter((i:any) => i === element.id).length;
      if (result==0) {
        
        this.solutions.push(element.id)
      }
    });
    window.scrollTo(0,0)
    //this.Probleme.solutions = probleme.solutions

    //console.log(this.solutions);
    
    
  }

  modProbleme(probleme:any){
    let dup:any = []
    this.solutions.forEach((element:any) => {
      //this.problemesOld.forEach((old:any) => {
      
        if (this.solutionsOld.indexOf(element) < 0 ) {
          
          this.Probleme.solutions.push({id:element})
        }else{
          if (dup.indexOf(element) < 0) {
            
            dup.push({id:element})
          }
        }
        
      //});
     
      
    });

    dup.forEach((element:any) => {
      this.Probleme.solutions.push(element)
    })



    

    // console.log("pro ",this.Probleme);
    // console.log("sol ",this.solutions);
    // console.log("dup ",dup);
    // console.log("pro final ",this.Probleme);

    let cnt=0
    this.valueEx.forEach((element:any) => {
      if (element.name == this.Probleme.name) {
        this.deja=true
        cnt++
      }
    });
    if (cnt!=0) {
      this.deja=true
      
    }else{
      this.dataservice.editProbleme(this.Probleme).subscribe(()=>{
      
        this.getProbleme()
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
    this.dataservice.deleteProbleme(id).subscribe(
      ()=>{this.getProbleme()}
    )
    this.hideDetail()
  }
}
