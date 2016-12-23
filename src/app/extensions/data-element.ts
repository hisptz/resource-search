import {Resource} from "./resource";
export class DataElement extends Resource {

  tabs = [{
    title: "Detail Info",
    active: true,
    type: "info"
  },
    {
      title: "Analytics Info",
      active: false,
      type: 'chat',
      config: {
        structure: {
          components:[
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

  getData(url) {
    return new Promise((resolve, reject)=> {
      this.http.get(url + ".json?fields=id,name,dataSets[periodType]").subscribe((data) => {

        let availablePeriods = ["Daily", "Weekly", "Monthly", "Bi-monthly", "Quarterly", "Six-monthly", "Six-monthly April", "Yearly", "FinancialOctober", "FinancialJuly", "FinancialApril"];
        let selectedPeriodIndex = 0;
        let dataElement = data.json();
        dataElement.dataSets.forEach(function (dataSet:any) {
          console.log(dataSet);
          availablePeriods.forEach(function (availablePeriod, index) {
            if (dataSet.periodType == availablePeriod && index > selectedPeriodIndex) {
              selectedPeriodIndex = index;
            }
          });
        });
        let pe = this.getFetchingPeriods(availablePeriods[selectedPeriodIndex]);
        this.http.get("analytics.json?dimension=dx:" + dataElement.id + "&dimension=ou:USER_ORGUNIT&dimension=pe:" + pe + "&displayProperty=NAME").subscribe((analyticsResults)=> {
          resolve({
            config:{
              title:dataElement.name,
              structure:[
                {
                  title:"Chart",
                  active:true,
                  'type': 'chart',
                  'config': {
                    'rows': ['pe'],
                    'columns': ['co']
                  }
                },
                {
                  title:"Table",
                  active:false,
                  'type': 'table',
                  'config': {
                    'rows': ['pe'],
                    'columns': ['co']
                  }
                }
              ]
            },
            analytics:analyticsResults.json()
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
