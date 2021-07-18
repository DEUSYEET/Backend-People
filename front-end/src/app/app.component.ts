import { Component, ElementRef } from '@angular/core';
import { ApiService } from './user-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'acuteAngular';
  results;
  searchFirst = "";
  searchPhone = "";
  searchAge = "";
  searchState = "";
  searchCountry = "";

  advancedSearch = false;
  showInfo = false;

  constructor(private apiService: ApiService, private elemRef: ElementRef) { }

  ngOnInit(): void {
    this.getData();
  }


  getData() {
    this.apiService.getUsers().subscribe(((data) => {
      this.results = data['results'].sort(
        (a, b) => {
          var val = (a.name.last.toLowerCase() > b.name.last.toLowerCase()) ? 1 : -1;
          if(a.name.last.toLowerCase() == b.name.last.toLowerCase()){
            var val = (a.name.first.toLowerCase() > b.name.first.toLowerCase()) ? 1 : -1;
          }
          // console.log(val);
          return val;
        }
      );
    }));
  }


  toggleAdvanced() {
    this.advancedSearch = !this.advancedSearch;
  }



  toggleInfo(id) {
    // console.log(document.getElementById(id));
    let info = document.getElementById(id);
    let imageM = document.getElementById(id+"imageM")
    let imageL = document.getElementById(id+"imageL")

    let infoClasses = info.classList;
    let imageMClasses = imageM.classList;
    let imageLClasses = imageL.classList;

    if(infoClasses.contains("hidden")){
      infoClasses.remove("hidden");
      imageLClasses.remove("hidden");
      imageMClasses.add("hidden");
    } else {
      imageMClasses.remove("hidden");
      infoClasses.add("hidden");
      imageLClasses.add("hidden");
    }
  }
}
