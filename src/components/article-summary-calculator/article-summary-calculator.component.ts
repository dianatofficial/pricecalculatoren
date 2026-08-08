/*
 * Copyright (c) 2024 Dianat | 0935 912 0880. All Rights Reserved.
 * This software is the confidential and proprietary information of Dianat.
 */
import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Option } from '../../models';
import { ResultComponent } from '../result/result.component';
import { LanguageService } from '../../services/language.service';

interface RawSummaryFieldGroup {
  key: string;
  labelEn: string;
  labelFa: string;
  basePrice: number;
  marketBasePrice: number;
}

@Component({
  selector: 'app-article-summary-calculator',
  templateUrl: './article-summary-calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ResultComponent],
})
export class ArticleSummaryCalculatorComponent {
  readonly langService = inject(LanguageService);

  selectedFieldKey = signal<string>('');
  summaryTypeMultiplier = signal<number>(0);
  numArticles = signal<number>(1);
  languageTaskMultiplier = signal<number>(0);
  timeMultiplier = signal<number>(0);

  rawSummaryFieldGroups: RawSummaryFieldGroup[] = [
    { key: 'humanities', labelEn: 'Humanities & Social Sciences', labelFa: 'علوم انسانی و اجتماعی', basePrice: 50_000, marketBasePrice: 62_500 },
    { key: 'management', labelEn: 'Management, Economics & Accounting', labelFa: 'مدیریت، اقتصاد و حسابداری', basePrice: 62_500, marketBasePrice: 80_000 },
    { key: 'engineering', labelEn: 'Engineering & Natural Sciences', labelFa: 'فنی-مهندسی و علوم پایه', basePrice: 87_500, marketBasePrice: 112_500 },
    { key: 'medical', labelEn: 'Medical & Life Sciences', labelFa: 'علوم پزشکی و زیستی', basePrice: 112_500, marketBasePrice: 137_500 },
  ];

  summaryFieldGroups = computed(() => {
    const isEn = this.langService.isEn();
    return this.rawSummaryFieldGroups.map(fg => ({
      key: fg.key,
      label: isEn ? fg.labelEn : fg.labelFa,
      basePrice: fg.basePrice,
      marketBasePrice: fg.marketBasePrice,
    }));
  });

  summaryTypes = computed<Option[]>(() => {
    const isEn = this.langService.isEn();
    return [
      { label: isEn ? 'Simple Summary (Key points)' : 'خلاصه ساده (نکات کلیدی)', value: 1.0 },
      { label: isEn ? 'Analytical Summary (Method, Results, Critique)' : 'خلاصه تحلیلی (روش، نتایج، نقد)', value: 1.4 },
      { label: isEn ? 'Class Presentation Summary (PowerPoint)' : 'خلاصه برای ارائه کلاسی (پاورپوینت)', value: 1.6 },
      { label: isEn ? 'Literature Review Note-taking (Matrix/Grid)' : 'فیش‌برداری (برای پیشینه پژوهش)', value: 1.8 },
    ];
  });

  languageTasks = computed<Option[]>(() => {
    const isEn = this.langService.isEn();
    return [
      { label: isEn ? 'Persian to Persian' : 'فارسی به فارسی', value: 1.0 },
      { label: isEn ? 'English to Persian (with translation)' : 'انگلیسی به فارسی (با ترجمه)', value: 1.5 },
      { label: isEn ? 'English to English (Specialized)' : 'انگلیسی به انگلیسی (تخصصی)', value: 1.8 },
    ];
  });

  deliveryTimes = computed<Option[]>(() => {
    const isEn = this.langService.isEn();
    return [
      { label: isEn ? 'Standard (3 to 7 days)' : 'عادی (۳ تا ۷ روز)', value: 1 },
      { label: isEn ? 'Urgent (Under 48 hours)' : 'فوری (زیر ۴۸ ساعت)', value: 1.5 },
      { label: isEn ? 'Super Urgent (Under 24 hours)' : 'خیلی فوری (زیر ۲۴ ساعت)', value: 2.0 },
    ];
  });

  ourBasePrice = computed(() => this.summaryFieldGroups().find(f => f.key === this.selectedFieldKey())?.basePrice ?? 0);
  marketBasePrice = computed(() => this.summaryFieldGroups().find(f => f.key === this.selectedFieldKey())?.marketBasePrice ?? 0);

  private areOptionsSelected = computed(() => 
    this.ourBasePrice() > 0 &&
    this.summaryTypeMultiplier() > 0 &&
    this.numArticles() > 0 &&
    this.languageTaskMultiplier() > 0 &&
    this.timeMultiplier() > 0
  );

  volumeDiscountPercent = computed(() => {
    const num = this.numArticles();
    if (num >= 21) return 15;
    if (num >= 11) return 10;
    if (num >= 6) return 5;
    return 0;
  });

  private calculatePrice = (basePrice: number): number => {
    if (!this.areOptionsSelected()) {
      return 0;
    }
    const baseForNArticles = basePrice * this.numArticles();

    const mainPrice = baseForNArticles * this.summaryTypeMultiplier();
    const languageSurcharge = baseForNArticles * (this.languageTaskMultiplier() - 1);
    const timeSurcharge = baseForNArticles * (this.timeMultiplier() - 1);

    const priceBeforeDiscount = mainPrice + languageSurcharge + timeSurcharge;
    const discountAmount = priceBeforeDiscount * (this.volumeDiscountPercent() / 100);

    return priceBeforeDiscount - discountAmount;
  }

  ourPrice = computed(() => this.calculatePrice(this.ourBasePrice()));

  marketPrice = computed(() => this.calculatePrice(this.marketBasePrice()));

  calculationBreakdown = computed(() => {
    if (!this.areOptionsSelected()) return [];

    const baseForNArticles = this.ourBasePrice() * this.numArticles();

    const mainPrice = baseForNArticles * this.summaryTypeMultiplier();
    const languageSurcharge = baseForNArticles * (this.languageTaskMultiplier() - 1);
    const timeSurcharge = baseForNArticles * (this.timeMultiplier() - 1);

    const t = this.langService.t();

    const breakdown = [
      { label: t.breakdownBasePriceForArticles(this.numArticles()), amount: mainPrice },
    ];
    
    if (languageSurcharge !== 0) {
      const label = this.languageTasks().find(item => item.value === this.languageTaskMultiplier())?.label ?? '';
      breakdown.push({ label: t.breakdownLanguageSurcharge(label), amount: languageSurcharge });
    }
    
    if (timeSurcharge !== 0) {
      const label = this.deliveryTimes().find(item => item.value === this.timeMultiplier())?.label ?? '';
      breakdown.push({ label: t.breakdownTimeSurcharge(label), amount: timeSurcharge });
    }

    const discountPercent = this.volumeDiscountPercent();
    if (discountPercent > 0) {
      const priceBeforeDiscount = mainPrice + languageSurcharge + timeSurcharge;
      const discountAmount = priceBeforeDiscount * (discountPercent / 100);
      breakdown.push({ label: t.breakdownVolumeDiscount(discountPercent), amount: -discountAmount });
    }

    return breakdown;
  });

  onFieldChange(event: Event) { this.selectedFieldKey.set((event.target as HTMLSelectElement).value); }
  onSummaryTypeChange(event: Event) { this.summaryTypeMultiplier.set(Number((event.target as HTMLSelectElement).value)); }
  onNumSourcesChange(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    this.numArticles.set(value > 0 ? value : 1);
  }
  onLanguageTaskChange(event: Event) { this.languageTaskMultiplier.set(Number((event.target as HTMLSelectElement).value)); }
  onTimeChange(event: Event) { this.timeMultiplier.set(Number((event.target as HTMLSelectElement).value)); }

  resetForm() {
    this.selectedFieldKey.set('');
    this.summaryTypeMultiplier.set(0);
    this.numArticles.set(1);
    this.languageTaskMultiplier.set(0);
    this.timeMultiplier.set(0);
  }
}