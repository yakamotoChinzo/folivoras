import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { KeywordExtractorComponent } from './keywordExtractor/keywordExtractor.component';


const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'keyword-extractor' , component: KeywordExtractorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
