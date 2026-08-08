/*
 * Copyright (c) 2024 Dianat (dianatofficial) | 0935 912 0880. All Rights Reserved.
 * This software is the confidential and proprietary information of dianatofficial.
 */
import { Component, ChangeDetectionStrategy, input, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class ResultComponent {
  readonly langService = inject(LanguageService);
  price = input.required<number>();
  breakdown = input<{ label: string; amount: number }[]>([]);
  currency = input<string | null>(null);
  marketPrice = input<number | null>(null);
  onReset = output<void>();

  get displayCurrency(): string {
    return this.currency() ?? this.langService.t().currency;
  }

  reset() {
    this.onReset.emit();
  }
}
