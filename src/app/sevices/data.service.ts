import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http'
import { Form } from '../models/form';
import { Ville } from '../models/ville';
import { Observable, map } from 'rxjs';
import { Vehicule } from '../models/vehicule';
import { Produit } from '../models/produit';
import { User } from '../models/user';
import { Solution } from '../models/solution';
import { Request } from '../models/request';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { AdminHomeComponent } from '../components/admin-home/admin-home.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient, private router: Router) { }

  //urlVille = 'http://info.geodaki.com:4242/villes';
  urlVille = 'http://localhost:3000/ville';
  urlRef = 'http://localhost:3000/reference';
  urlVehicule = 'http://localhost:3000/devices';
  urlProduit = 'http://localhost:3000/produit';
  urlProbleme = 'http://localhost:3000/probleme';
  urlSolution = 'http://localhost:3000/solution';
  urlReclamation = 'http://localhost:3000/reclamation';

  //urlUser = 'http://info.geodaki.com:4242/Api/clients';
  urlUser = 'http://localhost:3000/user';
/*
  
  urlVehicule = 'http://info.geodaki.com:4242/vehicule';
  urlProduit = 'http://info.geodaki.com:4242/produit';
  urlProbleme = 'http://info.geodaki.com:4242/probleme';
  urlSolution = 'http://info.geodaki.com:4242/solution';
  urlReclamation = 'http://info.geodaki.com:4242/Api/reclamations';

  */

 //private baseUrl = 'http://192.168.100.254:4201/';
  private baseUrl = 'http://info.geodaki.com:4201/';
  is_admin=sessionStorage.getItem('is_admin')



	signin(request: Request): Observable<any> {
    //console.log(request);
		return this.http.post<any>(this.baseUrl + 'signin', request, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(map((resp) => {
			sessionStorage.setItem('user', request.username);
     
			sessionStorage.setItem('token', 'HTTP_TOKEN ' + resp.token);
      //console.log("++++",resp);
      
			return resp;
		}));
	}
  

  devices(token: any){
		const token0 = sessionStorage.getItem('token')
		
		this.http.get<any>(this.baseUrl + 'Api/clients', {
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ token0
			}),
			responseType: 'json'
		  }).subscribe(
			(resp) => {
			  //console.log(resp);
			},
			(error) => {
			  //console.log(error);
			}
		  );
		  
		
	}
  
  urlImg = 'http://localhost:3000/img';
  
  token0 = sessionStorage.getItem('token')
  
  

  
                                                                            ////  Journal
 
  getJornale(): any {
    return this.http.get<any>(this.baseUrl + 'Api/journales', {
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }

  getIdJornale(id:any): any {
    return this.http.get<any>(this.baseUrl + 'Api/journales/'+id, {
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }

  addJornal(form:any){
    
    return this.http.post<any>(this.baseUrl + 'Api/journales', form,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }

  editJornal(form:any){
    return this.http.put<any>(this.baseUrl + 'Api/journales', form,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }

                                                                              ////  Log
 
  getLog(): any {
    return this.http.get<any>(this.baseUrl + 'Api/log', {
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }

  addLog(form:any){
    
    return this.http.post<any>(this.baseUrl + 'Api/log', form,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }

  
  
                                                                            ////  Reclamation
 

  /*
  getReclamation(): any {
    return this.http.get<any>(`${this.urlReclamation}`);
  }

  addForm(form:any){
    return this.http.post<any>(this.urlReclamation,form);
  }

  getIdReclamation(id:any): any {
    return this.http.get<any>(`${this.urlReclamation}/${id}`);
  }

  editReclamation(form:any){
    return this.http.put(`${this.urlReclamation}/${form.id}`,form )

  }
*/
  getIdReclamation(id:any): any {
   
      return this.http.get<any>(this.baseUrl + 'Api/reclamations/'+id,{
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': ''+ this.token0,
          'Access-Control-Allow-Origin': '*'
        }),
        responseType: 'json'
        });
    
    
  }


  

 

  getReclamation(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl + 'Api/reclamations', {
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }

  addForm(form:any){
    
    return this.http.post<any>(this.baseUrl + 'Api/reclamations', form,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }

  editReclamation(form:any){
    return this.http.put<any>(this.baseUrl + 'Api/reclamations', form,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }

  deleteReclamation(id:any){
    return this.http.delete<any>(this.baseUrl + 'Api/reclamations/'+id,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }

  
  


  



                                                                                              //// Image 

  uploadImg(formData: FormData){
    //alert("uploading img")
  
    this.http.post(this.baseUrl+'upload', formData,{headers: new HttpHeaders({'Authorization': ''+ this.token0 })}).subscribe(
      (response) => {
        //if(response)
          //alert('Upload success:')
          //console.log('Upload success:', response);
        //else
         // alert('Upload Err:')
        
        
        
       
      },
      () => {
        //alert(this.is_admin)
        

        if (this.is_admin=='USER') {
          this.router.navigate(['/home'])
        } else {
          this.router.navigate(['/acceuil'])
        }
        //console.error('Upload error:', error);
        //Handle error response
      }
    );
  }


  
  

  // getImageName(recid:any){
  //   return this.http.get(`http://info.geodaki.com:4243/Api/reclamations/${recid}`,{headers: new HttpHeaders({'Authorization': ''+ this.token0 })})
  // }

  // getImage(recid:any){
  //   return this.http.get(`http://info.geodaki.com:4243/download/${recid}` ,{headers: new HttpHeaders({'Authorization': ''+ this.token0 }),responseType: 'blob'})
  // }

  downloadImage(recid:any): Observable<any> {
    
    return this.http.get(`${this.baseUrl}download/${recid.id}`,{headers: new HttpHeaders({'Authorization': ''+ this.token0 }), responseType: 'blob' })
  }


  
  
                                                                                              ///////    admin
  
  validStatut(id:any){
    
    return this.http.put<any>(this.baseUrl + 'Api/reclamations',id,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }
  
  
  



                                                                                              //////    User
  /*getUser(): any {
    return this.http.get<any>(this.urlUser);
  }

  addUser(v:any){
    return this.http.post<any>(this.urlUser,v);
  }

  editUser(v:any){
    return this.http.put(`${this.urlUser}/${v.id}`,v )

  }

  deleteUser(id:any){
    return this.http.delete(`${this.urlUser}/${id}`)
  }
*/

  getUser(): any {
    return this.http.get<any>(this.baseUrl + 'Api/clients', {
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }


  addUser(user:any){
    //console.log("tt",user);
    
    return this.http.post<any>(this.baseUrl + 'Api/clients', user,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }

  

  deleteUser(id:any){
    return this.http.delete<any>(this.baseUrl + 'Api/clients/'+id,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }
  

  

                                                                                              ///   Check


  getCheck(): any {
    return this.http.get<any>(this.baseUrl + 'Api/checks', {
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		});
  }

  addCheck(user:any,st:any){
    return this.http.post<any>(this.baseUrl + 'Api/checks/' + st, user,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		});
  }

                                                                                              ///   Reference
 
  getReference(): any {
    return this.http.get<any>(this.baseUrl + 'Api/references', {
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }

  addReference(reference:any){
    return this.http.post<any>(this.baseUrl + 'Api/references', reference,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }

  editReference(reference:any){
    return this.http.post<any>(this.baseUrl + 'Api/references', reference,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });

  }

  deleteReference(reference:any){
    return this.http.delete<any>(this.baseUrl + 'Api/references/'+reference,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }



                                                                                              ///   Vehicules
   /*getVehicule(): any {
    return this.http.get<any>(this.urlVehicule);
  }


  addVehicule(v:any){
    return this.http.post<any>(this.urlVehicule,v);
  }

  editVehicule(v:any){
    return this.http.put(`${this.urlVehicule}/${v.id}`,v )

  }

  deleteVehicule(id:any){
    return this.http.delete(`${this.urlVehicule}/${id}`)
  } */

  getTanger(){
    return this.http.get<any>('http://tanger.geodaki.com:3000/rpc/wdevices')
  }

  getMarrakech(){
    return this.http.get<any>('http://geodaki.com:3000/rpc/wdevices')
  }
 getVehicule(): any {
    return this.http.get<any>(this.baseUrl + 'Api/devices', {
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }

  addVehicule(vehicule:any){
    return this.http.post<any>(this.baseUrl + 'Api/devices', vehicule,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }

  editVehicule(vehicule:any){
    return this.http.post<any>(this.baseUrl + 'Api/devices', vehicule,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }

  deleteVehicule(id:any){
    return this.http.delete<any>(this.baseUrl + 'Api/devices/'+id,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }
 


                                                                                              ////  Villes

   /* getVille(): any {
    return this.http.get<any>(this.urlVille);
  }


  addVille(ville:any){
    return this.http.post<any>(this.urlVille,ville);
  }

  editVille(ville:any){
    return this.http.put(`${this.urlVille}/${ville.id}`,ville )

  }

  deleteVille(id:any){
    return this.http.delete(`${this.urlVille}/${id}`)
  }
 
  */
  getVille(): any {
		
		return this.http.get<any>(this.baseUrl + 'Api/villes', {
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
     
  }

  addVille(ville:any){
    //console.log(ville);
    
    return this.http.post<any>(this.baseUrl + 'Api/villes', ville,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });

      
  }

  

  deleteVille(id:any){
    return this.http.delete<any>(this.baseUrl + 'Api/villes/'+id,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }
 



                                                                                              /////   Produits
  

  
/*
  getProduit(){
    return this.http.get<any>(this.urlProduit);
  }

  addProduit(produit:any){
    return this.http.post<any>(this.urlProduit,produit);
  }

  editProduit(produit:any){
    return this.http.put(`${this.urlProduit}/${produit.id}`,produit )

  }

  deleteProduit(id:any){
    return this.http.delete(`${this.urlProduit}/${id}`)
  }
*/
  
  getProduit(): any {
    return this.http.get<any>(this.baseUrl + 'Api/products', {
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0,
        'Access-Control-Allow-Origin': '*'
			}),
			responseType: 'json'
		  });
  }

  addProduit(produit:any){
    return this.http.post<any>(this.baseUrl + 'Api/products', produit,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0,
        'Access-Control-Allow-Origin': '*'
			}),
			responseType: 'json'
		  });
  }

  editProduit(produit:any){
    return this.http.put<any>(this.baseUrl + 'Api/products/'+produit.id, produit,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0,
        'Access-Control-Allow-Origin': '*'
			}),
			responseType: 'json'
		  });

  }

  deleteProduit(id:any){
    return this.http.delete<any>(this.baseUrl + 'Api/products/'+id,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0,
        'Access-Control-Allow-Origin': '*'
			}),
			responseType: 'json'
		  });
  }



                                                                                            /////   Probleme
/* 
  getProbleme(): any {
    return this.http.get<any>(this.urlProbleme);
  }


  addProbleme(produit:any){
    return this.http.post<any>(this.urlProbleme,produit);
  }

  editProbleme(produit:any){
    return this.http.put(`${this.urlProbleme}/${produit.id}`,produit )

  }

  deleteProbleme(id:any){
    return this.http.delete(`${this.urlProbleme}/${id}`)
  }

*/
  getProbleme(): any {
    return this.http.get<any>(this.baseUrl + 'Api/problemes', {
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0,
        'Access-Control-Allow-Origin': '*'
			}),
			responseType: 'json'
		  });
  }
  addProbleme(probleme:any){
    return this.http.post<any>(this.baseUrl + 'Api/problemes', probleme,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0,
        'Access-Control-Allow-Origin': '*'
			}),
			responseType: 'json'
		  });
  }

  editProbleme(probleme:any){
    return this.http.put<any>(this.baseUrl + 'Api/problemes/'+probleme.id, probleme,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0,
        'Access-Control-Allow-Origin': '*'
			}),
			responseType: 'json'
		  });

  }

  deleteProbleme(id:any){
    return this.http.delete<any>(this.baseUrl + 'Api/problemes/'+id,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0,
        'Access-Control-Allow-Origin': '*'
			}),
			responseType: 'json'
		  });
  }
 
                                                                                              /////   Solutions
  /*getSolution(): any {
    return this.http.get<any>(this.urlSolution);
  }
  addSolution(produit:any){
    return this.http.post<any>(this.urlSolution,produit);
  }

  editSolution(produit:any){
    return this.http.put(`${this.urlSolution}/${produit.id}`,produit )

  }

  deleteSolution(id:any){
    return this.http.delete(`${this.urlSolution}/${id}`)
  }
*/
  getSolution(): any {
    return this.http.get<any>(this.baseUrl + 'Api/solutions', {
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }

  addSolution(solution:any){
   // console.log(solution);
    
    return this.http.post<any>(this.baseUrl + 'Api/solutions', solution,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }

  editSolution(solution:any){
    return this.http.put<any>(this.baseUrl + 'Api/solutions/'+solution.id, solution,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });

  }

  deleteSolution(id:any){
    return this.http.delete<any>(this.baseUrl + 'Api/solutions/'+id,{
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': ''+ this.token0
			}),
			responseType: 'json'
		  });
  }

  ////   Users

  

  addImg(form:any){
    return this.http.post<any>(this.urlImg,form);
  }


  // image


 

 
}
