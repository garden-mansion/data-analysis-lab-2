import { useState, type FC } from 'react';
import { ReviewCard } from './widgets/review-card';
import type { Review } from './entities/review';
import { FullReviewDialog } from './widgets/review-card/ui/FullReviewDialog';
import { FindReviewsForm } from './widgets/find-reviews-form';

const App: FC = () => {
  const [currentReviews, setCurrentReviews] = useState<Review[]>([]);

  const [reviews, setReviews] = useState<Review | null>(null);

  const openReview = (review: Review) => setReviews(review);
  const removeCurrentReview = () => {
    setReviews(null);
  };

  return (
    <>
      <FindReviewsForm setCurrentReviews={setCurrentReviews} />

      <div className="max-w-xl mx-auto grid grid-cols-1 gap-8 p-8">
        {currentReviews.map((review) => (
          <ReviewCard
            key={review.kinopoiskId}
            review={review}
            openReview={openReview}
          />
        ))}
      </div>

      <FullReviewDialog
        review={reviews}
        isOpen={!!reviews}
        removeCurrentReview={removeCurrentReview}
      />
    </>
  );
};

export default App;
