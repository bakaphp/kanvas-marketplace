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

type En = typeof en;
type Leaves<T> =
  T extends Array<infer U>
    ? `${number}.${Leaves<U>}` | `[${number}].${Leaves<U>}`
    : T extends object
      ? {
          [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never ? '' : `.${Leaves<T[K]>}`}`;
        }[keyof T]
      : never;
      
export const translate = (scope: Leaves<En>, options?: TranslateOptions) =>
  i18n.t(scope, { ...options, ...options?.interpolate } as any);
declare module 'i18n-js' {
  // eslint-disable-next-line no-unused-vars
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      en: En;
    };
  }
}
