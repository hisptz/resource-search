import {Resource} from "./resource";
import {DataElement} from "./data-element";
export class Indicator extends Resource{

  tabs = [{
    title: "Detail Info",
    active: true,
    type: "info",
    properties: {
      transform: {
        numerator: 'loadExpression',
        denominator: 'loadExpression'
      }
    }
  },
    {
      title: "Analytics Info",
      active: false,
      type: 'chat',
      config: {}
    }];
  loadExpression(expression) {
    return new Promise((resolve, reject)=> {
      //noinspection TypeScriptUnresolvedFunction
      this.http.get("indicators.json")

        .map(res => res.json())
        .subscribe(()=> {
          let matcher = expression.match(this.cst.formulaPattern);
          let dataElementIDs = [];
          let categoryOptionsIDs = [];
          for (let k in matcher) {
            let match = matcher[k];
            // Remove brackets from expression to simplify extraction of identifiers
            let operand = match.replace(/[#\{\}]/g, '');
            let isTotal = !!( operand.indexOf(this.cst.separator) == -1 );
            if (isTotal) {
              dataElementIDs.push(operand);
            } else {
              let de = operand.substring(0, operand.indexOf(this.cst.separator));
              dataElementIDs.push(de);
              categoryOptionsIDs.push(operand.substring(operand.indexOf(this.cst.separator) + 1, operand.length));
            }
          }
          let dataElement = new DataElement(this.http);
          dataElement.getCategoryOptions(categoryOptionsIDs).then((categoryOptions:Array<any>) => {

            dataElement.getDataElements(dataElementIDs).then((dataElements:Array<any>) => {

              dataElements.forEach((dataElement)=> {
                expression = expression.replace("#{" + dataElement.id + "}", "(" + dataElement.name + ")");
                categoryOptions.forEach((categoryOption)=> {
                  expression = expression.replace("#{" + dataElement.id + "." + categoryOption.id + "}", "(" + dataElement.name + " " + categoryOption.name + ")");
                });
              });
              resolve(expression);
            }, (error)=> {
              reject(error);
            });
          }, (error)=> {
            reject(error);
          });
        })
    });
  }
}
