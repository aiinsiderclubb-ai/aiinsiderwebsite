import type { Language } from './translations';

export type ProjectSeoEntry = {
  slug: string;
  name: string;
  description: {
    en: string;
    uk: string;
  };
};

export const projectsData: ProjectSeoEntry[] = [
  {
    slug: 'voiceflow-pro',
    name: 'VoiceFlow Pro',
    description: {
      en: 'AI voice agent for handling incoming calls with natural speech, CRM logging and analytics.',
      uk: 'AI голосовий агент для обробки вхідних дзвінків з природною мовою, логуванням у CRM та аналітикою.',
    },
  },
  {
    slug: 'autoscale-crm',
    name: 'AutoScale CRM',
    description: {
      en: 'End-to-end sales automation pipeline with CRM integrations, lead qualification and workflow orchestration.',
      uk: 'End-to-end автоматизація продажів з CRM інтеграціями, кваліфікацією лідів та orchestration workflow.',
    },
  },
  {
    slug: 'supportbot-360',
    name: 'SupportBot 360',
    description: {
      en: 'AI chatbot for customer support, FAQ automation, ticket triage and escalation with analytics dashboard.',
      uk: 'AI чатбот для підтримки клієнтів: автоматизація FAQ, triage тікетів, ескалації та дашборд аналітики.',
    },
  },
  {
    slug: 'predictai-analytics',
    name: 'PredictAI Analytics',
    description: {
      en: 'Predictive insights and AI analytics dashboards to understand trends and drive better decisions.',
      uk: 'Прогнозні інсайти та AI-аналітика з дашбордами, щоб бачити тренди та приймати кращі рішення.',
    },
  },
  {
    slug: 'meetingmaster-ai',
    name: 'MeetingMaster AI',
    description: {
      en: 'Meeting automation with summaries, action items, follow-ups and CRM sync.',
      uk: 'Автоматизація зустрічей: summary, action items, follow-ups та синхронізація з CRM.',
    },
  },
  {
    slug: 'workflowx-engine',
    name: 'WorkflowX Engine',
    description: {
      en: 'Workflow automation engine connecting tools and removing manual work with AI-powered steps.',
      uk: 'Двигун workflow-автоматизації, який зʼєднує інструменти та прибирає ручну роботу за допомогою AI.',
    },
  },
  {
    slug: 'sweezy',
    name: 'Sweezy',
    description: {
      en: 'Sweezy — App Store-style mobile app case with guides, checklists, multilingual content and AI assistant.',
      uk: 'Sweezy — кейс мобільного застосунку в стилі App Store: гайди, чеклісти, багатомовний контент та AI-асистент.',
    },
  },
];

export function getProjectBySlug(slug: string) {
  return projectsData.find((project) => project.slug === slug);
}

export function getProjectDescription(project: ProjectSeoEntry, lang: Language) {
  return project.description[lang];
}
