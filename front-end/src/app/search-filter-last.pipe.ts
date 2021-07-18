import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilterLast'
})
export class SearchFilterLastPipe implements PipeTransform {

  transform(values: any[], searchString: string): any[] {
    // console.log(values);  
    return values.filter((item) =>
      (
        searchString === "" || item.phone.replace("(", "").replace(")", "").replace(" ", "").replace("-", "").includes(searchString.replace("(", "").replace(")", "").replace(" ", "").replace("-", ""))
      )
    );
  }
}
