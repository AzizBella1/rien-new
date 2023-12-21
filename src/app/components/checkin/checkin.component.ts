import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/sevices/data.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit{
  displayedColumns = ['checkValue','user','date','time'];
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


  data:any

  getCheck(){
    this.dataservice.getCheck().subscribe((data:any)=>{
      //console.log(data);
      let list: { checkValue: any; dh: any; date: any; time:any; id: any; user: any; userId: any; }[] = []
      //let list2: { checkValue: any; dh: any; date: any; id: any; user: any; userId: any; }[]= []
      let i = 0

      

      if (data && Array.isArray(data)) { 

        data.forEach((element:any) => {
          list.push({checkValue:element.checkValue,dh:element.dh,date:element.dh.substring(0,10), time:element.dh.substring(10,19),id:element.id,user:element.user.name,userId:element.user.id})
          
        });


        // list.forEach((item) => {
        //   if (i == 0) {
        //     list2.push({checkValue:item.checkValue,dh:item.dh,date:item.date,id:item.id,user:item.user,userId:item.userId})
        //   }else{
        //     // if (list2.indexOf(item.date) == -1) {
        //     //   console.log("no");
              
        //     // }else{
        //     //   console.log("yes");
              
        //     // }

        //     const isPresent = list2.some((obj) => {
        //       return obj.checkValue === item.checkValue && obj.date === item.date && obj.userId === item.userId;
        //     });
            
        //     if (!isPresent) {
        //       list2.push({checkValue:item.checkValue,dh:item.dh,date:item.date,id:item.id,user:item.user,userId:item.userId})
        //     } 
            

        //   }
        //   i++
        // });

      }

      this.data = list
      this.data.sort((a: any, b: any) => b.id - a.id); 
      //console.log(list2);

      this.dataSource = new MatTableDataSource(this.data);
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
      
    },()=>{},()=>{
      
      this.load=0
    })
  }

  searcheIcon:boolean=true
  filter(event:any){
    this.dataSource.filter = event.value
    if (event.value == '') {
      this.searcheIcon=true
    } else {
      this.searcheIcon=false
    }
    
  
  }

  clearSearcheInput(){
    if (this.inputField) {
      this.inputField.nativeElement.value = ''; 
    }
    this.filter('')
    this.searcheIcon=true
  }
}
