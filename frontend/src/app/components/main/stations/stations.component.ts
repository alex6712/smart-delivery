import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss'],
})
export class StationsComponent implements OnInit {
  stationForm: FormGroup;

  @Input()
  stations: any[] = [];

  @Output()
  emitPath = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.stationForm = new FormGroup({
      firstStation: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastStation: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  ngOnInit(): void {
    console.log(this._firstStation);
  }

  send() {
    console.log(this.stationForm.controls);
    this.emitPath.emit({
      firstStation: this._firstStation,
      lastStation: this._lastStation,
    });
  }

  get _firstStation() {
    return this.stationForm.get('firstStation');
  }

  get _lastStation() {
    return this.stationForm.get('lastStation');
  }
}
