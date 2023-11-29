import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
import { Ville } from 'src/app/models/ville';
import { DataService } from 'src/app/sevices/data.service';
import * as pako from 'pako';
//import * as JSZip from 'jszip';
@Component({
  selector: 'app-villes',
  templateUrl: './villes.component.html',
  styleUrls: ['./villes.component.css']
})
export class VillesComponent {
  constructor(private villeService:DataService){}
  ville:any
  testVille:Ville={
    name:''
  }
  editVille:Ville={
    id:5,
    name:'paris'
  }
  villes: Ville[] = []

  ngOnInit() :void {
    this.showAll();
    
  }

  showAll() {
    this.villeService.getVille().subscribe(
      (data:any) => {
        this.ville = data,
        console.log(this.ville)
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


  tet(){
    if (this.testVille.name=="nice") {
      this.villeService.addVille(this.testVille).subscribe((ville:any)=> {
        this.villes = [ville , ...this.villes],
        console.log(this.testVille)
      })
    }
    
   
  }
  persistVille(id:any){
    this.villeService.downloadImage(id)
   
  }


  
  vehicule: any;
  selectedville: any ={
    id:0,name:''
  }

 

  forms:any;
  form: any = {
    vehiculeId:'',user: '', villeId: '' , produitId: '', problemeId: '' , solutionId: ''
  }

  

 

  onSelect(ville_id:any){
    this.villeService.getVehicule().subscribe((res:any)=>{
      this.vehicule = res.filter(
        (res:any)=>res.villeId == ville_id!.value
      ),
      console.log(this.vehicule)
    })
  }


  getForm(){
    this.villeService.getReclamation().subscribe(
      (data:any) => {
        this.forms = data,
        console.log(this.forms)
      }
    )
  }

  edite(ville:any){
    this.testVille = ville
  }

  ima:any
  


  // downloadFile(id:any) {
  //   // const headers = new HttpHeaders().set('responseType', 'blob');
    
  //   this.villeService.getImageName(id).subscribe((response: any) => {
  //   //   console.log(response);
  //     const filename = response.imgurl; // Specify the filename you want to download
  //   //   this.villeService.getImage(id).subscribe((resp) => {
  //   //     console.log(resp);
  //   //     this.ima=resp
  //   //     saveAs(response, filename)
  //   //     //saveAs(response, filename); // Use the file-saver library to save the file
        
  //   //   });
       
  //    });

  //   this.villeService.getImage(id).subscribe(
  //     (data: Blob) => {
  //       this.createImageFromBlob(data);
  //     },
  //     error => {
  //       console.error(error);
  //     }
  //   );
  // }
  imageData: any;

  createImageFromBlob(image: Blob): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageData = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  onFileSelected(event:any) {  
    if (event && event.target.files.length > 0) { 
      this.f =  event.target.files[0]; 
      
    } 
    
                                        
  }
  f:any
 


  fun(){
    // var zip = new JSZip();
    // zip.file("Hello.txt", "Hello World\n");
    // var img = zip.folder("images");
    // img!.file("smile.png", this.f, {base64: true});
    // zip.generateAsync({type:"blob"})
    // .then(function(content) {
    //     // see FileSaver.js
    //     saveAs(content, "example.zip");
    // });
  }
  



}
