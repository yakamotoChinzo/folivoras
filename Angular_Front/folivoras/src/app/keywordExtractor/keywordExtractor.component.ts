import { Component, OnInit } from "@angular/core";
import { KeywordExtractorService } from "../services/keyword-extractor.service";
import { Keyword } from "../models/Keyword";

@Component({
  selector: "app-keywordExtractor",
  templateUrl: "./keywordExtractor.component.html",
  styleUrls: ["./keywordExtractor.component.css"]
})
export class KeywordExtractorComponent implements OnInit {
  public urls: string[] = [];
  dtOptions: DataTables.Settings = {};
  public keywords: Keyword[];
  constructor(private keywordService: KeywordExtractorService) {
    for (let index = 0; index < 5; index++) {
      this.urls[index] =
        "https://play.google.com/store/apps/details?id=com.elhajjaji.miao";
    }
  }

  ngOnInit() {
    this.dtOptions = {
      searching: true,
      language: {
        url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
      },
      paging: true,
      order: [[ 1, "desc" ]],
      pagingType: "simple_numbers",
      dom: "Bflrtip"


    };

  }

  getKeywords() {
    this.keywordService.getKeywords(this.getRequestUrls()).subscribe(
      data => {
        console.log(data);
        this.keywords = data.keywordList;
        console.log(this.keywords);
      },
      error => {
        console.log(error);
      }
    );
  }

  getRequestUrls(): string {
    let request = "";
    for (let index = 0; index < 5; index++) {
      if (index == 0)
        request =
          request + '{"url' + (index + 1) + '":"' + this.urls[index] + '"';
      request =
        request + ',"url' + (index + 1) + '":"' + this.urls[index] + '"';
    }
    request = request + "}";
    console.log(request);

    return request;
  }
}
