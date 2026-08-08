/*
 * Copyright (c) 2024 Dianat (dianatofficial) | 0935 912 0880. All Rights Reserved.
 * This software is the confidential and proprietary information of dianatofficial.
 */
import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Option } from '../../models';
import { ResultComponent } from '../result/result.component';
import { LanguageService } from '../../services/language.service';

interface WorkType extends Option {}

interface FieldGroup {
  key: string;
  labelEn: string;
  labelFa: string;
  basePrices: {
    master: number;
    phd: number;
  };
  marketBasePrices: {
    master: number;
    phd: number;
  };
  workTypesEn: WorkType[];
  workTypesFa: WorkType[];
}

@Component({
  selector: 'app-project-calculator',
  templateUrl: './project-calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ResultComponent],
})
export class ProjectCalculatorComponent {
  readonly langService = inject(LanguageService);

  academicLevel = signal<'master' | 'phd'>('master');
  selectedFieldKey = signal<string>('');
  workTypeMultiplier = signal<number>(0);
  universityMultiplier = signal<number>(0);
  timeMultiplier = signal<number>(0);
  serviceLevelMultiplier = signal<number>(0);

  rawFieldGroups: FieldGroup[] = [
    {
      key: 'humanities',
      labelEn: 'Humanities & Social Sciences',
      labelFa: 'علوم انسانی و علوم اجتماعی',
      basePrices: { master: 9_000_000, phd: 22_000_000 },
      marketBasePrices: { master: 11_000_000, phd: 27_000_000 },
      workTypesEn: [
        { label: 'Desk / Library Research', value: 1.0 },
        { label: 'Quantitative Research (Survey & Stats)', value: 1.2 },
        { label: 'Qualitative Research (Interview, Case Study)', value: 1.3 },
        { label: 'Mixed Methods Research', value: 1.4 },
      ],
      workTypesFa: [
        { label: 'پژوهش کتابخانه‌ای / اسنادی', value: 1.0 },
        { label: 'پژوهش کمی (پرسشنامه، تحلیل آماری)', value: 1.2 },
        { label: 'پژوهش کیفی (مصاحبه، مطالعه موردی)', value: 1.3 },
        { label: 'پژوهش آمیخته', value: 1.4 },
      ],
    },
    {
      key: 'management',
      labelEn: 'Management, Economics & Accounting',
      labelFa: 'مدیریت، اقتصاد و حسابداری',
      basePrices: { master: 10_500_000, phd: 26_000_000 },
      marketBasePrices: { master: 13_000_000, phd: 32_000_000 },
      workTypesEn: [
        { label: 'Conceptual Model Development', value: 1.1 },
        { label: 'Case Study', value: 1.2 },
        { label: 'Statistical Analysis (PLS, SEM)', value: 1.3 },
        { label: 'Financial / Econometric Modeling', value: 1.5 },
      ],
      workTypesFa: [
        { label: 'توسعه مدل مفهومی', value: 1.1 },
        { label: 'مطالعه موردی (Case Study)', value: 1.2 },
        { label: 'تحلیل آماری (PLS, SEM)', value: 1.3 },
        { label: 'مدل‌سازی مالی / اقتصادسنجی', value: 1.5 },
      ],
    },
    {
      key: 'engineering',
      labelEn: 'Engineering & Natural Sciences',
      labelFa: 'فنی–مهندسی و علوم پایه',
      basePrices: { master: 13_000_000, phd: 31_000_000 },
      marketBasePrices: { master: 16_000_000, phd: 38_000_000 },
      workTypesEn: [
        { label: 'Theoretical / Mathematical Work', value: 1.2 },
        { label: 'Software Simulation (MATLAB, ANSYS, etc.)', value: 1.5 },
        { label: 'Design & Implementation', value: 1.6 },
        { label: 'Experimental / Laboratory Work', value: 1.7 },
      ],
      workTypesFa: [
        { label: 'کار تئوری / ریاضیاتی', value: 1.2 },
        { label: 'شبیه‌سازی نرم‌افزاری (متلب، انسیس)', value: 1.5 },
        { label: 'طراحی و پیاده‌سازی', value: 1.6 },
        { label: 'کار آزمایشگاهی / تجربی', value: 1.7 },
      ],
    },
    {
      key: 'medical',
      labelEn: 'Medical & Biological Sciences',
      labelFa: 'علوم پزشکی و زیستی',
      basePrices: { master: 15_000_000, phd: 35_000_000 },
      marketBasePrices: { master: 19_000_000, phd: 43_000_000 },
      workTypesEn: [
        { label: 'Systematic Review & Meta-Analysis', value: 1.3 },
        { label: 'Fieldwork / Clinical Trial', value: 1.4 },
        { label: 'Bioinformatics Data Analysis', value: 1.6 },
        { label: 'Laboratory Experiments', value: 1.8 },
      ],
      workTypesFa: [
        { label: 'مرور سیستماتیک و متاآنالیز', value: 1.3 },
        { label: 'کار میدانی / کارآزمایی بالینی', value: 1.4 },
        { label: 'تحلیل داده (بیوانفورماتیک)', value: 1.6 },
        { label: 'تحقیقات آزمایشگاهی', value: 1.8 },
      ],
    },
    {
      key: 'art',
      labelEn: 'Art & Architecture',
      labelFa: 'هنر و معماری',
      basePrices: { master: 11_500_000, phd: 28_000_000 },
      marketBasePrices: { master: 14_000_000, phd: 34_000_000 },
      workTypesEn: [
        { label: 'Theoretical Research', value: 1.1 },
        { label: 'Historical & Comparative Analysis', value: 1.2 },
        { label: 'Design-Led / Practical Project', value: 1.6 },
      ],
      workTypesFa: [
        { label: 'پژوهش نظری', value: 1.1 },
        { label: 'تحلیل تاریخی و تطبیقی', value: 1.2 },
        { label: 'پژوهش طراحی‌محور (پروژه عملی)', value: 1.6 },
      ],
    },
  ];

  fieldGroups = computed(() => {
    const isEn = this.langService.isEn();
    return this.rawFieldGroups.map(fg => ({
      key: fg.key,
      label: isEn ? fg.labelEn : fg.labelFa,
      basePrices: fg.basePrices,
      marketBasePrices: fg.marketBasePrices,
      workTypes: isEn ? fg.workTypesEn : fg.workTypesFa,
    }));
  });

  universityTypes = computed<Option[]>(() => {
    const isEn = this.langService.isEn();
    return [
      { label: isEn ? 'Payame Noor / Applied Science' : 'پیام نور / علمی‌کاربردی', value: 0.9 },
      { label: isEn ? 'Islamic Azad University' : 'آزاد', value: 1 },
      { label: isEn ? 'Top State / National University' : 'سراسری (رتبه‌های برتر)', value: 1.2 },
    ];
  });
  
  thesisDeliveryTimes = computed<Option[]>(() => {
    const isEn = this.langService.isEn();
    return [
      { label: isEn ? 'Standard (3 to 6 months)' : 'عادی (۳ تا ۶ ماه)', value: 1 },
      { label: isEn ? 'Intensive (1 to 3 months)' : 'فشرده (۱ تا ۳ ماه)', value: 1.2 },
      { label: isEn ? 'Urgent (Under 1 month)' : 'فوری (زیر ۱ ماه)', value: 1.35 },
    ];
  });
  
  serviceLevels = computed<Option[]>(() => {
    const isEn = this.langService.isEn();
    return [
      { label: isEn ? 'Standard' : 'استاندارد', value: 1.0 },
      { label: isEn ? 'Professional (Higher Quality)' : 'حرفه‌ای (کیفیت بالاتر)', value: 1.15 },
      { label: isEn ? 'Premium (Full Support)' : 'ویژه (همراه با پشتیبانی کامل)', value: 1.3 },
    ];
  });

  selectedFieldGroup = computed(() => this.fieldGroups().find(f => f.key === this.selectedFieldKey()));
  currentWorkTypes = computed(() => this.selectedFieldGroup()?.workTypes.slice().sort((a, b) => a.value - b.value) ?? []);
  deliveryTimes = computed(() => this.thesisDeliveryTimes());
  
  ourBasePrice = computed(() => {
    const field = this.selectedFieldGroup();
    if (!field) return 0;
    return this.academicLevel() === 'master' ? field.basePrices.master : field.basePrices.phd;
  });

  marketBasePrice = computed(() => {
    const field = this.selectedFieldGroup();
    if (!field) return 0;
    return this.academicLevel() === 'master' ? field.marketBasePrices.master : field.marketBasePrices.phd;
  });

  private areOptionsSelected = computed(() => 
    this.workTypeMultiplier() > 0 && 
    this.universityMultiplier() > 0 && 
    this.timeMultiplier() > 0 && 
    this.serviceLevelMultiplier() > 0
  );

  private calculatePrice = (basePrice: number): number => {
    if (basePrice === 0 || !this.areOptionsSelected()) {
        return 0;
    }
    const base = basePrice;
    const mainPrice = base * this.workTypeMultiplier();
    const universitySurcharge = base * (this.universityMultiplier() - 1);
    const timeSurcharge = base * (this.timeMultiplier() - 1);
    const serviceSurcharge = base * (this.serviceLevelMultiplier() - 1);
    
    return mainPrice + universitySurcharge + timeSurcharge + serviceSurcharge;
  }

  ourPrice = computed(() => this.calculatePrice(this.ourBasePrice()));
  marketPrice = computed(() => this.calculatePrice(this.marketBasePrice()));
  
  calculationBreakdown = computed(() => {
    if (this.ourBasePrice() === 0 || !this.areOptionsSelected()) return [];

    const base = this.ourBasePrice();
    const mainPrice = base * this.workTypeMultiplier();
    const universitySurcharge = base * (this.universityMultiplier() - 1);
    const timeSurcharge = base * (this.timeMultiplier() - 1);
    const serviceSurcharge = base * (this.serviceLevelMultiplier() - 1);

    const t = this.langService.t();

    const breakdown = [
      { label: t.breakdownBaseWithWork, amount: mainPrice },
    ];
    
    const universityLabel = this.universityTypes().find(u => u.value === this.universityMultiplier())?.label ?? '';
    if (universitySurcharge !== 0) {
       breakdown.push({ label: t.breakdownUniversitySurcharge(universityLabel), amount: universitySurcharge });
    }

    const timeLabel = this.thesisDeliveryTimes().find(tItem => tItem.value === this.timeMultiplier())?.label ?? '';
     if (timeSurcharge !== 0) {
      breakdown.push({ label: t.breakdownTimeSurcharge(timeLabel), amount: timeSurcharge });
    }

    const serviceLabel = this.serviceLevels().find(s => s.value === this.serviceLevelMultiplier())?.label ?? '';
    if (serviceSurcharge !== 0) {
      breakdown.push({ label: t.breakdownServiceSurcharge(serviceLabel), amount: serviceSurcharge });
    }

    return breakdown;
  });

  setAcademicLevel(level: 'master' | 'phd') {
    this.academicLevel.set(level);
    this.selectedFieldKey.set('');
    this.workTypeMultiplier.set(0);
  }

  onFieldChange(event: Event) { 
    this.selectedFieldKey.set((event.target as HTMLSelectElement).value);
    this.workTypeMultiplier.set(0);
  }

  onWorkTypeChange(event: Event) { this.workTypeMultiplier.set(Number((event.target as HTMLSelectElement).value)); }
  onUniversityTypeChange(event: Event) { this.universityMultiplier.set(Number((event.target as HTMLSelectElement).value)); }
  onDeliveryTimeChange(event: Event) { this.timeMultiplier.set(Number((event.target as HTMLSelectElement).value)); }
  onServiceLevelChange(event: Event) { this.serviceLevelMultiplier.set(Number((event.target as HTMLSelectElement).value)); }
  
  resetForm() {
    this.academicLevel.set('master');
    this.selectedFieldKey.set('');
    this.workTypeMultiplier.set(0);
    this.universityMultiplier.set(0);
    this.timeMultiplier.set(0);
    this.serviceLevelMultiplier.set(0);
  }
}