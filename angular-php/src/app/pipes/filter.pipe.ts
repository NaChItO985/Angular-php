import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const resutltProducts = [];
    for(const product of value){
      if(product.name.indexOf(args)> -1){
        resutltProducts.push(product);
      }
    }
    return resutltProducts;
  }

}
