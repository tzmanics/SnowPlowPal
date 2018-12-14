import { Component, OnInit } from '@angular/core';
import { Directions } from 'nativescript-directions';
import * as imagepicker from 'nativescript-imagepicker';

@Component({
  selector: 'ns-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  moduleId: module.id,
})
export class FormComponent implements OnInit {
  public onSelectMultipleTap() {
    let context = imagepicker.create({
        mode: "multiple"
    });
    this.isSingleMode = false;
    this.startSelection(context);
  }

  public onSelectSingleTap() {
    let context = imagepicker.create({
        mode: "single"
    });
    this.isSingleMode = true;
    this.startSelection(context);
  }

  private startSelection(context) {
    let that = this;

    context.authorize().then(() => {
      that.imageAssets = [];
      that.imageSrc = null;
      return context.present();
    }).then((selection) => {
      console.log("Selection done: " + JSON.stringify(selection));
      that.imageSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;

      // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
      selection.forEach(function (element) {
        element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
        element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
      });
      that.imageAssets = selection;
    }).catch(function (e) {
        console.log(e);
    });
  }

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

public ngAfterViewInit() {
    this.pad = this.drawingPad.nativeElement;
}

public send() {
    this.pad.getDrawing().then(data => {
        let image = ImageSource.fromNativeSource(data);
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });
        let body = {
            "signature": image.toBase64String("png", 70)
        };
        this.http.post("http://example.com", JSON.stringify(body), options)
            .subscribe(result => {
                // Uploaded signature as a base64 string
            }, error => {
                console.dir(error);
            });
    }, error => {
        console.dir(error);
    });
}

public reset() {
    this.pad.clearDrawing();
}
