export const locales = ({
  ru: {
    code: 'ru',
    label: 'русский'
  },
  en: {
    code: 'en',
    label: 'english'
  }
})

export const currencies = ({
  rub: {
    code: 'rub',
    symbol: '₽',
    isBefore: false
  },
  usd: {
    code: 'usd',
    symbol: '$',
    isBefore: true
  },
  eur: {
    code: 'eur',
    symbol: '€',
    isBefore: true
  },
  cny: {
    code: 'cny',
    symbol: '¥',
    isBefore: false
  }
})

const ru = ({
  view: {
    storage: 'история',
    tasks: 'задачи',
    months: 'месяцы',
    days: 'дни',
    years: 'годы'
  },
  time: {
    at: 'в'
  },
  price: {
    label: 'цена',
    perHour: 'в час'
  },
  duration: {
    hr: {
      zero: 'часов',
      one: 'час',
      few: 'часа',
      many: 'часов'
    },
    min: 'мин',
    sec: 'сек'
  },
  entries: {
    zero: 'записей',
    one: 'запись',
    few: 'записи',
    many: 'записей'
  },
  selected: 'выбрано',
  delete: 'удалить',
  or: 'или',
  and: 'и',
  cancel: 'отменить',
  filter: 'фильтр',
  filterPlaceholder: 'разделяй через «/»',
  noResultsLabel: 'записей не найдено',
  filterByThisLabel: 'найти в истории',
  clearContext: 'очистить контекст',
  sidebar: {
    icons: 'иконки',
    from: 'от',
    girls: 'девчушки',
    l10n: 'локализация'
  },
  currency: {
    rub: 'рубль',
    usd: 'доллар',
    eur: 'евро',
    cny: 'юань'
  },
  import: 'импорт',
  importFrom: 'импортировать записи из',
  export: 'экспорт',
  exportTo: 'экспортировать записи в'
})

const en = ({
  view: {
    storage: 'history',
    tasks: 'tasks',
    months: 'months',
    days: 'days',
    years: 'years'
  },
  time: {
    at: 'at'
  },
  price: {
    label: 'price',
    perHour: 'per hour'
  },
  duration: {
    hr: {
      zero: 'h',
      one: 'h',
      few: 'h',
      many: 'h'
    },
    min: 'min',
    sec: 'sec'
  },
  entries: {
    zero: 'entries',
    one: 'entry',
    few: 'entries',
    many: 'entries'
  },
  selected: 'selected',
  delete: 'delete',
  or: 'or',
  and: 'and',
  cancel: 'cancel',
  filter: 'filter',
  filterPlaceholder: 'separate by "/"',
  noResultsLabel: 'no time records found',
  filterByThisLabel: 'find in history',
  clearContext: 'clear context',
  sidebar: {
    icons: 'icons',
    from: 'from',
    girls: 'girls',
    l10n: 'localization'
  },
  currency: {
    rub: 'ruble',
    usd: 'dollar',
    eur: 'euro',
    cny: 'yuan'
  },
  import: 'import',
  importFrom: 'import entries from',
  export: 'export',
  exportTo: 'export entries to'
})

export const translate = ({
  ru,
  en
})

export function interpolate (str, value, locale) {
  //
  console.log(str, value, locale)
}

const state = {
  locale: 'ru',
  currency: 'rub'
}

const getters = {
  locale: state => state.locale,
  currency: state => state.currency,
  isCurrencySymbolBefore: state => {
    return currencies[state.currency].isBefore
  }
}

const mutations = {
  setLocale (state, payload) {
    state.locale = payload.locale
  },
  setCurrency (state, payload) {
    state.currency = payload.currency
  }
}

export default {
  state,
  getters,
  mutations
}
