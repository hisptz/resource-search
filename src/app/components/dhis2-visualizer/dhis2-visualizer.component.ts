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
    subtitle: {
      text: 'Source: WorldClimate.com',
      x: -20
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: 'Temperature (°C)'
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    tooltip: {
      valueSuffix: '°C'
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
  @Input() config: any;

  constructor() { }

  ngOnInit() {
    this.showData.xAxis.categories = this.data.metaData.pe;
    this.data.metaData.ou.forEach((ouId)=>{
      let serie = {
        name:this.data.metaData.names[ouId],
        data:[]
      }
      this.data.metaData.pe.forEach((p)=>{
        let value = 0.0
        this.data.rows.forEach((row)=>{
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
