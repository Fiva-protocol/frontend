
export const calculateDaysToMaturity = (maturityDate: string) => {
    const targetDate = new Date(maturityDate);
    const today = new Date();
    const timeDifference = targetDate.getTime() - today.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  };
  