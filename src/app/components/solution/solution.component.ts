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
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent implements OnInit {
  Solution: any={
    name:''
  }

  probleme: any;
  villeTrue:boolean=true

  style:any = ''
  

  hideAdd:boolean=true
  addButton:boolean=true
  valueEx: any=[]
  add(){
    this.getSolution()
    this.Solution = {
      name:''
    }

    if (this.style=='') {
      this.style='opacity:0.5;pointer-events:none;'
    } else {
      this.style=''
    }
    
    
    this.hideAdd=!this.hideAdd
    this.addButton=true
    window.scrollTo(0,0)
    
  }

  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute){}
 
  ngOnInit(): void {
    this.showAll()
    this.getSolution()
  }

 
  showAll() {
    
    this.dataservice.getProbleme().subscribe(
      (data:any) => {
        this.probleme = data
      }
    )

  }

  addSolution = new FormGroup({
    solution: new FormControl('',Validators.required),
    probleme:new FormControl('',Validators.required)
  })

  get solution() {
    return this.addSolution.controls['solution'];
  }




  displayedColumns = ['num','name','mod','supp'];
  dataSource:any = [];
  //name = this.activateRoute.snapshot.paramMap.get('name')
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  getSolution() {
    this.dataservice.getSolution().subscribe(
      (data:any) => {
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

  deja:boolean=false
  addNew(){
    this.Solution.name=this.addSolution.value.solution
    let cnt=0
    this.valueEx.forEach((element:any) => {
      if (element.name == this.Solution.name) {
        this.deja=true
        cnt++
      }
    });
    if (cnt!=0) {
      this.deja=true
      
    }else{
      this.dataservice.addSolution( this.Solution).subscribe(
        (data:any) => {
          this.ngOnInit()
          
        }
      )
      this.add()
    }
  }

  onMod(solution:any){
    this.addButton=false
    this.hideAdd=false
    this.Solution.name = solution.name
    this.Solution.id = solution.id
    window.scrollTo(0,0)

  }

  modSolution(solution:any){

    let cnt=0
    this.valueEx.forEach((element:any) => {
      if (element.name == this.Solution.name) {
        this.deja=true
        cnt++
      }
    });
    if (cnt!=0) {
      this.deja=true
      
    }else{
      this.dataservice.editSolution(this.Solution).subscribe(()=>{
        
        solution = this.Solution
        this.getSolution()
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
    this.dataservice.deleteSolution(id).subscribe(
      ()=>{ this.getSolution()}
    )
    this.hideDetail()
  }


}
