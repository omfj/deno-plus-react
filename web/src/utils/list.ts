export const prettyList = <T extends string>(list: Array<T>): string => {
  return list.reduce((acc, item, index) => {
    if (index === 0) {
      return item;
    } else if (index === list.length - 1) {
      return `${acc} and ${item}`;
    } else {
      return `${acc}, ${item}`;
    }
  }, "");
};
