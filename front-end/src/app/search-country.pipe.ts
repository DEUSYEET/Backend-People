import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCountry'
})
export class SearchCountryPipe implements PipeTransform {

  transform(values: any[], searchString: string): any[] {
    // console.log(values);  
    return values.filter((item) =>
      (
        searchString === "" || item.location.country.toLowerCase().includes(searchString.toLowerCase())
      )
    );
  }

}
