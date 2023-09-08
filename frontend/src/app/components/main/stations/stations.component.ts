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
  styleUrls: ['./stations.component.scss', '../main.styles.scss'],
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

  ngOnInit(): void {}

  send() {
    console.log(0, this.stationForm.value);
    this.emitPath.emit({
      firstStation: this._firstStation?.value,
      lastStation: this._lastStation?.value,
    });
    this.stationForm.setValue({
      firstStation: '',
      lastStation: '',
    });
  }

  get _firstStation() {
    return this.stationForm.get('firstStation');
  }

  get _lastStation() {
    return this.stationForm.get('lastStation');
  }
}
