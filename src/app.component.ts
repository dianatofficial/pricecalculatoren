/*
 * Copyright (c) 2024 Dianat | 0935 912 0880. All Rights Reserved.
 * This software is the confidential and proprietary information of Dianat.
 */
import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCalculatorComponent } from './components/project-calculator/project-calculator.component';
import { ArticleCalculatorComponent } from './components/article-calculator/article-calculator.component';
import { ActionResearchCalculatorComponent } from './components/action-research-calculator/action-research-calculator.component';
import { ArticleSummaryCalculatorComponent } from './components/article-summary-calculator/article-summary-calculator.component';
import { ThesisToArticleCalculatorComponent } from './components/thesis-to-article-calculator/thesis-to-article-calculator.component';
import { ProposalCalculatorComponent } from './components/proposal-calculator/proposal-calculator.component';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ProjectCalculatorComponent,
    ArticleCalculatorComponent,
    ActionResearchCalculatorComponent,
    ArticleSummaryCalculatorComponent,
    ThesisToArticleCalculatorComponent,
    ProposalCalculatorComponent
  ],
})
export class AppComponent {
  readonly langService = inject(LanguageService);
  calculationMode = signal<'thesis' | 'proposal' | 'article' | 'action-research' | 'article-summary' | 'thesis-to-article'>('thesis');

  setCalculationMode(mode: 'thesis' | 'proposal' | 'article' | 'action-research' | 'article-summary' | 'thesis-to-article') {
    this.calculationMode.set(mode);
  }
}