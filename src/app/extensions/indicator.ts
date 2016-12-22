import {Resource} from "./resource";
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
  cst = {
    formulaPattern: /#\{.+?\}/g,
    constantPattern: /C\{.+?\}/g,
    separator: "."
  }

  loadExpression(expression) {
    //let cache = null;
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

          this.getCategoryOptions(categoryOptionsIDs).then((categoryOptions:Array<any>) => {

            this.getDataElements(dataElementIDs).then((dataElements:Array<any>) => {

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

  getDataElements(dataElementIDs) {

    return new Promise((resolve, reject)=> {
      //noinspection TypeScriptUnresolvedFunction
      this.http.get("dataElements.json?fields=id,name&filter=id:in:[" + dataElementIDs + "]")
        .map(res => res.json())
        .subscribe((results:any)=> {
          resolve(results.dataElements);
        }, ()=> {
          reject("Error");
        });
    })
  }

  getCategoryOptions(categoryOptionsIDs) {

    return new Promise((resolve, reject)=> {
      //noinspection TypeScriptUnresolvedFunction
      this.http.get("categoryOptionCombos.json?fields=id,name&filter=id:in:[" + categoryOptionsIDs + "]")
        .map(res => res.json())
        .subscribe((results:any)=> {
          resolve(results.categoryOptionCombos);
        }, ()=> {
          reject("Error");
        });
    })
  }
}
