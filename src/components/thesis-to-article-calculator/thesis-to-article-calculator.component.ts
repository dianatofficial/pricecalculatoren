/*
 * Copyright (c) 2024 Dianat | 0935 912 0880. All Rights Reserved.
 * This software is the confidential and proprietary information of Dianat.
 */
import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Option } from '../../models';
import { ResultComponent } from '../result/result.component';
import { LanguageService } from '../../services/language.service';

interface ArticleLevel {
  key: string;
  labelEn: string;
  labelFa: string;
  marketPriceRange: [number, number];
  ourPriceRange: [number, number];
}

interface RawField {
  key: string;
  labelEn: string;
  labelFa: string;
  value: number;
}

@Component({
  selector: 'app-thesis-to-article-calculator',
  templateUrl: './thesis-to-article-calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ResultComponent],
})
export class ThesisToArticleCalculatorComponent {
  readonly langService = inject(LanguageService);

  selectedFieldKey = signal<string>('');
  selectedArticleLevelKey = signal<string>('');
  timeMultiplier = signal<number>(0);

  rawFields: RawField[] = [
    { key: 'humanities', labelEn: 'Humanities & Social Sciences', labelFa: 'علوم انسانی', value: 1.0 },
    { key: 'accounting', labelEn: 'Accounting / Finance / Management', labelFa: 'حسابداری/مالی', value: 1.2 },
    { key: 'engineering', labelEn: 'Engineering & Natural Sciences', labelFa: 'فنی مهندسی و علوم پایه', value: 1.4 },
    { key: 'medical', labelEn: 'Medical / Pharmacy / Life Sciences', labelFa: 'پزشکی/داروسازی/علوم زیستی', value: 1.6 },
  ];

  fields = computed(() => {
    const isEn = this.langService.isEn();
    return this.rawFields.map(f => ({
      key: f.key,
      label: isEn ? f.labelEn : f.labelFa,
      value: f.value,
    }));
  });

  rawArticleLevels: ArticleLevel[] = [
    { key: 'conf-domestic', labelEn: 'National Conference / Class Paper', labelFa: 'کنفرانس داخلی / مقاله کلاسی', marketPriceRange: [600_000, 1_000_000], ourPriceRange: [450_000, 750_000] },
    { key: 'conf-international', labelEn: 'International Conference / Review Paper', labelFa: 'کنفرانس بین‌المللی / ترویجی', marketPriceRange: [1_100_000, 1_800_000], ourPriceRange: [850_000, 1_400_000] },
    { key: 'research-domestic', labelEn: 'National Research Journal', labelFa: 'علمی پژوهشی (داخلی)', marketPriceRange: [1_500_000, 2_400_000], ourPriceRange: [1_200_000, 1_800_000] },
    { key: 'isc', labelEn: 'ISC Indexed', labelFa: 'ISC', marketPriceRange: [2_200_000, 3_200_000], ourPriceRange: [1_700_000, 2_500_000] },
    { key: 'isi-q4', labelEn: 'ISI/Scopus (Q4)', labelFa: 'ISI/Scopus (Q4)', marketPriceRange: [2_800_000, 4_500_000], ourPriceRange: [2_200_000, 3_500_000] },
    { key: 'isi-q3', labelEn: 'ISI/Scopus (Q3)', labelFa: 'ISI/Scopus (Q3)', marketPriceRange: [3_800_000, 5_800_000], ourPriceRange: [2_900_000, 4_500_000] },
    { key: 'isi-q2', labelEn: 'ISI/Scopus (Q2)', labelFa: 'ISI/Scopus (Q2)', marketPriceRange: [4_800_000, 7_200_000], ourPriceRange: [3_800_000, 5_500_000] },
    { key: 'isi-q1', labelEn: 'ISI/Scopus (Q1)', labelFa: 'ISI/Scopus (Q1)', marketPriceRange: [6_800_000, 11_000_000], ourPriceRange: [5_400_000, 8_500_000] },
  ];

  articleLevels = computed(() => {
    const isEn = this.langService.isEn();
    return this.rawArticleLevels.map(al => ({
      key: al.key,
      label: isEn ? al.labelEn : al.labelFa,
      marketPriceRange: al.marketPriceRange,
      ourPriceRange: al.ourPriceRange,
    }));
  });
  
  deliveryTimes = computed<Option[]>(() => {
    const isEn = this.langService.isEn();
    return [
      { label: isEn ? 'Standard (2 to 3 months)' : 'عادی (۲ تا ۳ ماه)', value: 1 },
      { label: isEn ? 'Semi-Urgent (1 month)' : 'نیمه‌فوری (۱ ماه)', value: 1.3 },
      { label: isEn ? 'Urgent (Under 2 weeks)' : 'فوری (زیر ۲ هفته)', value: 1.6 },
    ];
  });

  selectedArticleLevel = computed(() => this.articleLevels().find(a => a.key === this.selectedArticleLevelKey()));
  fieldMultiplier = computed(() => this.fields().find(f => f.key === this.selectedFieldKey())?.value ?? 0);
  
  private complexityFactor = computed(() => {
    if(this.fieldMultiplier() === 0 || this.timeMultiplier() === 0) return 0;
    return this.fieldMultiplier() * this.timeMultiplier();
  });

  private normalizedComplexity = computed(() => {
    if(this.complexityFactor() === 0) return 0;
    const minComplexity = 1.0; // humanities * normal time
    const maxComplexity = 1.6 * 1.6; // medical * urgent time
    if (maxComplexity === minComplexity) return 0.5; // Avoid division by zero
    return (this.complexityFactor() - minComplexity) / (maxComplexity - minComplexity);
  });

  private interpolatePrice(range: [number, number] | undefined): number {
    if (!range) return 0;
    const [min, max] = range;
    return min + this.normalizedComplexity() * (max - min);
  }

  marketPrice = computed(() => {
    if (!this.selectedArticleLevel()) return 0;
    const rawPrice = this.interpolatePrice(this.selectedArticleLevel()?.marketPriceRange);
    if (rawPrice === 0) return 0;
    return Math.round(rawPrice / 10000) * 10000;
  });

  ourPrice = computed(() => {
    if (!this.selectedArticleLevel()) return 0;
    const rawPrice = this.interpolatePrice(this.selectedArticleLevel()?.ourPriceRange);
    if (rawPrice === 0) return 0;
    return Math.round(rawPrice / 10000) * 10000;
  });

  onFieldChange(event: Event) { this.selectedFieldKey.set((event.target as HTMLSelectElement).value); }
  onArticleLevelChange(event: Event) { this.selectedArticleLevelKey.set((event.target as HTMLSelectElement).value); }
  onTimeChange(event: Event) { this.timeMultiplier.set(Number((event.target as HTMLSelectElement).value)); }

  resetForm() {
    this.selectedFieldKey.set('');
    this.selectedArticleLevelKey.set('');
    this.timeMultiplier.set(0);
  }
}