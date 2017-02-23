import { addLocaleData } from 'react-intl';

import localeSv from 'react-intl/locale-data/sv';
import localeEn from 'react-intl/locale-data/en';
import localeFi from 'react-intl/locale-data/fi';

import { intlReducer } from 'react-intl-redux';

import sv from '../../translations/sv';
import en from '../../translations/en';
import fi from '../../translations/fi';

export const storeLocaleForUser = (user, locale) => localStorage.setItem(`locale#${user}`, locale);
export const getLocaleForUser = user => localStorage.getItem(`locale#${user}`);

addLocaleData([...localeSv, ...localeEn, ...localeFi]);
export const languages = {
  sv: {
    translations: sv,
    name: 'Svenska',
  },
  en: {
    translations: en,
    name: 'English',
  },
  fi: {
    translations: fi,
    name: 'Suomi',
  },
};

export const defaultLang =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

const languageWithoutRegionCode = defaultLang.toLowerCase().split(/[_-]+/)[0];

const initialState = {
  messages: null,
  locale: null,
};

if (languages[languageWithoutRegionCode]) {
  initialState.messages = languages[languageWithoutRegionCode].translations;
  initialState.locale = languageWithoutRegionCode;
} else if (languages[defaultLang]) {
  initialState.messages = languages[defaultLang].translations;
  initialState.locale = defaultLang;
} else {
  // default to 'sv' locale
  initialState.messages = languages.sv.translations;
  initialState.locale = 'sv';
}

export const reducer = (state = initialState, action) => intlReducer(state, action);
