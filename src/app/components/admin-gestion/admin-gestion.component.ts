import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/sevices/data.service';

@Component({
  selector: 'app-admin-gestion',
  templateUrl: './admin-gestion.component.html',
  styleUrls: ['./admin-gestion.component.css']
})
export class AdminGestionComponent implements OnInit {

  constructor(private dataservice:DataService, private activateRoute: ActivatedRoute){}
 
  ngOnInit(): void {
   
  }
  name = this.activateRoute.snapshot.paramMap.get('name')
  idUser = sessionStorage.getItem('user');
  is_admin:any = sessionStorage.getItem('is_admin');
  

}
