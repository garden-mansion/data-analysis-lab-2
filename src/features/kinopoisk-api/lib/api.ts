import { getCleanText } from '@/shared/text-cleaner';
import type { ReviewResponse } from '../model/ReviewResponse';
import type { Review } from '@/entities/review';

const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;
const BASE_API_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films';

const HEADERS = {
  'X-API-KEY': API_KEY,
  'Content-Type': 'application/json',
};

const PARAMS = {
  method: 'GET',
  headers: HEADERS,
};

// матрица
// "https://kinopoiskapiunofficial.tech/api/v2.2/films/301",

export const getReviewsByID = async (id: number) => {
  try {
    const response = await fetch(`${BASE_API_URL}/${id}/reviews`, PARAMS);

    const { items: reviews } = (await response.json()) as ReviewResponse;

    const reviewsWithCleanText = reviews.map(
      (review) =>
        ({
          ...review,
          description: getCleanText(review.description),
        }) as Review,
    );
    return {
      reviews: reviewsWithCleanText,
    };
  } catch {
    return null;
  }
};
