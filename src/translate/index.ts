import { I18n } from 'i18n-js';
import en from './en';

const i18n = new I18n({
  en
});

i18n.defaultLocale = 'en';
i18n.locale = 'en';

type Message = string | object;

interface Interpolate {
  [key: string]: any;
}
interface TranslateOptions {
  message?: string | undefined;
  defaults?: Array<{ message: Message } | undefined>;
  defaultValue?: Message | undefined;
  interpolate?: Interpolate;
}

export const translate = (scope: string, options?: TranslateOptions) =>
  i18n.t(scope, { ...options, ...options?.interpolate } as any);

declare module 'i18n-js' {
  // eslint-disable-next-line no-unused-vars
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      en: typeof en;
    };
  }
}
