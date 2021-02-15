import { Component, OnInit } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { BaseChartDirective, Color } from "ng2-charts";
import * as annotations from "chartjs-plugin-annotation";
import { Chart } from "chart.js";
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  chart1;
  exist_x_min;
  exist_x_max;
  exist_y_min;
  exist_y_max;

  exist_x_min2;
  exist_x_max2;
  exist_y_min2;
  exist_y_max2;
  add_annotation = false;
  public lineChartData: ChartDataSets[] = [
    { data: [18, 48, 77, 9, 100, 27, 40], label: "Series A" }
  ];
  annotationsIds = [];
  selectedValue = null;
  public lineChartLabels: string[] = ["1", "2", "3", "4", "5", "6", "7"];
  public lineChartColors: Color[] = [
    {
      // grey
      backgroundColor: "rgba(148,159,177,0.2)",
      borderColor: "rgba(148,159,177,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    }
  ];
  public lineChartLegend = true;
  public lineChartType = "line";

  constructor() {
    BaseChartDirective.registerPlugin(annotations);
  }

  ngOnInit() {
    this.get_chart();
  }

  get_chart() {
    let that = this;
    this.chart1 = new Chart("canvas1", {
      type: this.lineChartType,
      data: {
        labels: this.lineChartLabels,
        datasets: [
          {
            data: [18, 48, 77, 9, 100, 27, 40],
            backgroundColor: this.lineChartColors,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        annotation: {
          events: ["click"],
          drawTime: "afterDatasetsDraw",
          annotations: [
            {
              type: "box",
              xScaleID: "x-axis-0",
              yScaleID: "y-axis-0",
              id: "annotation1",
              yMin: 60,
              yMax: 77,
              xMin: "1",
              xMax: "3",
              borderWidth: 1,
              backgroundColor: "yellow",
              borderColor: "yellow",
              onClick: function(e) {
                let element = this;
                console.log(element.options.id);
                that.selectedValue = element.options.id;
                that.exist_x_min = element.options.xMin;
                that.exist_x_max = element.options.xMax;
                that.exist_y_min = element.options.yMin;
                that.exist_y_max = element.options.yMax;
              }
            }
          ]
        }
      },
      legend: this.lineChartLegend
    });
    // this.get_select_list();
  }

  // get_select_list() {
  //   this.annotationsIds = this.chart1.options.annotation.annotations.map(
  //     e => e.id
  //   );
  // }

  display_new_annotation() {
    let len = this.chart1.options.annotation.annotations.length + 1;
    let annObj = {
      type: "box",
      xScaleID: "x-axis-0",
      yScaleID: "y-axis-0",
      id: "annotation" + len,
      yMin: this.exist_y_min2,
      yMax: this.exist_y_max2,
      xMin: this.exist_x_min2.toString(),
      xMax: this.exist_x_max2.toString(),
      borderWidth: 1,
      backgroundColor: "pink",
      borderColor: "pink",
      label: {
        fontSize: 16,
        fontColor: "black",
        content: "test label",
        enabled: true
      }
    };
    this.chart1.options.annotation.annotations.push(annObj);
    this.chart1.chart.update();
    //this.get_select_list();
    console.log(this.chart1.options.annotation.annotations);
    this.add_annotation = false;
    this.exist_x_min2 = null;
    this.exist_x_max2 = null;
    this.exist_y_min2 = null;
    this.exist_y_max2 = null;
  }

  add_new_annotation() {
    this.add_annotation = true;
  }

  getselectedValue() {
    console.log(this.selectedValue);
    let idGraphAnnoObj = this.chart1.options.annotation.annotations.filter(
      e => e.id == this.selectedValue
    );
    console.log(idGraphAnnoObj[0]);
    this.exist_x_min = idGraphAnnoObj[0].xMin;
    this.exist_x_max = idGraphAnnoObj[0].xMax;
    this.exist_y_min = idGraphAnnoObj[0].yMin;
    this.exist_y_max = idGraphAnnoObj[0].yMax;
  }

  add_y_axis() {
    console.log("added y_annotation");
    // this.y_min = 40;
    // this.y_max = 45;
    let indexAn = this.chart1.options.annotation.annotations.findIndex(
      e => e.id == this.selectedValue
    );
    console.log(this.chart1.options.annotation.annotations[indexAn].xMin);
    this.chart1.annotation.elements[
      this.chart1.options.annotation.annotations[indexAn].id
    ].options.xMin = this.exist_x_min.toString();
    this.chart1.annotation.elements[
      this.chart1.options.annotation.annotations[indexAn].id
    ].options.xMax = this.exist_x_max.toString();
    this.chart1.annotation.elements[
      this.chart1.options.annotation.annotations[indexAn].id
    ].options.yMin = +this.exist_y_min;
    this.chart1.annotation.elements[
      this.chart1.options.annotation.annotations[indexAn].id
    ].options.yMax = +this.exist_y_max;
    this.chart1.chart.update();

    console.log(this.chart1.options.annotation.annotations[indexAn]);
  }
  // events
  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
