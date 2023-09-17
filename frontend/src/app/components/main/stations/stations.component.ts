import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export interface DelivMethod {
  title: string;
  value: string;
}

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss', '../main.styles.scss'],
})
export class StationsComponent implements OnInit {
  stationForm: FormGroup;

  @Input()
  stations: { firstStation: string; lastStation: string };

  @Output()
  emitPath = new EventEmitter();

  allDeliveryMethods: DelivMethod[] = [
    {
      title: 'Автомобиль',
      value: 'auto',
    },
    {
      title: 'Железная дорога',
      value: 'trailway',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.stationForm = new FormGroup({
      firstStation: new FormControl('Академика Сахарова, 105', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastStation: new FormControl('Максима Горького, 250', [
        Validators.required,
        Validators.minLength(3),
      ]),
      deliveryMethod: new FormControl(this.allDeliveryMethods[0].value, [
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {}

  send() {
    this.emitPath.emit({
      firstStation: this._firstStation?.value,
      lastStation: this._lastStation?.value,
      deliveryMethod: this._deliveryMethod?.value,
    });
    this.stationForm.setValue({
      firstStation: '',
      lastStation: '',
      deliveryMethod: this.allDeliveryMethods[0].value,
    });
  }

  clearForm(str: string) {
    this.stationForm.patchValue({
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

  get _deliveryMethod() {
    return this.stationForm.get('deliveryMethod');
  }
}
