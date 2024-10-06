const formatVisitCount = (count) => {
  if (count >= 1_000_000) {
    const millions = (count / 1_000_000).toFixed(2);

    return millions.endsWith('.00')
      ? `${parseInt(millions)} M`
      : `${millions} M`;
  } else if (count >= 1_000) {
    const thousands = (count / 1_000).toFixed(2);

    return thousands.endsWith('.00')
      ? `${parseInt(thousands)} K`
      : `${thousands} K`;
  } else {
    return count.toString(); // menos de mil
  }
};

export default formatVisitCount;
