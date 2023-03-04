import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DocumentService} from '../services/document.service';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

// chips 
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-boolean-strings',
  templateUrl: './boolean-strings.component.html',
  styleUrls: ['./boolean-strings.component.css'],
})
export class BooleanStringsComponent implements OnInit {

  booleanchipform! : FormGroup;
  booleanInputType: string = 'query';
  desc: string = '';
  descvalue : string = '';
  loader:boolean = false;
  keywordResult:boolean = false;
  desctype:boolean = false;
  booleanstringsection:boolean = false;
  keys: any;
  keywordsvalue:any;
  jobdesc:any;
  requireDesireKeyword : boolean = false;
  entity_list:any;
  // chips 
  separatorKeysCodes: number[] = [ENTER, COMMA];
  requiredkeyCtrl = new FormControl('');
  desirekeyCtrl = new FormControl('');
  reqkeywords: string[] = ['UI developer','Javascript','React.Js Developer'];
  deskeywords: string[] = ['Front-End Coding','Front-End Codebase'];
  allkeywords: string[] = ['CSS', 'HTML', 'Lime', 'Javascript', 'Angular'];
  @ViewChild('requiredInput')
  requiredInput!: ElementRef<HTMLInputElement>;
  @ViewChild('desiredInput')
  desiredInput!: ElementRef<HTMLInputElement>;
  booleanlist: any;


  constructor(private documentService:DocumentService, private authservice:AuthService, private snackBar: MatSnackBar,db: AngularFireDatabase,private router: Router,public formBuilder: FormBuilder) {
   
  }
 
  ngOnInit() {
    this.booleanchipform = this.formBuilder.group({
      requiredkeyCtrl: new FormControl(this.reqkeywords),
      desirekeyCtrl: new FormControl(this.deskeywords),
    });
    
  }

  selectgenrateOption(selectitem : string){
    console.log(selectitem);
    if(selectitem === 'jobdescription'){
      this.desctype = true;
    }
    if(selectitem === 'query'){
      this.desctype = false;
    }
  }

  async genrateKeywords() {
    if(this.jobdesc){
      this.descvalue = this.jobdesc;
    }
    if(this.desc){
      this.descvalue = this.desc;
    }
    this.loader = true;
    this.keywordResult = true;
    const response = await fetch('https://us-central1-recruitryte-a1750.cloudfunctions.net/composeText/analyzebooleanjob', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          desc: this.descvalue,
        })
    })
    if (response.ok) {
      this.loader = false;
      this.requireDesireKeyword = true;
      const data = await response.json();
      let objArray = data.entity_list;
      this.keywordsvalue = data.entity_list;
      let requiredSkill = objArray.filter((a: { is_required: number; }) => a.is_required == 1);
      let desireSkill = objArray.filter((a: { is_required: number; }) => a.is_required == 0);
      console.log('required Skill', requiredSkill);
      this.reqkeywords = requiredSkill.map((a: { text: any; }) => a.text);
      this.deskeywords = desireSkill.map((a: { text: any; }) => a.text);
      console.log('required Skill keywords', this.reqkeywords);
        // boolean queries 
      //  this.keywordsvalue = data.boolean_keywords;
      //   this.keys = Object.keys(this.keywordsvalue);
    }
  }

 async genrateBooleanString() {
    this.loader = true;
    const response = await fetch('https://us-central1-recruitryte-a1750.cloudfunctions.net/composeText/booleanquery', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        desc: this.jobdesc,
        required_keywords : this.reqkeywords,
        desired_keywords: this.deskeywords
      })
  })
  if (response.ok) {
    this.loader = false;
    const data = await response.json();
    console.log(data);
    this.keywordResult = true;
    this.booleanstringsection = true;
    this.booleanlist = data.result; 
    console.log(this.booleanlist);
  } else {
    this.loader = false;
  }
  }

  trackBy(index: any, item: any) {
    return index;
  }

  copyToClipboard(item:any) {
    console.log(item);
    navigator.clipboard.writeText(item);
  }

  // chips 
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.reqkeywords.push(value);
    }
    event.chipInput!.clear();
    // this.requiredkeyCtrl.setValue(null);
    this.booleanchipform.controls['requiredkeyCtrl'].setValue(this.reqkeywords);

  }
  adddesired(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.deskeywords.push(value);
    }
    event.chipInput!.clear();
    // this.desirekeyCtrl.setValue(null);
    this.booleanchipform.controls['desirekeyCtrl'].setValue(this.deskeywords);
  }
  remove(fruit: string): void {
    const index = this.reqkeywords.indexOf(fruit);
    if (index >= 0) {
      this.reqkeywords.splice(index, 1);
    }
  }
  removedesired(fruit: string): void {
    const index = this.deskeywords.indexOf(fruit);
    if (index >= 0) {
      this.deskeywords.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.reqkeywords.push(event.option.viewValue);
    this.requiredInput.nativeElement.value = '';
    this.requiredkeyCtrl.setValue(null);
  }
  


}
