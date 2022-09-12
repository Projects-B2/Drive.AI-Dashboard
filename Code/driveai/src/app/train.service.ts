import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TrainService {
  private apiUrl = "/api/"

  constructor(private http: HttpClient) { }
  train(dataset: string, epochs: number,  metrics: string, losses: string) {
    return this.http.post(this.apiUrl+`train/`, { "datasetName": dataset, "epochs": epochs, 'from_scratch': 0, 'metrics': metrics, 'losses': losses});

  }
  }
