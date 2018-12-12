import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ns-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  moduleId: module.id,
})
export class FormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public doCurrentLocationtoAddress() {
    this.directions.navigate({
      to: {
        address: "Hof der Kolommen 34, Amersfoort, Netherlands"
      },
      type: "transit"
    }).then(() => {
      console.log("Current location to job address directions launched!");
    }, (err) => {
      alert(err);
    })
  }
}
