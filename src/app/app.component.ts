import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'reactive_form';
  inputString = 'It is parent component';

  ngOnInit(): void {}

  getData(value: string) {
    console.log('Value From :' + value);
  }
}
