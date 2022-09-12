import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Navigation } from '@angular/router';
import { Chart, ChartData, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
metrics: any;
losses: any;
nav: any;
metricsData : ChartData<'line'>;
lossesData: ChartData<'line'>;
chartOptions: ChartOptions = {
  responsive: true
};

  constructor(private router: Router) {
    this.nav= this.router.getCurrentNavigation();

    if (this.nav.extras && this.nav.extras.state && this.nav.extras.state.metrics) {
      this.metrics = this.nav.extras.state.metrics;
    }
      if (this.nav.extras && this.nav.extras.state && this.nav.extras.state.losses) {
        this.losses = this.nav.extras.state.losses;
    }

    let labels = [];
    let i = 0;
    for(i=0;i<this.metrics[0]['data'].length;i++)
    {
      labels.push(i);
    }

    this.metricsData = {
      labels: labels,
      datasets: this.metrics
    }
    this.lossesData = {
      labels: labels,
      datasets: this.losses
    }

   }

  ngOnInit(): void {
    console.log(this.metrics);
    console.log(this.losses);
  }

}
