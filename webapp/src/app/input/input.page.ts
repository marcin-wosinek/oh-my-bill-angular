import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonInput,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-input.page',
  imports: [
    CommonModule,
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonModal,
    IonTitle,
    IonToolbar,
    IonDatetimeButton,
    IonDatetime,
  ],
  templateUrl: './input.page.html',
  styleUrl: './input.page.scss',
})
export class InputPageComponent {}
