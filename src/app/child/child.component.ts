import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit {
  @Input() myInput!: string;

  //------------Output Decoratore------------//
  @Output() myOutput: EventEmitter<string> = new EventEmitter();
  outputString = 'It is child component';

  constructor() {}

  ngOnInit(): void {
    console.log(this.myInput);
  }

  sendToParent() {
    this.myOutput.emit(this.outputString);
  }
}
