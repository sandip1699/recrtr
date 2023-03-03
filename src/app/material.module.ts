import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
// import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
// import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
// import {MatTabsModule} from '@angular/material/tabs';
// import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
// import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule, MatRippleModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
// import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
// import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatChipsModule} from '@angular/material/chips';



const data = [
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatIconModule,
  // MatTabsModule,
  // MatExpansionModule,
  MatDialogModule,
  // MatSelectModule,
  MatOptionModule,
  MatMenuModule,
  MatTooltipModule,
  MatRippleModule,
  // MatProgressBarModule,
  MatRadioModule,
  MatCheckboxModule,
  MatChipsModule,
];

@NgModule({
  imports: data,
  exports: data
})

export class MaterialModule {
}
