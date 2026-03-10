import type { ConversionLocale, ConversionVertical } from '@/app/lib/forms/types';
import type { FaqEntry } from '@/app/lib/schema/faqSchema';

export type VerticalLocale = ConversionLocale;
export type VerticalId = ConversionVertical;

export type LinkConfig = {
  href: string;
  label: string;
};

export type PillarChromeConfig = {
  brand: LinkConfig;
  topCta: LinkConfig;
  breadcrumbs: {
    items: LinkConfig[];
    current: string;
  };
};

export type HeroConfig = {
  badge: string;
  title: string;
  subtitle: string;
  primaryCta: LinkConfig;
  secondaryCta: LinkConfig;
};

export type ProblemCardConfig = {
  title: string;
  text: string;
  metric: string;
};

export type ProblemsConfig = {
  title: string;
  subtitle: string;
  cards: ProblemCardConfig[];
};

export type AutomationCardConfig = {
  title: string;
  text: string;
};

export type AutomationConfig = {
  title: string;
  subtitle: string;
  cards: AutomationCardConfig[];
  links: LinkConfig[];
};

export type ClusterArticleConfig = {
  slug: string;
  title: string;
  summary: string;
  ctaLabel: string;
};

export type ClusterGroupConfig<Id extends string = string> = {
  id: Id;
  title: string;
  description: string;
  articles: ClusterArticleConfig[];
};

export type ClusterConfig<Id extends string = string> = {
  title: string;
  subtitle: string;
  viewAll: LinkConfig;
  roiCta: LinkConfig;
  articleBaseHref: string;
  groups: ClusterGroupConfig<Id>[];
};

export type RoiCalculatorFieldConfig = {
  key: 'monthlyBookings' | 'averageCheck' | 'noShowRate' | 'instagramLeads' | 'responseMinutes';
  label: string;
  hint?: string;
  min?: number;
  max?: number;
  defaultValue: number;
};

export type RoiCalculatorResultConfig = {
  key: 'noShowLoss' | 'lostInstagramRevenue' | 'estimatedMonthlyLoss' | 'potentialRevenueRecovery';
  label: string;
  emphasis?: 'normal' | 'danger' | 'success';
};

export type RoiCalculatorConfig = {
  title: string;
  subtitle: string;
  fields: RoiCalculatorFieldConfig[];
  resultsTitle: string;
  results: RoiCalculatorResultConfig[];
  cta: LinkConfig;
};

export type RoiConfig = {
  title: string;
  subtitle: string;
  calculator: RoiCalculatorConfig;
};

export type CaseConfig = {
  title: string;
  problem: string;
  implementation: string[];
  metrics: string[];
  timeline: string;
};

export type CasesConfig = {
  title: string;
  subtitle: string;
  labels: {
    whatWeDid: string;
    metrics: string;
    timeline: string;
  };
  items: CaseConfig[];
};

export type ImplementationStageConfig = {
  title: string;
  duration: string;
  text: string;
};

export type ImplementationConfig = {
  title: string;
  subtitle: string;
  stageLabel: string;
  stages: ImplementationStageConfig[];
};

export type ObjectionConfig = { q: string; a: string };

export type ObjectionsConfig = {
  title: string;
  items: ObjectionConfig[];
};

export type FaqConfig = {
  title: string;
  items: FaqEntry[];
};

export type LeadMagnetFormConfig = {
  title: string;
  subtitle: string;
  successMessage: string;
  errorMessage: string;
  networkErrorMessage: string;
  fields: {
    nameLabel: string;
    emailLabel: string;
    salonSizeLabel: string;
    salonSizePlaceholder: string;
    salonSizeOptions: Array<{ value: string; label: string }>;
  };
  submitLabel: string;
  submittingLabel: string;
};

export type LeadMagnetConfig = {
  title: string;
  description: string;
  bullets: string[];
  form: LeadMagnetFormConfig;
};

export type AuditBenefitsConfig = {
  title: string;
  bullets: string[];
  riskReversal: string;
  chips: string[];
};

export type AuditFormConfig = {
  title: string;
  successMessage: string;
  errorMessage: string;
  networkErrorMessage: string;
  fields: {
    nameLabel: string;
    phoneLabel: string;
    salonSizeLabel: string;
    salonSizePlaceholder: string;
    salonSizeOptions: Array<{ value: string; label: string }>;
    monthlyBookingsLabel: string;
  };
  submitLabel: string;
  submittingLabel: string;
};

export type FinalCtaConfig = {
  title: string;
  subtitle: string;
  benefits: AuditBenefitsConfig;
  form: AuditFormConfig;
  bottomLinkText: string;
  bottomLink: LinkConfig;
};

export type BeautyClusterGroupId = 'lead-capture' | 'no-show' | 'retention' | 'ops';

export type VerticalPillarConfig<ClusterGroupId extends string = string> = {
  vertical: VerticalId;
  locale: VerticalLocale;
  chrome: PillarChromeConfig;
  hero: HeroConfig;
  problems: ProblemsConfig;
  automation: AutomationConfig;
  cluster: ClusterConfig<ClusterGroupId>;
  roi: RoiConfig;
  cases: CasesConfig;
  implementation: ImplementationConfig;
  objections: ObjectionsConfig;
  faq: FaqConfig;
  leadMagnet: LeadMagnetConfig;
  finalCta: FinalCtaConfig;
};

