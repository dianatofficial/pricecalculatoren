/*
 * Copyright (c) 2024 Dianat (dianatofficial) | 0935 912 0880. All Rights Reserved.
 * This software is the confidential and proprietary information of dianatofficial.
 */
import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Option } from '../../models';
import { ResultComponent } from '../result/result.component';
import { LanguageService } from '../../services/language.service';

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
}

@Component({
  selector: 'app-proposal-calculator',
  templateUrl: './proposal-calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ResultComponent],
})
export class ProposalCalculatorComponent {
  readonly langService = inject(LanguageService);

  academicLevel = signal<'master' | 'phd'>('master');
  selectedFieldKey = signal<string>('');
  scopeMultiplier = signal<number>(0);
  universityMultiplier = signal<number>(0);
  timeMultiplier = signal<number>(0);

  rawFieldGroups: FieldGroup[] = [
    {
      key: 'humanities',
      labelEn: 'Humanities & Social Sciences',
      labelFa: 'علوم انسانی و علوم اجتماعی',
      basePrices: { master: 1_550_000, phd: 2_700_000 },
      marketBasePrices: { master: 2_000_000, phd: 3_350_000 },
    },
    {
      key: 'management',
      labelEn: 'Management, Economics & Accounting',
      labelFa: 'مدیریت، اقتصاد و حسابداری',
      basePrices: { master: 1_800_000, phd: 3_150_000 },
      marketBasePrices: { master: 2_250_000, phd: 3_800_000 },
    },
    {
      key: 'engineering',
      labelEn: 'Engineering & Natural Sciences',
      labelFa: 'فنی–مهندسی و علوم پایه',
      basePrices: { master: 2_250_000, phd: 3_800_000 },
      marketBasePrices: { master: 2_900_000, phd: 4_700_000 },
    },
    {
      key: 'medical',
      labelEn: 'Medical & Biological Sciences',
      labelFa: 'علوم پزشکی و زیستی',
      basePrices: { master: 2_450_000, phd: 4_250_000 },
      marketBasePrices: { master: 3_150_000, phd: 5_400_000 },
    },
    {
      key: 'art',
      labelEn: 'Art & Architecture',
      labelFa: 'هنر و معماری',
      basePrices: { master: 2_000_000, phd: 3_350_000 },
      marketBasePrices: { master: 2_450_000, phd: 4_000_000 },
    },
  ];

  fieldGroups = computed(() => {
    const isEn = this.langService.isEn();
    return this.rawFieldGroups.map(fg => ({
      key: fg.key,
      label: isEn ? fg.labelEn : fg.labelFa,
      basePrices: fg.basePrices,
      marketBasePrices: fg.marketBasePrices,
    }));
  });

  scopeOptions = computed<Option[]>(() => {
    const isEn = this.langService.isEn();
    return [
      { label: isEn ? 'Standard (Chapters 1 to 3 outline)' : 'استاندارد (فصول ۱ تا ۳)', value: 1.0 },
      { label: isEn ? 'Comprehensive (Extended Literature Review)' : 'گسترده (با مرور ادبیات جامع)', value: 1.3 },
      { label: isEn ? 'Complex (With Preliminary Study/Data)' : 'پیچیده (با مطالعه مقدماتی/داده اولیه)', value: 1.6 },
    ];
  });

  universityTypes = computed<Option[]>(() => {
    const isEn = this.langService.isEn();
    return [
      { label: isEn ? 'Payame Noor / Applied Science' : 'پیام نور / علمی‌کاربردی', value: 0.9 },
      { label: isEn ? 'Islamic Azad University' : 'آزاد', value: 1 },
      { label: isEn ? 'Top State / National University' : 'سراسری (رتبه‌های برتر)', value: 1.2 },
    ];
  });
  
  deliveryTimes = computed<Option[]>(() => {
    const isEn = this.langService.isEn();
    return [
      { label: isEn ? 'Standard (10 to 20 days)' : 'عادی (۱۰ تا ۲۰ روز)', value: 1.0 },
      { label: isEn ? 'Intensive (5 to 10 days)' : 'فشرده (۵ تا ۱۰ روز)', value: 1.2 },
      { label: isEn ? 'Urgent (Under 5 days)' : 'فوری (زیر ۵ روز)', value: 1.5 },
    ];
  });
  
  selectedFieldGroup = computed(() => this.fieldGroups().find(f => f.key === this.selectedFieldKey()));
  
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
    this.scopeMultiplier() > 0 && 
    this.universityMultiplier() > 0 && 
    this.timeMultiplier() > 0 &&
    this.selectedFieldKey() !== ''
  );

  private calculatePrice = (basePrice: number): number => {
    if (basePrice === 0 || !this.areOptionsSelected()) {
      return 0;
    }
    const base = basePrice;
    const mainPrice = base * this.scopeMultiplier();
    const universitySurcharge = base * (this.universityMultiplier() - 1);
    const timeSurcharge = base * (this.timeMultiplier() - 1);
    
    return mainPrice + universitySurcharge + timeSurcharge;
  }

  ourPrice = computed(() => this.calculatePrice(this.ourBasePrice()));

  marketPrice = computed(() => this.calculatePrice(this.marketBasePrice()));

  calculationBreakdown = computed(() => {
    if (this.ourBasePrice() === 0 || !this.areOptionsSelected()) return [];

    const base = this.ourBasePrice();
    const mainPrice = base * this.scopeMultiplier();
    const universitySurcharge = base * (this.universityMultiplier() - 1);
    const timeSurcharge = base * (this.timeMultiplier() - 1);

    const t = this.langService.t();

    const breakdown = [
      { label: t.breakdownBaseWithWork, amount: mainPrice },
    ];
    
    const universityLabel = this.universityTypes().find(u => u.value === this.universityMultiplier())?.label ?? '';
    if (universitySurcharge !== 0) {
       breakdown.push({ label: t.breakdownUniversitySurcharge(universityLabel), amount: universitySurcharge });
    }

    const timeLabel = this.deliveryTimes().find(item => item.value === this.timeMultiplier())?.label ?? '';
     if (timeSurcharge !== 0) {
      breakdown.push({ label: t.breakdownTimeSurcharge(timeLabel), amount: timeSurcharge });
    }

    return breakdown;
  });
  
  setAcademicLevel(level: 'master' | 'phd') {
    this.academicLevel.set(level);
  }

  onFieldChange(event: Event) { this.selectedFieldKey.set((event.target as HTMLSelectElement).value); }
  onScopeChange(event: Event) { this.scopeMultiplier.set(Number((event.target as HTMLSelectElement).value)); }
  onUniversityTypeChange(event: Event) { this.universityMultiplier.set(Number((event.target as HTMLSelectElement).value)); }
  onDeliveryTimeChange(event: Event) { this.timeMultiplier.set(Number((event.target as HTMLSelectElement).value)); }
  
  resetForm() {
    this.academicLevel.set('master');
    this.selectedFieldKey.set('');
    this.scopeMultiplier.set(0);
    this.universityMultiplier.set(0);
    this.timeMultiplier.set(0);
  }
}