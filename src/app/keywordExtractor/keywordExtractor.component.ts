import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keywordExtractor',
  templateUrl: './keywordExtractor.component.html',
  styleUrls: ['./keywordExtractor.component.css']
})
export class KeywordExtractorComponent implements OnInit {

  public urls: string[]=[];
  constructor() {
    this.urls[0] = 'https://play.google.com/store/apps/details?id=com.elhajjaji.miao&hl=fr';
  }

  ngOnInit() {
  }

}
