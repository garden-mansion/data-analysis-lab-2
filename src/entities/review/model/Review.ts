type ReviewType = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | 'UNKNOWN';

export interface Review {
  kinopoiskId: number;
  type: ReviewType;
  date: string;
  positiveRating: number;
  negativeRating: number;
  author: string;
  title?: string;
  description: string;
}

export const REVIEW_TYPE_RU: Record<ReviewType, string> = {
  POSITIVE: 'Положительный',
  NEGATIVE: 'Негативный',
  NEUTRAL: 'Нейтральный',
  UNKNOWN: 'Неизвестно',
};

export const REVIEW_TYPE_STYLE: Record<ReviewType, string> = {
  POSITIVE: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
  NEGATIVE: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
  NEUTRAL: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  UNKNOWN: '',
};
