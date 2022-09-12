import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Chart, ChartData, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user : any;
  barData: ChartData<'bar'>={
    labels: ["Task1","Task2","Task3","Task4","Task5"],
    datasets:[
      { label: 'Ram%',
        backgroundColor: [
        'rgb(251,141,82)',
        'rgb(72,207,174)',
        'rgb(236,135,191)',
        'rgb(255,206,85)'
    ],
        data: [10,30,20,25,15]
      }
    ]
  }
  barData2: ChartData<'bar'>={
    labels: ["Obj1","Obj2","Obj3","Obj4","Obj5"],
    datasets:[
      { label: 'Collisions',
        backgroundColor: [
        'rgb(251,141,82)',
        'rgb(72,207,174)',
        'rgb(236,135,191)',
        'rgb(255,206,85)'
    ],
        data: [90,45,110,130,200]
      }
    ]
  }
  salesData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      { label: 'Mobiles', data: [1000, 1200, 1050, 2000, 500], tension: 0.5 },
      { label: 'Laptop', data: [200, 100, 400, 50, 90], tension: 0.5 },
      { label: 'AC', data: [500, 400, 350, 450, 650], tension: 0.5 },
      { label: 'Headset', data: [1200, 1500, 1020, 1600, 900], tension: 0.5 },
    ],
  };

  lineData: ChartData<'line'> = {
    labels: [0,10,20,30,40,50,60,70,80,90],
      datasets: [{ 
          data: [86,114,106,106,107,111,133,221,783,2478],
          label: "Task1",
          borderColor: "rgb(251,141,82)",
          fill: false
        }, { 
          data: [282,350,411,502,635,809,947,1402,3700,5267],
          label: "Task2",
          borderColor: "rgb(72,207,174)",
          fill: false
        }, { 
          data: [168,170,178,190,203,276,408,547,675,734],
          label: "Task3",
          borderColor: "rgb(236,135,191)",
          fill: false
        }, { 
          data: [40,20,10,16,24,38,74,167,508,784],
          label: "Task4",
          borderColor: "rgb(255,206,85)",
          fill: false
        }
      ]
  }
  chartOptions: ChartOptions = {
    responsive: true
  };

  constructor(private router: Router, private route: ActivatedRoute) { 
    this.user = localStorage.getItem('user')
  }

  ngOnInit(): void {
  }

}
