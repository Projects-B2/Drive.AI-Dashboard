import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormArray, Validators, FormBuilder } from "@angular/forms";
import { TrainService } from '../train.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  dataForm: FormGroup;
  isTraining: boolean;
  Metrics: Array<any> = [
    { name: 'Precision',    value: '   metrics/precision' },
    { name: 'Recall',       value: '      metrics/recall' },
    { name: 'MAP 0.5',      value: '     metrics/mAP_0.5' },
    { name: 'MAP 0.5:0.95', value: 'metrics/mAP_0.5:0.95' }
  ];

  Losses: Array<any> = [
    { name: 'TrainBox Loss',    value: '      train/box_loss' },
    { name: 'Train Object Loss',       value: '      train/obj_loss' },
    { name: 'ValBox Loss',      value: '        val/box_loss' },
    { name: 'Val Object Loss', value: '        val/obj_loss' }
  ]
  constructor(private fb: FormBuilder,private trainService: TrainService, private router: Router, private route: ActivatedRoute,) {
    this.isTraining = false;
    this.dataForm = this.fb.group({
      dataset: ['',[Validators.required]],
      epochs: ['',[Validators.required, Validators.min(1)]],
      validation: ['',[Validators.required, Validators.min(1)]],
      metrics: this.fb.array([], [Validators.required]),
      loss: this.fb.array([], [Validators.required])

    })
   }

  ngOnInit(): void {
  }

  onMetricsChange(e: any) {
    const checkArray: FormArray = this.dataForm.get('metrics') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


  onLossChange(e: any) {
    const checkArray: FormArray = this.dataForm.get('loss') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }



  submit(form: FormGroup)
  {
    console.log(this.dataForm.value);
    if(this.dataForm.valid)
    {
      var dataset = this.dataForm.value.dataset;
      var epochs = this.dataForm.value.epochs;
      var validation = this.dataForm.value.validationl;
      var metrics = this.dataForm.value.metrics.join(",");
      var losses = this.dataForm.value.loss.join(",");
      console.log(metrics);
      console.log(losses);
      this.isTraining = true;
      this.trainService.train(dataset,epochs,metrics,losses).subscribe((apiData : any) =>{
        console.log(apiData);
        var temp = [];
        var temp1 = [];
        for (let d in apiData['metrics']){
        console.log(d)
 	      temp.push({label : apiData['metrics'][d]['label'],data : apiData['metrics'][d]['data']});
      }

        for (let d in apiData['losses']){
	      temp1.push({label : apiData['losses'][d]['label'],data : apiData['losses'][d]['data']})	;
        }
        
        console.log(temp);
        console.log(temp1);
        this.router.navigate(['/graphs'], {state: {metrics: temp, losses: temp1}});

      })
    }
  }

}
