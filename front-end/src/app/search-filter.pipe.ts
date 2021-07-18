import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(values: any[], searchString: string): any[] {  
    // console.log(values);  
    return values.filter((item) =>     
      (
        searchString === "" || item.name.first.toLowerCase().includes(searchString.toLowerCase()) || item.name.last.toLowerCase().includes(searchString.toLowerCase())
      ) 
    );
  }

}
