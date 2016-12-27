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
      config: {
        structure: {
          components: [
            {
              'type': 'table',
              'config': {
                'rows': ['pe'],
                'columns': ['co']
              }
            },
            {
              'type': 'chart',
              'config': {
                'rows': ['pe'],
                'columns': ['co']
              }
            }
          ]
        },
        getData: 'getData'
      }
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

  getData(url) {
    return new Promise((resolve, reject)=> {
      this.http.get(url + ".json?fields=id,name,dataSets[periodType]").subscribe((data) => {

        let availablePeriods = ["Daily", "Weekly", "Monthly", "Bi-monthly", "Quarterly", "Six-monthly", "Six-monthly April", "Yearly", "FinancialOctober", "FinancialJuly", "FinancialApril"];
        let selectedPeriodIndex = 0;
        let indicator = data.json();
        indicator.dataSets.forEach(function (dataSet:any) {
          console.log(dataSet);
          availablePeriods.forEach(function (availablePeriod, index) {
            if (dataSet.periodType == availablePeriod && index > selectedPeriodIndex) {
              selectedPeriodIndex = index;
            }
          });
        });
        let pe = this.getFetchingPeriods(availablePeriods[selectedPeriodIndex]);
        this.http.get("analytics.json?dimension=dx:" + indicator.id + "&dimension=ou:USER_ORGUNIT&dimension=pe:" + pe + "&displayProperty=NAME").subscribe((analyticsResults)=> {
          resolve({
            config: {
              title: indicator.name,
              structure: [
                {
                  title: "Chart",
                  active: true,
                  'type': 'chart',
                  'config': {
                    'rows': ['pe'],
                    'columns': ['co']
                  }
                },
                {
                  title: "Table",
                  active: false,
                  'type': 'table',
                  'config': {
                    'rows': ['pe'],
                    'columns': ['co']
                  }
                }
              ]
            },
            analytics: analyticsResults.json()
          });
        }, (error) => {
          reject(error);
        });
      }, (error) => {
        alert("Here2")
        reject(error);
      });
      //noinspection TypeScriptUnresolvedFunction
    })
  }
}
