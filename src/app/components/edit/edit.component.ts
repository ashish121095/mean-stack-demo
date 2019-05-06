import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issue.service'
import { Router, ActivatedRoute } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material'

import { Issue } from '../../issue.model'
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id:String
  issue:any={}
  updateForm: FormGroup

  constructor(private issueService: IssueService,
              private router:Router,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
                this.createForm()
               }

  createForm(){
    this.updateForm = this.formBuilder.group({
      title: ['',Validators.required],
      responsible:'',
      description: '',
      severity: '',
      status: ''
    })
  }

  ngOnInit() {
    console.log("inside ngOnInit")
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id
      this.issueService.getIssueById(this.id).subscribe(response => {
        console.log("inside getIssue")
        this.issue = response
        console.log("printing fetched data",this.issue)
        this.updateForm.get('title').setValue(this.issue.title)
        this.updateForm.get('responsible').setValue(this.issue.responsible)
        this.updateForm.get('description').setValue(this.issue.description)
        this.updateForm.get('severity').setValue(this.issue.severity)
        this.updateForm.get('status').setValue(this.issue.status)
        
      })
    })
  }

  updateIssue(title, responsible, description, severity, status){
    this.issueService.updateIssue(this.id, title, responsible, description, severity, status).subscribe(() => {
      this.snackBar.open("Issue updated Successfully", 'OK', {
        duration: 3000,
      })
    })
  }
}
