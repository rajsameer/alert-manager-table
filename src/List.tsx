import React, { useState } from 'react';
import { ListData } from 'types';
import { VariableSizeList as List } from 'react-window';
import { Row } from './Row';

export const ListWarpper: React.FC<ListData> = (props) => {
  const { height, width } = { ...props };

  const [rowsin, setRows] = useState(props.rows);

  const toggleSize = (index: number) => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(index);
    }
    setRows((rows) => {
      const newRows = [...rows];
      if (newRows[index].isCardDisaplyed === false) {
        const cardlegth = newRows[index].cardData.match(/\n/g)?.length;
        newRows[index].rowSize = (cardlegth ? cardlegth + 3 : 35) * 24 + 35;
        newRows[index].isCardDisaplyed = true;
      } else {
        newRows[index].rowSize = 35;
        newRows[index].isCardDisaplyed = false;
      }

      return [...newRows];
    });
  };
  const getItemSize = (index: number) => {
    return rowsin[index].rowSize;
  };
  const listRef = React.useRef<List>(null);

  return (
    <List
      height={height - 30}
      itemCount={rowsin.length}
      itemSize={getItemSize}
      width={width}
      itemData={rowsin}
      ref={listRef}
    >
      {(props) => <Row {...props} toggleSize={toggleSize} />}
    </List>
  );
};
