import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';
import { Document } from '../model/document';
import {DocumentService} from '../services/document.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css'],
})
export class AssistantComponent implements OnInit {

  documentsFormm!: FormGroup;
  docObject: Document = {
    id: '',
    doctitle: '',
    file: ''
  }
  generatedText: any;
  prompt: any;
  bot: any;
  note: any;
  composevalue : any;
  finalvalue: any;
  compname: any;
  composes = [
    {id: 1, name: "Email", inputvalue : "Write an outreach email to send to a candidate using the below information, starts with About Me, mention the company, job role, required years of experience, and key skills, Add a compelling and short subject line, and Set a Casual tone, also mention where the profile was found : "},
    {id: 2, name: "Job Description", inputvalue : "Job Description for : "},
    {id: 3, name: "LinkedIn InMail", inputvalue : "LinkedIn InMail template for hiring : "},
    {id: 4, name: "SMS Text", inputvalue : "short tweet for hiring : "},
  ]
  selectedcomvalue :any;
  messageDiv : any;
  loadInterval : any;
  generatedTexthtml : string = '';
  editoractive : boolean = false;
  newDocument : boolean = false;
  ducumentlisted : boolean = false;
  toogleMenu : boolean = false;
  loader : boolean = false;
  DocumentData : any;
  doctitle : any;
  editorConfig: AngularEditorConfig = {
    editable: true,
    toolbarHiddenButtons: [
      ['subscript','superscript'],
      [
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  }
  documentDetails: any;
  documenttexts: any;
  docnamed: any;
  refreshList: any;
  message : any;
  uid: any = localStorage.getItem('currentUser');

  

  constructor(private documentService:DocumentService, private authservice:AuthService, private snackBar: MatSnackBar) {}
 
  ngOnInit() {
    setTimeout(() => {
      this.getAllDecoument();
    }, 100);
  }
  richtexteditor() {
    console.log('work');
  }
  selectCompose(value : string) {
     this.selectedcomvalue = value;
     this.compname = this.selectedcomvalue.name;
     this.doctitle = this.compname
     console.log(this.compname);
  }

  async test() {
    //  this.messageDiv = document.getElementById('genratedresult');
    this.loader = true;
    if(this.prompt) {
      
      this.finalvalue = this.selectedcomvalue.inputvalue + ' ' + this.prompt;
      console.log('my input value is - ', this.finalvalue);

      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: this.finalvalue,
        }),
      });
      // clearInterval(this.loadInterval);
      //  this.messageDiv.innerHTML = " ";
      if (response.ok) {
        const data = await response.json();
        this.generatedText = data.bot.trim();
        if (this.generatedText) {
          this.generatedTexthtml = this.generatedText.replace(/\n|\r|\r\n/g, "<br/>");
        }
        this.loader = false;
        this.newDocument = true;
      } else {
        const err = await response.text();
        alert(err);
      }
    } else {
      alert('please fill up form');
    }
  }

  async saveDocument(){
  this.loader = true;
  this.docObject.id = this.uid,
  this.docObject.doctitle = this.doctitle;
  this.docObject.file = this.generatedTexthtml;
  this.documentService.addDocment(this.docObject).then((documents: any)=>{
    if(documents) {
      console.log(documents);
      this.ducumentlisted = true;
      this.newDocument = false;
      this.loader = false;
    }`1`
  });
}
 
getAllDecoument(): void {
  this.documentService.getDocument().snapshotChanges().pipe(
    map((changes: any[]) =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.DocumentData = data;
  });
}
deleteDocumentfile(key:string) {
  let decision = confirm("Are you sure want to delete this note ?");
  if(decision == true) {
    this.documentService.deleteDocument(key)
        .then(() => {
          this.refreshList.emit();
        })
        .catch(err => console.log(err));
  }
}
getdocumentDetails(note:Document) {
  this.note = note;
  this.documentDetails = note;
  console.log(this.documentDetails.file);
  this.documenttexts = this.documentDetails.file;
  this.docnamed = this.documentDetails.doctitle; 
  this.editoractive = true;
}

updateDocuments(note:any) {
    this.docObject.id = note.id,
    this.docObject.doctitle = this.docnamed;
    this.docObject.file = this.documenttexts;
    if (this.docObject) {
      this.documentService.updateDocument(this.note.key, this.docObject)
        .then(() => {
          this.snackBar.open('The Document was updated successfully!', 'close', {
            duration: 3000
          });
          this.message = 'The Document was updated successfully!';
            this.ducumentlisted = true;
            this.newDocument = false;
            this.editoractive = false;
        })
    }
}

downloadDoc(){
  console.log('wokr');
}

}
