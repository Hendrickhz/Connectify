export const useFormatTime = (time) => {
  if(time==null){
    return;
  }
  const date = new Date(time);
  const now = new Date();

  // Helper function to format time
  const formatTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  // Check if the date is today
  if (date.toDateString() === now.toDateString()) {
    return `Today, ${formatTime(date)}`;
  }

  // Check if the date is yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${formatTime(date)}`;
  }

  // Otherwise, return formatted date and time
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);

  return `${formattedDate}, ${formatTime(date)}`;
};
