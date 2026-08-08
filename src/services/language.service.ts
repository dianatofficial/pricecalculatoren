/*
 * Copyright (c) 2024 Dianat (dianatofficial) | 0935 912 0880. All Rights Reserved.
 * This software is the confidential and proprietary information of dianatofficial.
 */
import { Injectable, signal, effect, computed } from '@angular/core';

export type Language = 'en' | 'fa';

export interface TranslationDictionary {
  // App Header & Footer
  appTitle: string;
  developerInfo: string;
  footerRights: string;
  langNameEn: string;
  langNameFa: string;
  selectLanguage: string;
  selectPlaceholder: string;
  selectOptionPrompt: string;
  selectFieldFirst: string;
  selectFieldFirstPrompt: string;
  selectFieldGroupFirst: string;
  selectAreaFirst: string;

  // Form Section Titles
  thesisDetailsTitle: string;
  proposalDetailsTitle: string;
  articleDetailsTitle: string;
  thesisExtractionDetailsTitle: string;
  actionResearchDetailsTitle: string;
  articleSummaryDetailsTitle: string;

  // Tabs
  tabThesis: string;
  tabProposal: string;
  tabArticle: string;
  tabThesisToArticle: string;
  tabActionResearch: string;
  tabArticleSummary: string;

  // Result Component
  currency: string;
  estimatedPrice: string;
  specialOffer: string;
  priceComparison: string;
  marketAveragePrice: string;
  yourSavings: string;
  calculationDetails: string;
  totalAmount: string;
  completeFormPrompt: string;
  newCalculation: string;

  // Labels & Controls
  academicLevel: string;
  academicDegree: string;
  degreeMaster: string;
  degreePhd: string;
  masterDegree: string;
  phdDegree: string;
  fieldGroup: string;
  fieldOfStudy: string;
  specializedWorkType: string;
  workType: string;
  workScope: string;
  serviceQualityLevel: string;
  serviceLevel: string;
  university: string;
  universityType: string;
  deliveryTime: string;

  // Service Level Tooltips
  serviceLevelTooltipStandard: string;
  serviceLevelTooltipProfessional: string;
  serviceLevelTooltipPremium: string;
  serviceTooltipStandardTitle: string;
  serviceTooltipStandard: string;
  serviceTooltipProTitle: string;
  serviceTooltipPro: string;
  serviceTooltipPremiumTitle: string;
  serviceTooltipPremium: string;

  // Scope & Volume Tooltips
  scopeAndVolume: string;
  proposalScopeTooltip: string;
  scopeTooltipLiteratureTitle: string;
  scopeTooltipLiterature: string;
  scopeTooltipPreliminaryTitle: string;
  scopeTooltipPreliminary: string;

  // Article Calculator
  articleTierType: string;
  articleLevelAndType: string;
  writingLanguage: string;
  directWritingTooltip: string;
  directAuthoringTitle: string;
  directAuthoringDescription: string;

  // Thesis to Article
  thesisToArticleNote: string;
  articleLevel: string;
  thesisExtractionNoteTitle: string;
  thesisExtractionNoteContent: string;

  // Action Research
  actionResearchArea: string;
  actionResearchLevel: string;
  specificLevel: string;
  workComplexity: string;
  actionResearchComplexityTooltip: string;
  actionResearchTooltip: string;

  // Article Summary
  summaryType: string;
  numArticles: string;
  numberOfArticles: string;
  volumeDiscountBadge: (percent: number) => string;
  languageTask: string;
  summaryFishTooltip: string;
  noteTakingTooltip: string;

  // Breakdown labels
  breakdownBasePrice: string;
  breakdownBaseWithWork: string;
  breakdownBaseWithVolume: string;
  breakdownBaseArticle: string;
  breakdownBaseWithComplexity: string;
  breakdownBaseArticlesN: (n: number) => string;
  breakdownBasePriceForArticles: (n: number) => string;
  breakdownUniversitySurcharge: (univ: string) => string;
  breakdownTimeSurcharge: (time: string) => string;
  breakdownServiceSurcharge: (service: string) => string;
  breakdownLanguageSurcharge: (lang: string) => string;
  breakdownLevelSurcharge: string;
  breakdownVolumeDiscount: (percent: number) => string;
}

const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    appTitle: 'Project Pricing Assistant',
    developerInfo: 'Developed by: Dianat | 0935 912 0880',
    footerRights: 'All rights reserved by Dianat | 0935 912 0880.',
    langNameEn: 'English',
    langNameFa: 'فارسی',
    selectLanguage: 'Language',
    selectPlaceholder: 'Select...',
    selectOptionPrompt: 'Select an option...',
    selectFieldFirst: 'Select Field of Study first...',
    selectFieldFirstPrompt: 'Select Field of Study first...',
    selectFieldGroupFirst: 'Select Field Group first...',
    selectAreaFirst: 'Select Area first...',

    thesisDetailsTitle: 'Thesis / Dissertation Details',
    proposalDetailsTitle: 'Proposal Details',
    articleDetailsTitle: 'Article Details',
    thesisExtractionDetailsTitle: 'Thesis-to-Article Extraction Details',
    actionResearchDetailsTitle: 'Action Research Details',
    articleSummaryDetailsTitle: 'Article Summary Details',

    tabThesis: 'Thesis / Dissertation',
    tabProposal: 'Proposal',
    tabArticle: 'Article Price',
    tabThesisToArticle: 'Thesis to Article',
    tabActionResearch: 'Action Research',
    tabArticleSummary: 'Article Summary',

    currency: 'Tomans',
    estimatedPrice: 'Estimated Final Price',
    specialOffer: 'Our Special Offer',
    priceComparison: 'Price Comparison',
    marketAveragePrice: 'Market Average Price',
    yourSavings: 'Your Savings',
    calculationDetails: 'Calculation Details',
    totalAmount: 'Total Price',
    completeFormPrompt: 'Please complete the form options to view pricing and details.',
    newCalculation: 'New Calculation',

    academicLevel: 'Academic Level',
    academicDegree: 'Academic Degree',
    degreeMaster: "Master's (M.Sc / M.A)",
    degreePhd: 'Doctorate (Ph.D)',
    masterDegree: "Master's Degree (M.Sc / M.A)",
    phdDegree: 'Doctorate (Ph.D)',
    fieldGroup: 'Field of Study',
    fieldOfStudy: 'Field of Study',
    specializedWorkType: 'Specialized Research Type',
    workType: 'Specialized Research Type',
    workScope: 'Scope & Volume of Work',
    serviceQualityLevel: 'Service Quality Level',
    serviceLevel: 'Service Quality Level',
    university: 'University Tier',
    universityType: 'University Type',
    deliveryTime: 'Delivery Timeline',

    serviceLevelTooltipStandard: 'Standard: Full project execution strictly following the approved proposal.',
    serviceLevelTooltipProfessional: 'Professional: Higher academic writing quality and inclusion of recent literature.',
    serviceLevelTooltipPremium: 'Premium: Includes live online review sessions, full support, and post-delivery minor revisions.',
    serviceTooltipStandardTitle: 'Standard:',
    serviceTooltipStandard: 'Full project execution strictly following the approved proposal.',
    serviceTooltipProTitle: 'Professional:',
    serviceTooltipPro: 'Higher academic writing quality and inclusion of recent literature.',
    serviceTooltipPremiumTitle: 'Premium:',
    serviceTooltipPremium: 'Includes live online review sessions, full support, and post-delivery minor revisions.',

    scopeAndVolume: 'Scope & Volume of Work',
    proposalScopeTooltip: 'Comprehensive Literature Review: Covers a broader range of research articles for Ch. 2. Preliminary Study: Includes initial survey or data collection for feasibility validation.',
    scopeTooltipLiteratureTitle: 'Comprehensive Literature Review:',
    scopeTooltipLiterature: 'Covers a broader range of research articles for Chapter 2.',
    scopeTooltipPreliminaryTitle: 'Preliminary Study:',
    scopeTooltipPreliminary: 'Includes initial survey or data collection for feasibility validation.',

    articleTierType: 'Article Tier & Type',
    articleLevelAndType: 'Article Level & Index',
    writingLanguage: 'Writing Language',
    directWritingTooltip: 'Direct Writing: Article is written directly in academic English by a subject-matter expert, ensuring maximum acceptance quality.',
    directAuthoringTitle: 'Direct Authoring:',
    directAuthoringDescription: 'Article is authored directly in academic English by a subject-matter expert for maximum journal acceptance rate.',

    thesisToArticleNote: 'Note: Estimated prices cover extracting, rewriting, formatting, and preparing a standalone journal article from a standard thesis or dissertation.',
    articleLevel: 'Article Tier',
    thesisExtractionNoteTitle: 'Note:',
    thesisExtractionNoteContent: 'Estimated prices cover extracting content, rewriting, formatting, and preparing a standalone journal article from a standard thesis or dissertation.',

    actionResearchArea: 'Action Research Area',
    actionResearchLevel: 'Specific Level / Grade',
    specificLevel: 'Grade / Target Level',
    workComplexity: 'Type & Complexity',
    actionResearchComplexityTooltip: 'Higher data collection requirements (e.g. multi-cycle intervention or statistical surveys) increase research complexity and cost.',
    actionResearchTooltip: 'Higher data collection requirements (e.g. questionnaires or multi-cycle implementations) increase research complexity and cost.',

    summaryType: 'Summary Format & Depth',
    numArticles: 'Number of Articles',
    numberOfArticles: 'Number of Articles',
    volumeDiscountBadge: (percent: number) => `${percent}% Volume Discount!`,
    languageTask: 'Language Operation',
    summaryFishTooltip: 'Literature Extraction: Extracting and categorizing key findings from research papers for literature review chapters.',
    noteTakingTooltip: 'Literature Note-taking: Extracting and categorizing key findings and methodology points for easy inclusion in research literature reviews.',

    breakdownBasePrice: 'Base Price',
    breakdownBaseWithWork: 'Base Price (with research type)',
    breakdownBaseWithVolume: 'Base Price (with work volume)',
    breakdownBaseArticle: 'Base Price for Article',
    breakdownBaseWithComplexity: 'Base Price (with complexity)',
    breakdownBaseArticlesN: (n: number) => `Base Price for ${n} article${n > 1 ? 's' : ''}`,
    breakdownBasePriceForArticles: (n: number) => `Base Price for ${n} article${n > 1 ? 's' : ''}`,
    breakdownUniversitySurcharge: (univ: string) => `Surcharge for ${univ}`,
    breakdownTimeSurcharge: (time: string) => `Timeline Surcharge (${time})`,
    breakdownServiceSurcharge: (service: string) => `Surcharge for ${service} service`,
    breakdownLanguageSurcharge: (lang: string) => `Language Surcharge (${lang})`,
    breakdownLevelSurcharge: 'Work Level Surcharge',
    breakdownVolumeDiscount: (percent: number) => `Volume Discount (${percent}%)`,
  },
  fa: {
    appTitle: 'دستیار قیمت‌گذاری پروژه',
    developerInfo: 'توسعه توسط: Dianat | 0935 912 0880',
    footerRights: 'کلیه حقوق این نرم‌افزار متعلق به Dianat | 0935 912 0880 می‌باشد.',
    langNameEn: 'English',
    langNameFa: 'فارسی',
    selectLanguage: 'زبان',
    selectPlaceholder: 'انتخاب کنید...',
    selectOptionPrompt: 'انتخاب کنید...',
    selectFieldFirst: 'ابتدا گروه رشته را انتخاب کنید...',
    selectFieldFirstPrompt: 'ابتدا گروه رشته را انتخاب کنید...',
    selectFieldGroupFirst: 'ابتدا گروه رشته را انتخاب کنید...',
    selectAreaFirst: 'ابتدا حوزه را انتخاب کنید...',

    thesisDetailsTitle: 'مشخصات پایان‌نامه',
    proposalDetailsTitle: 'مشخصات پروپوزال',
    articleDetailsTitle: 'مشخصات مقاله',
    thesisExtractionDetailsTitle: 'مشخصات استخراج مقاله از پایان‌نامه',
    actionResearchDetailsTitle: 'مشخصات اقدام‌پژوهی',
    articleSummaryDetailsTitle: 'مشخصات خلاصه‌نویسی مقاله',

    tabThesis: 'پایان‌نامه',
    tabProposal: 'پروپوزال',
    tabArticle: 'محاسبه مقاله',
    tabThesisToArticle: 'پایان‌نامه به مقاله',
    tabActionResearch: 'اقدام‌پژوهی',
    tabArticleSummary: 'خلاصه‌نویسی',

    currency: 'تومان',
    estimatedPrice: 'قیمت نهایی تخمینی',
    specialOffer: 'پیشنهاد ویژه ما',
    priceComparison: 'مقایسه قیمت',
    marketAveragePrice: 'متوسط قیمت بازار',
    yourSavings: 'سود شما',
    calculationDetails: 'جزئیات محاسبه',
    totalAmount: 'مبلغ نهایی',
    completeFormPrompt: 'لطفاً برای مشاهده جزئیات و قیمت، گزینه‌های فرم را تکمیل کنید.',
    newCalculation: 'محاسبه جدید',

    academicLevel: 'مقطع تحصیلی',
    academicDegree: 'مقطع تحصیلی',
    degreeMaster: 'کارشناسی ارشد',
    degreePhd: 'دکتری',
    masterDegree: 'کارشناسی ارشد',
    phdDegree: 'دکتری',
    fieldGroup: 'گروه رشته',
    fieldOfStudy: 'رشته / حوزه',
    specializedWorkType: 'نوع کار تخصصی',
    workType: 'نوع کار تخصصی',
    workScope: 'حجم و محدوده کار',
    serviceQualityLevel: 'سطح کیفیت خدمات',
    serviceLevel: 'سطح کیفیت خدمات',
    university: 'نوع دانشگاه',
    universityType: 'نوع دانشگاه',
    deliveryTime: 'زمان تحویل',

    serviceLevelTooltipStandard: 'استاندارد: انجام کامل پروژه طبق پروپوزال.',
    serviceLevelTooltipProfessional: 'حرفه‌ای: کیفیت نگارش بالاتر، استفاده از منابع جدیدتر.',
    serviceLevelTooltipPremium: 'ویژه: شامل جلسات آنلاین، پشتیبانی کامل و ویرایش‌های جزئی پس از تحویل.',
    serviceTooltipStandardTitle: 'استاندارد:',
    serviceTooltipStandard: 'انجام کامل پروژه طبق پروپوزال.',
    serviceTooltipProTitle: 'حرفه‌ای:',
    serviceTooltipPro: 'کیفیت نگارش بالاتر، استفاده از منابع جدیدتر.',
    serviceTooltipPremiumTitle: 'ویژه:',
    serviceTooltipPremium: 'شامل جلسات آنلاین، پشتیبانی کامل و ویرایش‌های جزئی پس از تحویل.',

    scopeAndVolume: 'حجم و محدوده کار',
    proposalScopeTooltip: 'مرور ادبیات جامع: شامل بررسی تعداد بیشتری از مقالات و منابع علمی برای فصل دوم. مطالعه مقدماتی: شامل اجرای یک نظرسنجی یا جمع‌آوری داده اولیه برای اعتبارسنجی اولیه ایده پژوهش.',
    scopeTooltipLiteratureTitle: 'مرور ادبیات جامع:',
    scopeTooltipLiterature: 'شامل بررسی تعداد بیشتری از مقالات و منابع علمی برای فصل دوم.',
    scopeTooltipPreliminaryTitle: 'مطالعه مقدماتی:',
    scopeTooltipPreliminary: 'شامل اجرای یک نظرسنجی یا جمع‌آوری داده اولیه برای اعتبارسنجی اولیه ایده پژوهش.',

    articleTierType: 'سطح و نوع مقاله',
    articleLevelAndType: 'سطح مقاله',
    writingLanguage: 'زبان نگارش',
    directWritingTooltip: 'نگارش مستقیم: مقاله از ابتدا به زبان انگلیسی و توسط نویسنده متخصص همان رشته نوشته می‌شود که بالاترین کیفیت را تضمین می‌کند.',
    directAuthoringTitle: 'نگارش مستقیم:',
    directAuthoringDescription: 'مقاله از ابتدا به زبان انگلیسی و توسط نویسنده متخصص همان رشته نوشته می‌شود که بالاترین کیفیت را تضمین می‌کند.',

    thesisToArticleNote: 'توجه: قیمت‌های نمایش داده شده برای تبدیل یک پایان‌نامه استاندارد (کارشناسی ارشد یا دکتری) به یک مقاله مستقل است. این فرآیند شامل استخراج محتوا، بازنویسی، فرمت‌بندی، و آماده‌سازی مقاله برای ارسال به مجله مورد نظر است.',
    articleLevel: 'سطح مقاله',
    thesisExtractionNoteTitle: 'توجه:',
    thesisExtractionNoteContent: 'قیمت‌های نمایش داده شده برای تبدیل یک پایان‌نامه استاندارد (کارشناسی ارشد یا دکتری) به یک مقاله مستقل است. این فرآیند شامل استخراج محتوا، بازنویسی، فرمت‌بندی، و آماده‌سازی مقاله برای ارسال به مجله مورد نظر است.',

    actionResearchArea: 'حوزه اقدام‌پژوهی',
    actionResearchLevel: 'مقطع / سطح مشخص',
    specificLevel: 'مقطع / سطح مشخص',
    workComplexity: 'نوع و پیچیدگی کار',
    actionResearchComplexityTooltip: 'هرچه پژوهش نیاز به جمع‌آوری و تحلیل داده‌های بیشتری داشته باشد (مانند پرسشنامه یا اجرای چند مرحله‌ای)، پیچیدگی و هزینه آن بیشتر می‌شود.',
    actionResearchTooltip: 'هرچه پژوهش نیاز به جمع‌آوری و تحلیل داده‌های بیشتری داشته باشد (مانند پرسشنامه یا اجرای چند مرحله‌ای)، پیچیدگی و هزینه آن بیشتر می‌شود.',

    summaryType: 'نوع خلاصه‌نویسی',
    numArticles: 'تعداد مقالات',
    numberOfArticles: 'تعداد مقالات',
    volumeDiscountBadge: (percent: number) => `${percent}٪ تخفیف حجمی!`,
    languageTask: 'عملیات زبان',
    summaryFishTooltip: 'فیش‌برداری: استخراج نکات کلیدی و دسته‌بندی شده از مقاله برای استفاده آسان در بخش پیشینه پژوهش پایان‌نامه یا مقالات دیگر.',
    noteTakingTooltip: 'فیش‌برداری: استخراج نکات کلیدی و دسته‌بندی شده از مقاله برای استفاده آسان در بخش پیشینه پژوهش پایان‌نامه یا مقالات دیگر.',

    breakdownBasePrice: 'قیمت پایه',
    breakdownBaseWithWork: 'قیمت پایه (با نوع کار)',
    breakdownBaseWithVolume: 'قیمت پایه (با حجم کار)',
    breakdownBaseArticle: 'قیمت پایه مقاله',
    breakdownBaseWithComplexity: 'قیمت پایه (با پیچیدگی)',
    breakdownBaseArticlesN: (n: number) => `هزینه پایه برای ${n} مقاله`,
    breakdownBasePriceForArticles: (n: number) => `هزینه پایه برای ${n} مقاله`,
    breakdownUniversitySurcharge: (univ: string) => `هزینه مرتبط با ${univ}`,
    breakdownTimeSurcharge: (time: string) => `هزینه ${time}`,
    breakdownServiceSurcharge: (service: string) => `هزینه خدمات ${service}`,
    breakdownLanguageSurcharge: (lang: string) => `هزینه زبان (${lang})`,
    breakdownLevelSurcharge: 'هزینه سطح کار',
    breakdownVolumeDiscount: (percent: number) => `تخفیف حجمی (${percent}٪)`,
  },
};

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  readonly lang = signal<Language>('en');

  readonly isEn = computed(() => this.lang() === 'en');
  readonly isFa = computed(() => this.lang() === 'fa');

  readonly t = computed(() => TRANSLATIONS[this.lang()]);

  constructor() {
    effect(() => {
      const current = this.lang();
      if (typeof document !== 'undefined') {
        document.documentElement.lang = current;
        document.documentElement.dir = current === 'fa' ? 'rtl' : 'ltr';
      }
    });
  }

  setLanguage(l: Language) {
    this.lang.set(l);
  }

  toggleLanguage() {
    this.lang.update(l => (l === 'en' ? 'fa' : 'en'));
  }
}
