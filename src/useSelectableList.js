import { useState, useCallback } from "react";

const useStelectableList = (inititalList, config = {}) => {
  const [list, setList] = useState(
    inititalList.map((item) => ({ ...item, selected: false }))
  );

  const forceSetList = useCallback((newList) => {
    setList(
      newList.map((item) => ({ ...item, selected: item.selected || false }))
    );
  }, []);

  const isAllSelected = list.every((item) => item.selected);

  const toggleItem = useCallback(
    (identifier) => {
      setList((listState) =>
        listState.map((item, i) => {
          const comparison = config.identifierKey
            ? item[config.identifierKey] === identifier
            : i === identifier;
          return comparison ? { ...item, selected: !item.selected } : item;
        })
      );
    },
    [config.identifierKey]
  );

  const toggleAll = useCallback(() => {
    setList((listState) =>
      listState.map((item, i) => {
        return { ...item, selected: isAllSelected ? false : true };
      })
    );
  }, [isAllSelected]);

  return { list, toggleItem, toggleAll, isAllSelected, forceSetList };
};

export default useStelectableList;
