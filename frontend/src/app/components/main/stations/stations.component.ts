import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss', '../main.styles.scss'],
})
export class StationsComponent implements OnInit {
  stationForm: UntypedFormGroup;

  @Input()
  stations: any[] = [];

  @Output()
  emitPath = new EventEmitter();

  constructor(private fb: UntypedFormBuilder) {
    this.stationForm = new UntypedFormGroup({
      firstStation: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastStation: new UntypedFormControl('', [
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
