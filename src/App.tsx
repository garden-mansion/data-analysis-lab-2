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

  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!userInput) {
      return;
    }

    setIsSubmitDisabled(true);
    setIsLoading(true);

    getReviewsByID(+userInput).then((result) => {
      console.log(result);
      setIsSubmitDisabled(false);
      setIsLoading(false);
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-8">
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

export default App;
