import {Resource} from "./resource";
import {Indicator} from "./indicator";
export class ValidationRule extends Resource{
  tabs = [{
    title: "Detail Info",
    active: true,
    type: "info",
    properties: {
      transform: {
        rightSide: 'loadExpresion',
        leftSide: 'loadExpresion'
      }
    }
  },
    {
      title: "Analytics Info",
      active: false,
      type: 'chat',
      config: {}
    }];
  loadExpresion(object){
    console.log(object);
    return new Promise((resolve, reject)=> {
      let indicator = new Indicator(this.http);
      indicator.loadExpression(object.expression).then((expression)=>{
        object.expression = expression;
        resolve(object.expression)
      },(error)=>{
        reject(error);
      })
    })
  }
}
