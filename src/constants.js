import { matchPath } from 'react-router-dom';

export const API_URL = 'http://10.1.4.9:8011';

export const PAGE_NAMES = {
  '/': 'Новая карточка',
  '/sign-up': 'Новый пользователь',
  '/solution-and-reason': 'Причины/решения',
  '/stats_by_cards': 'Отчёты',
  '/stats_by_employees': 'Отчёты',
  '/stats_by_reasons': 'Отчёты',
  '/stats_by_solutions': 'Отчёты',
  '/stats_by_repeated_calls': 'Отчёты',
  '/stats_by_inactives_users': 'Отчёты',
  '/employees': 'Сотрудники',
  '/edit-employees/:id': 'Редактирование сотрудника',
};

export function getPageTitle(pathname) {
  for (const pattern in PAGE_NAMES) {
    if (matchPath({ path: pattern, end: true }, pathname)) {
      return PAGE_NAMES[pattern];
    }
  }
  return '';
}
