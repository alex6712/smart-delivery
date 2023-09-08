import { Component, OnInit } from '@angular/core';

export interface Path {
  firstStation: string;
  lastStation: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  stations: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  setPath(path: Path) {
    console.log(1, path);
  }
}
