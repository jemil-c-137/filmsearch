import { format } from 'date-fns';

export const yearsTransform = (isTvShow: boolean, year: string, yearEnd: string | null) => {
  return isTvShow
    ? `${format(new Date(year), 'yyyy')} - ${(yearEnd && format(new Date(yearEnd), 'yyyy')) || 'now'}`
    : format(new Date(year), 'yyyy');
};

export const durationTransform = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} mins.`;
  } else if (minutes === 60) {
    return '1 hr.';
  } else {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hr. ${mins} mins.`;
  }
};
