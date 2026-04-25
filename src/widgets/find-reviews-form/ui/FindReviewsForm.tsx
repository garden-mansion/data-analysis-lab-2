import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import type { Review } from '@/entities/review';
import { getReviewsByID } from '@/features/kinopoisk-api';
import {
  useState,
  type ChangeEventHandler,
  type Dispatch,
  type FC,
  type SetStateAction,
  type SubmitEventHandler,
} from 'react';

interface FindReviewsFormProps {
  setCurrentReviews: Dispatch<SetStateAction<Review[]>>;
}

export const FindReviewsForm: FC<FindReviewsFormProps> = ({
  setCurrentReviews,
}) => {
  const idInputName = 'kinopoisk-id';

  const [userInput, setUserInput] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  const handleUserInputChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const { value } = event.currentTarget;
    setUserInput(value);
    setIsSubmitDisabled(value ? false : true);
  };

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

  return (
    <div className="w-full max-w-xl mx-auto p-8">
      <form action="" onSubmit={handleSubmit} className="flex flex-wrap gap-8">
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
  );
};
