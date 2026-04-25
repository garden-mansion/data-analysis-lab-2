import {
  DialogContent,
  Dialog,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Review } from '@/entities/review';
import type { FC } from 'react';

interface FullReviewDialogProps {
  review: Review | null;
  isOpen: boolean;
  removeCurrentReview: () => void;
}

export const FullReviewDialog: FC<FullReviewDialogProps> = ({
  review,
  isOpen,
  removeCurrentReview,
}) => {
  if (!review) {
    return;
  }

  const { title = 'нет названия', author, description } = review;

  return (
    <Dialog open={isOpen} onOpenChange={removeCurrentReview}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Автор: {author}</DialogDescription>
        </DialogHeader>

        <p className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {description}
        </p>
      </DialogContent>
    </Dialog>
  );
};
