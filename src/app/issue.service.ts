import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class IssueService {
   is:{};
   url:string = 'http://localhost:4000'

  constructor(private http:HttpClient) { }

  getIssues(){
    return this.http.get(`${this.url}/issues`);
  }

  getIssueById(id){
    return this.http.get(`${this.url}/issues/${id}`);
  } 

  addIssue(title: string, responsible: string, description: string, severity:string){
    const issue = {
      title:title,
      responsible:responsible,
      description: description,
      severity: severity
    };
      return this.http.post(`${this.url}/issues/add`,issue)
  }

  updateIssue(id, title: string, responsible: string, description: string, severity:string, status: String){
    const issue = {
      title:title,
      responsible:responsible,
      description: description,
      severity: severity,
      status: status
    };
    return this.http.post(`${this.url}/issues/update/${id}`,issue)
  }

  deleteIssue(id){
    return this.http.get(`${this.url}/issues/delete/${id}`)
  }
  
  //http requests
  // geturl(url:string , path:string){
  //   return new Promise((resolve, reject) => {
  //     this.http.get(url+path)
  //         .subscribe(data => {
  //             console.log(data)
  //            resolve(data);
  //          }, (error => {
  //             reject(error);
  //           }));
  //        });
  //       }
  // postUrl(url:string, path:string, data:any){
  //   return this.http.post(url+path,data)
  // }

}
