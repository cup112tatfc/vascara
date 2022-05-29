export const selectList = (
  event: string,
  list: Array<string>,
  setList: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const selectitem = event;
  if (list.includes(selectitem)) {
    const newItems = list.filter((name) => name !== selectitem);
    setList(newItems);
  } else {
    const newItems = [...list];
    newItems.push(selectitem);
    setList(newItems);
  }
};
