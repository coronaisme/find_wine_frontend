export const handleTimeElapsed = (date) => {
  //compare date input to date.now()
  let timeDiff = (Date.now() - date) / 60000;
  return timeDiff;
  //if diff is more than x , logout
};
