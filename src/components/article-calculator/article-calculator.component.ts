/*
 * Copyright (c) 2024 Dianat | 0935 912 0880. All Rights Reserved.
 * This software is the confidential and proprietary information of Dianat.
 */
import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Option } from '../../models';
import { ResultComponent } from '../result/result.component';
import { LanguageService } from '../../services/language.service';

interface ArticleType {
  key: string;
  labelEn: string;
  labelFa: string;
  basePrice: number;
  marketBasePrice: number;
}

interface ArticleFieldGroup {
  key: string;
  labelEn: string;
  labelFa: string;
  articleTypes: ArticleType[];
}

@Component({
  selector: 'app-article-calculator',
  templateUrl: './article-calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ResultComponent],
})
export class ArticleCalculatorComponent {
  readonly langService = inject(LanguageService);

  selectedFieldKey = signal<string>('');
  selectedArticleTypeKey = signal<string>('');
  languageMultiplier = signal<number>(0);
  timeMultiplier = signal<number>(0);

  rawArticleFieldGroups: ArticleFieldGroup[] = [
    {
      key: 'humanities',
      labelEn: 'Humanities & Social Sciences',
      labelFa: 'علوم انسانی و علوم اجتماعی',
      articleTypes: [
        { key: 'class', labelEn: 'Class Paper / Student Research', labelFa: 'مقاله کلاسی / تحقیق دانشجویی', basePrice: 1_500_000, marketBasePrice: 1_800_000 },
        { key: 'conf-domestic', labelEn: 'National Conference', labelFa: 'کنفرانس داخلی', basePrice: 3_000_000, marketBasePrice: 3_600_000 },
        { key: 'conf-international', labelEn: 'International Conference', labelFa: 'کنفرانس بین‌المللی', basePrice: 5_000_000, marketBasePrice: 6_000_000 },
        { key: 'review', labelEn: 'Review Paper', labelFa: 'علمی–ترویجی / مروری', basePrice: 4_000_000, marketBasePrice: 4_800_000 },
        { key: 'research-domestic', labelEn: 'National Research Journal', labelFa: 'علمی–پژوهشی داخلی', basePrice: 5_000_000, marketBasePrice: 6_500_000 },
        { key: 'isc', labelEn: 'ISC Indexed', labelFa: 'ISC', basePrice: 7_000_000, marketBasePrice: 8_500_000 },
        { key: 'isi-q4', labelEn: 'ISI/Scopus (Q4)', labelFa: 'ISI/Scopus (Q4)', basePrice: 10_000_000, marketBasePrice: 12_000_000 },
        { key: 'isi-q3', labelEn: 'ISI/Scopus (Q3)', labelFa: 'ISI/Scopus (Q3)', basePrice: 12_000_000, marketBasePrice: 15_000_000 },
        { key: 'isi-q2', labelEn: 'ISI/Scopus (Q2)', labelFa: 'ISI/Scopus (Q2)', basePrice: 16_000_000, marketBasePrice: 20_000_000 },
        { key: 'isi-q1', labelEn: 'ISI/Scopus (Q1)', labelFa: 'ISI/Scopus (Q1)', basePrice: 20_000_000, marketBasePrice: 25_000_000 },
      ]
    },
    {
      key: 'management',
      labelEn: 'Management, Economics & Accounting',
      labelFa: 'مدیریت، اقتصاد و حسابداری',
      articleTypes: [
        { key: 'class', labelEn: 'Class Paper / Student Research', labelFa: 'مقاله کلاسی / تحقیق دانشجویی', basePrice: 1_800_000, marketBasePrice: 2_200_000 },
        { key: 'conf-domestic', labelEn: 'National Conference', labelFa: 'کنفرانس داخلی', basePrice: 3_500_000, marketBasePrice: 4_200_000 },
        { key: 'conf-international', labelEn: 'International Conference', labelFa: 'کنفرانس بین‌المللی', basePrice: 6_000_000, marketBasePrice: 7_500_000 },
        { key: 'review', labelEn: 'Review Paper', labelFa: 'علمی–ترویجی / مروری', basePrice: 4_500_000, marketBasePrice: 5_500_000 },
        { key: 'research-domestic', labelEn: 'National Research Journal', labelFa: 'علمی–پژوهشی داخلی', basePrice: 6_000_000, marketBasePrice: 7_500_000 },
        { key: 'isc', labelEn: 'ISC Indexed', labelFa: 'ISC', basePrice: 8_000_000, marketBasePrice: 10_000_000 },
        { key: 'isi-q4', labelEn: 'ISI/Scopus (Q4)', labelFa: 'ISI/Scopus (Q4)', basePrice: 12_000_000, marketBasePrice: 15_000_000 },
        { key: 'isi-q3', labelEn: 'ISI/Scopus (Q3)', labelFa: 'ISI/Scopus (Q3)', basePrice: 15_000_000, marketBasePrice: 19_000_000 },
        { key: 'isi-q2', labelEn: 'ISI/Scopus (Q2)', labelFa: 'ISI/Scopus (Q2)', basePrice: 20_000_000, marketBasePrice: 25_000_000 },
        { key: 'isi-q1', labelEn: 'ISI/Scopus (Q1)', labelFa: 'ISI/Scopus (Q1)', basePrice: 25_000_000, marketBasePrice: 32_000_000 },
      ]
    },
    {
      key: 'engineering',
      labelEn: 'Engineering & Natural Sciences',
      labelFa: 'فنی–مهندسی و علوم پایه',
      articleTypes: [
        { key: 'class', labelEn: 'Class Paper / Student Research', labelFa: 'مقاله کلاسی / تحقیق دانشجویی', basePrice: 2_500_000, marketBasePrice: 3_000_000 },
        { key: 'conf-domestic', labelEn: 'National Conference', labelFa: 'کنفرانس داخلی', basePrice: 4_000_000, marketBasePrice: 5_000_000 },
        { key: 'conf-international', labelEn: 'International Conference', labelFa: 'کنفرانس بین‌المللی', basePrice: 8_000_000, marketBasePrice: 10_000_000 },
        { key: 'review', labelEn: 'Review Paper', labelFa: 'علمی–ترویجی / مروری', basePrice: 5_000_000, marketBasePrice: 6_500_000 },
        { key: 'research-domestic', labelEn: 'National Research Journal', labelFa: 'علمی–پژوهشی داخلی', basePrice: 7_000_000, marketBasePrice: 9_000_000 },
        { key: 'isc', labelEn: 'ISC Indexed', labelFa: 'ISC', basePrice: 10_000_000, marketBasePrice: 12_500_000 },
        { key: 'isi-q4', labelEn: 'ISI/Scopus (Q4)', labelFa: 'ISI/Scopus (Q4)', basePrice: 15_000_000, marketBasePrice: 19_000_000 },
        { key: 'isi-q3', labelEn: 'ISI/Scopus (Q3)', labelFa: 'ISI/Scopus (Q3)', basePrice: 20_000_000, marketBasePrice: 25_000_000 },
        { key: 'isi-q2', labelEn: 'ISI/Scopus (Q2)', labelFa: 'ISI/Scopus (Q2)', basePrice: 25_000_000, marketBasePrice: 32_000_000 },
        { key: 'isi-q1', labelEn: 'ISI/Scopus (Q1)', labelFa: 'ISI/Scopus (Q1)', basePrice: 35_000_000, marketBasePrice: 45_000_000 },
      ]
    },
    {
      key: 'medical',
      labelEn: 'Medical & Biological Sciences',
      labelFa: 'علوم پزشکی و زیستی',
      articleTypes: [
        { key: 'class', labelEn: 'Class Paper / Student Research', labelFa: 'مقاله کلاسی / تحقیق دانشجویی', basePrice: 3_000_000, marketBasePrice: 3_700_000 },
        { key: 'conf-domestic', labelEn: 'National Conference', labelFa: 'کنفرانس داخلی', basePrice: 5_000_000, marketBasePrice: 6_200_000 },
        { key: 'conf-international', labelEn: 'International Conference', labelFa: 'کنفرانس بین‌المللی', basePrice: 9_000_000, marketBasePrice: 11_500_000 },
        { key: 'review', labelEn: 'Systematic Review & Meta-Analysis', labelFa: 'مرور سیستماتیک و متاآنالیز', basePrice: 8_000_000, marketBasePrice: 10_000_000 },
        { key: 'research-domestic', labelEn: 'National Research Journal', labelFa: 'علمی–پژوهشی داخلی', basePrice: 8_000_000, marketBasePrice: 10_000_000 },
        { key: 'isc', labelEn: 'ISC Indexed', labelFa: 'ISC', basePrice: 12_000_000, marketBasePrice: 15_000_000 },
        { key: 'isi-q4', labelEn: 'ISI/Scopus (Q4)', labelFa: 'ISI/Scopus (Q4)', basePrice: 18_000_000, marketBasePrice: 22_000_000 },
        { key: 'isi-q3', labelEn: 'ISI/Scopus (Q3)', labelFa: 'ISI/Scopus (Q3)', basePrice: 24_000_000, marketBasePrice: 30_000_000 },
        { key: 'isi-q2', labelEn: 'ISI/Scopus (Q2)', labelFa: 'ISI/Scopus (Q2)', basePrice: 30_000_000, marketBasePrice: 38_000_000 },
        { key: 'isi-q1', labelEn: 'ISI/Scopus (Q1)', labelFa: 'ISI/Scopus (Q1)', basePrice: 45_000_000, marketBasePrice: 55_000_000 },
      ]
    },
  ];

  articleFieldGroups = computed(() => {
    const isEn = this.langService.isEn();
    return this.rawArticleFieldGroups.map(fg => ({
      key: fg.key,
      label: isEn ? fg.labelEn : fg.labelFa,
      articleTypes: fg.articleTypes.map(at => ({
        key: at.key,
        label: isEn ? at.labelEn : at.labelFa,
        basePrice: at.basePrice,
        marketBasePrice: at.marketBasePrice,
      })),
    }));
  });

  articleLanguages = computed<Option[]>(() => {
    const isEn = this.langService.isEn();
    return [
      { label: isEn ? 'Persian' : 'فارسی', value: 1 },
      { label: isEn ? 'English (Translation & Editing)' : 'انگلیسی (ترجمه و ویرایش)', value: 1.3 },
      { label: isEn ? 'English (Direct Authoring)' : 'انگلیسی (نگارش مستقیم)', value: 1.6 },
    ];
  });

  deliveryTimes = computed<Option[]>(() => {
    const isEn = this.langService.isEn();
    return [
      { label: isEn ? 'Urgent (Under 1 week)' : 'فوری (زیر ۱ هفته)', value: 1.8 },
      { label: isEn ? 'Fast (1 to 2 weeks)' : 'سریع (۱ تا ۲ هفته)', value: 1.5 },
      { label: isEn ? 'Standard (3 to 6 weeks)' : 'عادی (۳ تا ۶ هفته)', value: 1.2 },
      { label: isEn ? 'Relaxed (Over 6 weeks)' : 'بدون عجله (بیش از ۶ هفته)', value: 1 },
    ];
  });

  selectedFieldGroup = computed(() => this.articleFieldGroups().find(f => f.key === this.selectedFieldKey()));
  currentArticleTypes = computed(() => this.selectedFieldGroup()?.articleTypes ?? []);
  
  ourBasePrice = computed(() => {
      const field = this.selectedFieldGroup();
      if (!field) return 0;
      const articleType = field.articleTypes.find(t => t.key === this.selectedArticleTypeKey());
      return articleType?.basePrice ?? 0;
  });

  marketBasePrice = computed(() => {
      const field = this.selectedFieldGroup();
      if (!field) return 0;
      const articleType = field.articleTypes.find(t => t.key === this.selectedArticleTypeKey());
      return articleType?.marketBasePrice ?? 0;
  });

  private areOptionsSelected = computed(() =>
    this.ourBasePrice() > 0 &&
    this.languageMultiplier() > 0 && 
    this.timeMultiplier() > 0
  );
  
  private calculatePrice = (basePrice: number): number => {
    if (!this.areOptionsSelected()) {
        return 0;
    }
    const base = basePrice;
    const languageSurcharge = base * (this.languageMultiplier() - 1);
    const timeSurcharge = base * (this.timeMultiplier() - 1);

    return base + languageSurcharge + timeSurcharge;
  }

  ourPrice = computed(() => this.calculatePrice(this.ourBasePrice()));

  marketPrice = computed(() => this.calculatePrice(this.marketBasePrice()));

  calculationBreakdown = computed(() => {
    if (!this.areOptionsSelected()) return [];

    const base = this.ourBasePrice();
    const languageSurcharge = base * (this.languageMultiplier() - 1);
    const timeSurcharge = base * (this.timeMultiplier() - 1);

    const t = this.langService.t();

    const breakdown = [
      { label: t.breakdownBasePrice, amount: base },
    ];
    
    if (languageSurcharge !== 0) {
      const languageLabel = this.articleLanguages().find(l => l.value === this.languageMultiplier())?.label ?? '';
      breakdown.push({ label: t.breakdownLanguageSurcharge(languageLabel), amount: languageSurcharge });
    }
     if (timeSurcharge !== 0) {
      const timeLabel = this.deliveryTimes().find(item => item.value === this.timeMultiplier())?.label ?? '';
      breakdown.push({ label: t.breakdownTimeSurcharge(timeLabel), amount: timeSurcharge });
    }
    
    return breakdown;
  });

  onFieldChange(event: Event) { 
    this.selectedFieldKey.set((event.target as HTMLSelectElement).value);
    this.selectedArticleTypeKey.set('');
  }

  onArticleTypeChange(event: Event) { this.selectedArticleTypeKey.set((event.target as HTMLSelectElement).value); }
  onLanguageChange(event: Event) { this.languageMultiplier.set(Number((event.target as HTMLSelectElement).value)); }
  onTimeChange(event: Event) { this.timeMultiplier.set(Number((event.target as HTMLSelectElement).value)); }

  resetForm() {
    this.selectedFieldKey.set('');
    this.selectedArticleTypeKey.set('');
    this.languageMultiplier.set(0);
    this.timeMultiplier.set(0);
  }
}