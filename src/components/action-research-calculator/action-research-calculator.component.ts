/*
 * Copyright (c) 2024 Dianat | 0935 912 0880. All Rights Reserved.
 * This software is the confidential and proprietary information of Dianat.
 */
import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Option } from '../../models';
import { ResultComponent } from '../result/result.component';
import { LanguageService } from '../../services/language.service';

interface ActionResearchLevelOption {
  labelEn: string;
  labelFa: string;
  value: number;
}

interface RawActionResearchArea {
  key: string;
  labelEn: string;
  labelFa: string;
  basePrice: number;
  marketBasePrice: number;
  levels: ActionResearchLevelOption[];
}

@Component({
  selector: 'app-action-research-calculator',
  templateUrl: './action-research-calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ResultComponent],
})
export class ActionResearchCalculatorComponent {
  readonly langService = inject(LanguageService);

  selectedAreaKey = signal<string>('');
  levelMultiplier = signal<number>(0);
  difficultyMultiplier = signal<number>(0);
  timeMultiplier = signal<number>(0);

  rawActionResearchAreas: RawActionResearchArea[] = [
    { 
      key: 'school', 
      labelEn: 'Education & Schools', 
      labelFa: 'آموزش و پرورش (مدارس)', 
      basePrice: 480_000, 
      marketBasePrice: 600_000,
      levels: [
        { labelEn: 'Elementary Level', labelFa: 'ابتدایی', value: 1.0 },
        { labelEn: 'Lower Secondary Level', labelFa: 'متوسطه اول', value: 1.2 },
        { labelEn: 'Upper Secondary Level', labelFa: 'متوسطه دوم', value: 1.4 },
        { labelEn: 'Regional / Provincial Level', labelFa: 'سطح منطقه‌ای / استانی', value: 1.8 },
      ]
    },
    { 
      key: 'organizational', 
      labelEn: 'Organizational & Corporate', 
      labelFa: 'سازمانی / شرکتی', 
      basePrice: 1_200_000, 
      marketBasePrice: 1_520_000,
      levels: [
        { labelEn: 'Team Process Improvement', labelFa: 'بهبود فرآیند تیمی', value: 1.0 },
        { labelEn: 'Departmental Process Improvement', labelFa: 'بهبود فرآیند دپارتمان', value: 1.3 },
        { labelEn: 'Organizational Transformation Project', labelFa: 'پروژه تحول سازمانی', value: 1.7 },
      ]
    },
    { 
      key: 'higher-ed', 
      labelEn: 'Higher Education / Academic', 
      labelFa: 'آموزش عالی / دانشگاهی', 
      basePrice: 800_000, 
      marketBasePrice: 1_000_000,
      levels: [
        { labelEn: 'Teaching Method Improvement (Single Course)', labelFa: 'بهبود روش تدریس در یک درس', value: 1.0 },
        { labelEn: 'Academic Department Process Improvement', labelFa: 'بهبود فرآیند گروه آموزشی', value: 1.4 },
        { labelEn: 'Student System Enhancement', labelFa: 'ارتقاء سیستم‌های دانشجویی', value: 1.6 },
      ]
    },
  ];

  actionResearchAreas = computed(() => {
    const isEn = this.langService.isEn();
    return this.rawActionResearchAreas.map(a => ({
      key: a.key,
      label: isEn ? a.labelEn : a.labelFa,
      basePrice: a.basePrice,
      marketBasePrice: a.marketBasePrice,
      levels: a.levels.map(l => ({
        label: isEn ? l.labelEn : l.labelFa,
        value: l.value,
      })),
    }));
  });

  difficultyTypes = computed<Option[]>(() => {
    const isEn = this.langService.isEn();
    return [
      { label: isEn ? 'Descriptive (Observation & Report)' : 'توصیفی (مشاهده و گزارش)', value: 1 },
      { label: isEn ? 'Analytical (Simple Tools/Checklist)' : 'تحلیلی (ابزار ساده مانند چک‌لیست)', value: 1.3 },
      { label: isEn ? 'Quantitative / Mixed (Questionnaire & Stats)' : 'کمی/آمیخته (پرسشنامه و آمار)', value: 1.6 },
      { label: isEn ? 'Multi-Cycle / Longitudinal' : 'چند چرخه‌ای / طولی', value: 2.0 },
    ];
  });

  deliveryTimes = computed<Option[]>(() => {
    const isEn = this.langService.isEn();
    return [
      { label: isEn ? 'Urgent (Under 10 days)' : 'فوری (زیر ۱۰ روز)', value: 1.6 },
      { label: isEn ? 'Fast (10 to 20 days)' : 'سریع (۱۰ تا ۲۰ روز)', value: 1.3 },
      { label: isEn ? 'Standard (3 to 5 weeks)' : 'عادی (۳ تا ۵ هفته)', value: 1 },
      { label: isEn ? 'Relaxed (Over 5 weeks)' : 'بدون عجله (بیش از ۵ هفته)', value: 0.9 },
    ];
  });

  selectedArea = computed(() => this.actionResearchAreas().find(a => a.key === this.selectedAreaKey()));
  currentLevels = computed(() => this.selectedArea()?.levels ?? []);
  
  ourBasePrice = computed(() => this.selectedArea()?.basePrice ?? 0);
  marketBasePrice = computed(() => this.selectedArea()?.marketBasePrice ?? 0);

  private areOptionsSelected = computed(() => 
    this.ourBasePrice() > 0 &&
    this.levelMultiplier() > 0 && 
    this.difficultyMultiplier() > 0 && 
    this.timeMultiplier() > 0
  );

  private calculatePrice = (basePrice: number): number => {
    if (!this.areOptionsSelected()) {
      return 0;
    }
    const base = basePrice;
    // Main price is base multiplied by the difficulty
    const mainPrice = base * this.difficultyMultiplier();
    
    // Other factors add a surcharge
    const levelSurcharge = base * (this.levelMultiplier() - 1);
    const timeSurcharge = base * (this.timeMultiplier() - 1);
    
    return mainPrice + levelSurcharge + timeSurcharge;
  }

  ourPrice = computed(() => this.calculatePrice(this.ourBasePrice()));
  
  marketPrice = computed(() => this.calculatePrice(this.marketBasePrice()));

  calculationBreakdown = computed(() => {
    if (!this.areOptionsSelected()) return [];

    const base = this.ourBasePrice();
    const mainPrice = base * this.difficultyMultiplier();
    const levelSurcharge = base * (this.levelMultiplier() - 1);
    const timeSurcharge = base * (this.timeMultiplier() - 1);

    const t = this.langService.t();

    const breakdown = [
      { label: t.breakdownBaseWithComplexity, amount: mainPrice },
    ];
    
    if (levelSurcharge !== 0) {
      breakdown.push({ label: t.breakdownLevelSurcharge, amount: levelSurcharge });
    }
    if (timeSurcharge !== 0) {
      const timeLabel = this.deliveryTimes().find(item => item.value === this.timeMultiplier())?.label ?? '';
      breakdown.push({ label: t.breakdownTimeSurcharge(timeLabel), amount: timeSurcharge });
    }
    
    return breakdown;
  });

  onAreaChange(event: Event) { 
    this.selectedAreaKey.set((event.target as HTMLSelectElement).value);
    this.levelMultiplier.set(0);
  }
  onLevelChange(event: Event) { this.levelMultiplier.set(Number((event.target as HTMLSelectElement).value)); }
  onDifficultyChange(event: Event) { this.difficultyMultiplier.set(Number((event.target as HTMLSelectElement).value)); }
  onTimeChange(event: Event) { this.timeMultiplier.set(Number((event.target as HTMLSelectElement).value)); }

  resetForm() {
    this.selectedAreaKey.set('');
    this.levelMultiplier.set(0);
    this.difficultyMultiplier.set(0);
    this.timeMultiplier.set(0);
  }
}