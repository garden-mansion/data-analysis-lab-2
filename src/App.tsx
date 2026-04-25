import {
  useState,
  type ChangeEventHandler,
  type FC,
  type SubmitEventHandler,
} from 'react';
import { Field, FieldDescription, FieldLabel } from './components/ui/field';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { getReviewsByID } from './features/kinopoisk-api';
import { Spinner } from './components/ui/spinner';
import { ReviewCard } from './widgets/review-card';
import type { Review } from './entities/review';
import { FullReviewDialog } from './widgets/review-card/ui/FullReviewDialog';

const App: FC = () => {
  const idInputName = 'kinopoisk-id';

  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleUserInputChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const { value } = event.currentTarget;
    setUserInput(value);
    setIsSubmitDisabled(value ? false : true);
  };
  const [currentReviews, setCurrentReviews] = useState<Review[]>([]);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!userInput) {
      return;
    }

    setIsSubmitDisabled(true);
    setIsLoading(true);

    getReviewsByID(+userInput).then((result) => {
      setIsSubmitDisabled(false);
      setIsLoading(false);

      if (result) {
        setCurrentReviews(result.reviews);
      }
    });
  };

  const [currentReview, setCurrentReview] = useState<Review | null>(null);
  const openReview = (review: Review) => setCurrentReview(review);
  const removeCurrentReview = () => {
    setCurrentReview(null);
  };

  return (
    <>
      <div className="w-full max-w-xl mx-auto p-8">
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-wrap gap-8"
        >
          <Field>
            <FieldLabel htmlFor={idInputName}>kinopoiskId</FieldLabel>
            <Input
              value={userInput}
              onChange={handleUserInputChange}
              id={idInputName}
              type="number"
              min={0}
              name={idInputName}
              placeholder="Введите ID фильма на Кинопоиск"
            />
            <FieldDescription>
              см. последний параметр в URL фильма на Кинопоиске
            </FieldDescription>
          </Field>

          <Field>
            <Button type="submit" disabled={isSubmitDisabled}>
              Подтвердить
              {isLoading && <Spinner />}
            </Button>
          </Field>
        </form>
      </div>

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
        review={currentReview}
        isOpen={!!currentReview}
        removeCurrentReview={removeCurrentReview}
      />
    </>
  );
};

export default App;
