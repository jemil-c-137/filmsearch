export const minutesTransform = (minutes: number) => {
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
