import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DataService } from 'src/app/sevices/data.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit{
  displayedColumns = ['num','user','ville','vehicule','dateCreation','dateModification','img','description','log','mod','valider'];
  dataSource:any = [];
  //name = this.activateRoute.snapshot.paramMap.get('name')
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('inputField') inputField!: ElementRef; 

  constructor(private dataservice:DataService,private router: Router){}

  traite:boolean=true
  load:any=1


  ngOnInit(): void {
    this.getCheck()
    
   
  }


  getCheck(){
    this.dataservice.getCheck().subscribe((data:any)=>{
      console.log(data);
      let list= []
      let i = 0


      data.array.forEach((element:any) => {
        if (i == 0) {
          list.push({checkValue:element.checkValue,dh:element.dh,id:element.id})
        }else{

        }
      });
      
    })
  }
}
