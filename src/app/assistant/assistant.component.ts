import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Documents } from '../model/document';
import {DocumentService} from '../services/document.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { asBlob } from 'html-docx-js-typescript';
import { saveAs } from 'file-saver';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UsersList } from '../model/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css'],
})
export class AssistantComponent implements OnInit {

  docObject: Documents = {
    id: '',
    doctitle: '',
    file: '',
    time:'',
  }
  userObject: UsersList = {
    creditCount: 0,
    email: '',
    userid: '',
    plan: '',
    plantype: ''
  }
  generatedText: any;
  composevalue : string = '';
  compname: string = '';
  desc: string = '';
  tone: string = '';
  response_length: string = '';
  user_notes: string = '';
  bot: any;
  note: any;
  finalvalue: any;
  composes = [
    {id: 1, name: "Email", info:"Write job Description to Compose Email"},
    {id: 3, name: "LinkedIn InMail",info:"Write job Description to Compose LinkedIn InMail"},
    {id: 4, name: "SMS",info:"Write job Description to Compose SMS"},
    {id: 4, name: "Tweet",info:"Write job Description to Compose Tweet"},
  ]
  selectedcomvalue :any;
  messageDiv : any;
  loadInterval : any;
  generatedTexthtml : string = '';
  editoractive : boolean = false;
  newDocument : boolean = false;
  ducumentlisted : boolean = false;
  toogleMenu : boolean = false;
  limitover : boolean = false;
  loader : boolean = false;
  nocomposed : boolean = false;
  dataLoader:boolean = false;
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
    ],
  }
  documentDetails: any;
  documenttexts: any;
  docnamed: any;
  refreshList: any;
  message : any;
  uid: any = localStorage.getItem('currentUser');
  redata : string | undefined;
  converted:any;
  mywindow: any;
  countclick: any;
  userData:any;
  curentuserinfo: any;
  curentkey:any
  useremail: any;
  useruid: any;
  yourplan: any;
  jobdescoption: boolean = false;
  yourplantype:any;
  suggestions: any;
  placehodername: any;
  
  

  constructor(private documentService:DocumentService, private authservice:AuthService, private snackBar: MatSnackBar,db: AngularFireDatabase,private router: Router) {
  }
 
  ngOnInit() {
    setTimeout(() => {
      this.getAllDecoument();
    }, 100);
    this.authservice.getuserInfo().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.userData = data;
      this.curentuserinfo = [];
      this.userData.forEach((item:any) =>{
        if(item.userid == this.uid){
          this.curentuserinfo.push(item);
        }
      });
      this.curentuserinfo.map((a:UsersList) => {
        this.curentkey = a;
        this.countclick = a.creditCount;
        this.useremail = a.email;
        this.useruid = a.userid;
        this.yourplan = a.plan;
        this.yourplantype = a.plantype;
        this.checkcount();
      });
      
    });
    
  }

  checkcount() {
    setTimeout(() => {
      console.log('click value is',this.countclick);
      if(this.countclick < 1) {
        this.limitover=true;
      }
    }, 400);
  }

selectCompose(value : string) {
     this.selectedcomvalue = value;
     this.compname = this.selectedcomvalue.name;
     this.placehodername = this.selectedcomvalue.info;
     this.doctitle = this.compname;
     if(this.compname === 'Job Description') {
        this.jobdescoption = true;
     } else {
      this.jobdescoption = false;
     }
     console.log(this.compname);
}

  async composeNownew() {
    this.loader = true;
    if(this.desc && this.composevalue) {
      this.countclick--;
    const response = await fetch('https://us-central1-recruitryte-a1750.cloudfunctions.net/composeText/composertye', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "text_type": this.compname,
          "tone": this.tone,
          "desc": this.desc,
          "user_notes": this.user_notes,
          "response_length": this.response_length
        }),
      });
      if (response.ok) {
        const data = await response.json();
        this.suggestions = data.responses;
       let jointexts = this.suggestions.join('<div class="templatespace"><hr/></div>');
        setTimeout(() => {
            this.generatedTexthtml = jointexts.replace(/\n|\r|\r\n/g, "<br/>");
        }, 100);
        
        this.nocomposed = false;
        this.loader = false;
        this.docnamed = this.doctitle;
        this.newDocument = true;
        this.updateuserdetsils();
        this.checkcount();
        this.compname = '';
        this.desc = '';
        this.tone = '';
        this.response_length = '';
        this.user_notes = '';
      } else {
        const err = await response.text();
        alert(err);
      }
    }
    else {
      alert('please fill up form');
      this.loader = false;
    }
  }

async saveDocument(){
  this.loader = true;
  this.docObject.id = this.uid,
  this.docObject.doctitle = this.docnamed;
  this.docObject.file = this.generatedTexthtml;
  this.docObject.time = document.lastModified;
  this.documentService.addDocment(this.docObject).then((documents: any)=>{
    if(documents) {
      console.log(documents);
      this.ducumentlisted = true;
      this.newDocument = false;
      this.loader = false;
      this.snackBar.open('The Document was updated successfully!', 'close', {
        duration: 3000
      });
    } else {
      this.snackBar.open('document not saved', 'close', {
        duration: 3000
      });
      this.loader = false;
    }
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
    if(this.DocumentData.length === 0) {
      this.nocomposed = true
    } else {
      this.nocomposed = false;
    }
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
  this.generatedTexthtml = this.documentDetails.file;
  this.docnamed = this.documentDetails.doctitle; 
  this.editoractive = true;
  this.newDocument = true;
}

updateDocuments(note:any) {
    this.docObject.id = note.id,
    this.docObject.doctitle = this.docnamed;
    this.docObject.file = this.generatedTexthtml;
    this.docObject.time = document.lastModified;
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
updateuserdetsils() {
  this.userObject.creditCount = this.countclick;
  this.userObject.email = this.useremail;
  this.userObject.userid = this.useruid;
  this.userObject.plan = this.yourplan;
  this.userObject.plantype = this.yourplantype;
  if (this.userObject) {
    this.authservice.updateuserInfo(this.curentkey.key, this.userObject)
      .then(() => {
          console.log('user updated');
        }); 
  }
}

addnewDocument() {
  this.newDocument = true;
  this.ducumentlisted = false;
  this.docnamed = "New Document";
  this.generatedTexthtml = '';
}
async download() {
  const text = this.generatedTexthtml;
  this.converted = await asBlob(text, {
    orientation: 'portrait',
  });
  saveAs(this.converted, 'document.docx');
}
async downloadTextFile() {
  const textnew = this.generatedTexthtml.replace(/<[^>]+>/g, '\n');
  var blob = new Blob([textnew], {
     type: "text/plain;charset=utf-8",
  });
  saveAs(blob, "document.txt");
}
async downloadpdfFile() {
  const pdftext = document.getElementById("divprint");
  this.mywindow = window.open("", "PRINT", "height=700,width=900");
  this.mywindow.document.write('<html><head><title>Download document</title><style>body{font-family: system-ui,-apple-system,"Segoe UI";line-height: 1.6;}.angular-editor-wrapper{padding: 30px;}.angular-editor-toolbar {display: none;}</style></head><body>');
  this.mywindow.document.write(pdftext?.innerHTML);
  this.mywindow.document.write('</body></html>');
  this.mywindow.document.close();
  this.mywindow.focus();
  this.mywindow.print();
  return true;
}

}
