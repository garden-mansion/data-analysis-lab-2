// import type { Review } from "@/features/kinopoisk-api";

// const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
// const BASE_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// export const sendReviews = async (reviews: Review[]) => {
//   try {
//     const response = await fetch(
//       BASE_API_URL,
//       {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           messages: [
//             {
//               role: 'system',
//               content: 'Ты — ассистент, который анализирует отзывы на фильмы (в формате JSON) и составляет краткие выжимки из этих отзывов.'
//             },
//             {
//               role: 'user',
//               content: 'Проанализируй и summarize эти отзывы'
//             }
//           ]
//         })
//       }
//     )
//   }
// }
