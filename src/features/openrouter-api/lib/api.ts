const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const BASE_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
};

const getPayload = (reviewDescription: string) => ({
  // models: [
  //   'inclusionai/ling-2.6-1t',
  //   'inclusionai/ling-2.6-flash',
  //   'baidu/qianfan-ocr-fast',
  // ],
  model: 'google/gemma-4-26b-a4b-it',
  messages: [
    {
      role: 'system',
      content:
        'Ты — ассистент, который анализирует отзывы на фильмы и составляет краткие выжимки на эти отзывы.',
    },
    {
      role: 'user',
      content: `Проанализируй этот отзыв и составь краткую выжимку (3-5 предложений):\n${reviewDescription}`,
    },
  ],
  provider: {
    allow_fallbacks: true,
  },
});

export const sendReview = async (reviewDescription: string) => {
  try {
    const response = await fetch(BASE_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(getPayload(reviewDescription)),
    });

    const data = await response.json();
    return data;
  } catch {
    return null;
  }
};
