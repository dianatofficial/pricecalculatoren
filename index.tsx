/*
 * Copyright (c) 2024 Dianat (dianatofficial) | 0935 912 0880. All Rights Reserved.
 * This software is developed and maintained by dianatofficial.
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './src/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection()
  ]
}).catch(err => console.error(err));
