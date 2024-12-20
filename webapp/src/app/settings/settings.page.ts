import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonInput,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { TariffService } from '../data/tariff.service';
import { Tariff } from 'core';

@Component({
  selector: 'app-settings.page',
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonInput,
    IonTitle,
    IonToolbar,
  ],
  templateUrl: './settings.page.html',
  styleUrl: './settings.page.scss',
})
export class SettingsPageComponent implements OnInit {
  constructor(private tariffService: TariffService) {}

  public tariff: Tariff | undefined;

  ngOnInit() {
    this.tariff = this.tariffService.getValue();
  }

  updateTariff() {
    if (this.tariff) {
      this.tariffService.setValue(this.tariff);
    }
  }
}
