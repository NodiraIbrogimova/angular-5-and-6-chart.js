import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  chart = [];

  constructor(private _weather: WeatherService) { }

  ngOnInit() {
    this._weather.dailyForecast().subscribe(res => {
      const temp_max = res['list'].map(res => res.main.temp_max);
      const temp_min = res['list'].map(res => res.main.temp_min);
      const allDates = res['list'].map(res => res.dt);
      const weatherDates = [];
      allDates.forEach((res) => {
        const jsDate = new Date(res * 1000);
        weatherDates.push(jsDate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: temp_max,
                borderColor: "green",
                fill: false
              },
              {
                data: temp_min,
                borderColor: "blue",
                fill: false
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });
      });
      console.log(res);

    });

  }

}
