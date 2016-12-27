import {HttpClientService} from "../services/http-client.service";

export class Resource {

  tabs = [
    {
      title: "Detail Info",
      active: true,
      type: "info"
    }
  ];
  cst = {
    formulaPattern: /#\{.+?\}/g,
    constantPattern: /C\{.+?\}/g,
    separator: "."
  }

  constructor(protected http:HttpClientService) {
  }

  getFetchingPeriods(period) {
    let pe = "";
    let date = new Date();
    console.log("Period:", period);
    if (period == "Daily") {
      for (let i = 0; i < 30; i++) {
        if (i > 0) {
          pe += ";";
        }
        let day = date.getDate();
        let dayS = "";
        if (day < 10) {
          dayS = "0" + day;
        }else{
          dayS = "" + day;
        }
        let month = date.getMonth() + 1;
        let monthS = "";
        if (month < 10) {
          monthS = "0" + month;
        }else{
          monthS = "" + month;
        }
        pe += "" + date.getFullYear() + monthS + dayS;
        date.setDate(date.getDate() - 1);
      }
      console.log(pe);
    }
    else if (period == "Weekly") {
      for (let i = 0; i < 6; i++) {
        if (i > 0) {
          pe += ";";
        }

        pe += date.getFullYear() + "W" + this.getWeekNumber(date);
        date.setDate(date.getDate() - 7);
      }
    }
    else if (period == "Monthly") {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      for (let i = 0; i < 6; i++) {
        if (i > 0) {
          pe += ";";
        }
        let calculatedMonth = month;
        let calculatedMonthS = "";
        if (calculatedMonth < 10) {
          calculatedMonthS = "0" + calculatedMonth;
        }else{
          calculatedMonthS = "" + calculatedMonth;
        }
        pe += year + "" + calculatedMonthS;
        month--;
        if (month == 0) {
          month = 12;
          year--;
        }
      }
    }
    else if (period == "Bi-monthly") {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let bimonth = month / 2;
      for (let i = 0; i < 6; i++) {
        if (i > 0) {
          pe += ";";
        }
        let calculatedMonth = bimonth;
        let calculatedMonthS = "";
        if (calculatedMonth < 10) {
          calculatedMonthS = "0" + calculatedMonth;
        }else{
          calculatedMonthS = "" + calculatedMonth;
        }
        pe += year + "" + calculatedMonthS + "B";
        bimonth--;
        bimonth--;
        if (bimonth <= 0) {
          bimonth = 12 + bimonth;
          year--;
        }
      }
    }
    else if (period == "Quarterly") {
      let year = date.getFullYear();
      let month = date.getMonth() + 2;
      let quarter = Math.ceil(month / 4);
      for (let i = 0; i < 6; i++) {
        if (i > 0) {
          pe += ";";
        }
        pe += year + "Q" + quarter;
        quarter--;
        if (quarter == 0) {
          quarter = 4;
          year--;
        }
      }
    }
    else if (period == "Six-monthly") {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let sixMonthly = Math.ceil(month / 6);
      for (let i = 0; i < 6; i++) {
        if (i > 0) {
          pe += ";";
        }
        pe += year + "S" + sixMonthly;
        sixMonthly--;
        if (sixMonthly == 0) {
          sixMonthly = 2;
          year--;
        }
      }
    }
    else {
      let year = date.getFullYear();
      for (let i = 0; i < 6; i++) {
        if (i > 0) {
          pe += ";";
        }
        pe += year;
        year--;
      }
    }
    return pe;
  }

  getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0, 0, 0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    // Get first day of year
    let yearStart = new Date(d.getFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    return "" + Math.ceil(( ( (d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }
}
