import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TariffService } from '../data/tariff.service';

@Component({
  selector: 'app-settings.page',
  imports: [CommonModule],
  templateUrl: './settings.page.html',
  styleUrl: './settings.page.scss',
})
export class SettingsPageComponent {
  constructor(private tariffService: TariffService) {}
}
