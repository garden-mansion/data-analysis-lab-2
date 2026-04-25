import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  REVIEW_TYPE_RU,
  REVIEW_TYPE_STYLE,
  type Review,
} from '@/entities/review';
import { useState, type FC } from 'react';
import { CalendarDays } from 'lucide-react';
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from '@/components/ui/tooltip';
import { sendReview } from '@/features/openrouter-api';
import { Spinner } from '@/components/ui/spinner';
import { downloadTxt } from '@/shared/download-txt';

interface ReviewCardProps {
  review: Review;
  openReview: (review: Review) => void;
}

const REVIEW_CARD_MAX_CONTENT_LENGTH = 100;

export const ReviewCard: FC<ReviewCardProps> = ({ review, openReview }) => {
  const {
    title = 'нет названия',
    kinopoiskId,
    type,
    description,
    date,
    positiveRating,
    negativeRating,
    author,
  } = review;

  const handleOpenReviewClick = () => openReview(review);

  const [isSummarizing, setIsSummarizing] = useState<boolean>(false);

  const handleSummarizeReviewClick = async () => {
    setIsSummarizing(true);
    const summarizedReview = await sendReview(review.description);

    if (summarizedReview) {
      const { choices } = summarizedReview;
      const { message } = choices[0];

      downloadTxt(message.content, kinopoiskId.toString());
    }

    setIsSummarizing(false);
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="flex flex-col gap-4 font-extrabold mb-2">
          <div className="flex flex-row justify-between">
            <div className="flex flex row gap-2 items-center">
              <Badge variant="secondary">review id: {kinopoiskId}</Badge>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CalendarDays />
                </TooltipTrigger>

                <TooltipContent>{date}</TooltipContent>
              </Tooltip>
            </div>

            <div className="flex flex-row gap-2">
              <Badge className={REVIEW_TYPE_STYLE['POSITIVE']}>
                {positiveRating}
              </Badge>
              <Badge className={REVIEW_TYPE_STYLE['NEGATIVE']}>
                {negativeRating}
              </Badge>
            </div>
          </div>
          {title}

          <p className="font-medium">автор: {author}</p>
        </CardTitle>

        <CardDescription>
          <Badge className={REVIEW_TYPE_STYLE[type]}>
            Отзыв: {REVIEW_TYPE_RU[type]}
          </Badge>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="mb-2">
          {description.slice(0, REVIEW_CARD_MAX_CONTENT_LENGTH)}...
        </p>
        <Button
          variant="link"
          className="p-0 font-black cursor-pointer"
          onClick={handleOpenReviewClick}
        >
          Читать полностью
        </Button>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full cursor-pointer"
          onClick={handleSummarizeReviewClick}
          disabled={isSummarizing}
        >
          {isSummarizing && <Spinner />}
          Выжать!
        </Button>
      </CardFooter>
    </Card>
  );
};
