import { Component, OnInit,Input } from '@angular/core';
import { Ng2HighchartsModule } from 'ng2-highcharts';

@Component({
  selector: 'dhis2-visualizer',
  templateUrl: './dhis2-visualizer.component.html',
  styleUrls: ['./dhis2-visualizer.component.css']
})
export class Dhis2VisualizerComponent implements OnInit {

  showData= {
    title: {
      text: 'Monthly Average Temperature',
      x: -20 //center
    },
    /*subtitle: {
      text: 'Source: WorldClimate.com',
      x: -20
    },*/
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: 'Amount'
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    tooltip: {
      //valueSuffix: '°C'
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
    },
    series: []
  };

  @Input() data: any;

  constructor() { }

  ngOnInit() {
    this.showData.title.text = this.data.config.title;

    this.showData.xAxis.categories = this.data.analytics.metaData.pe;
    this.data.analytics.metaData.ou.forEach((ouId)=>{
      let serie = {
        name:this.data.analytics.metaData.names[ouId],
        data:[]
      }
      this.data.analytics.metaData.pe.forEach((p)=>{
        let value = 0.0
        this.data.analytics.rows.forEach((row)=>{
          if(row[2] == p && row[1] == ouId){
            value = parseFloat(row[3]);
          }
        });
        serie.data.push(value)
      })
      this.showData.series.push(serie);
    })
  }

}
