import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { RowProps } from 'types';
import { stylesFactory } from '@grafana/ui';

export const Row: React.FC<RowProps> = (props) => {
  const styles = getStyles();
  //const [isCardDisaplyed, setbodyDisplay] = useState(props.isCardDisaplyed);
  const rowValue = props.data[props.index];
  const [isCardDisaplyed, setbodyDisplay] = useState(props.data[props.index].isCardDisaplyed);
  const card = (
    <div
      className={cx(
        styles.rowCard,
        css`
          display: ${isCardDisaplyed ? 'inline' : 'none'};
        `
      )}
    >
      <div>
        <pre
          className={cx(css`
            color: grey;
            overflow-x: scroll;
            overflow-y: scroll;
            display: block;
            font-weight: bold;
            border: 1px solid #696969;
            font-size: 14px;
            white-space: break-spaces;
          `)}
        >
          {rowValue.cardData}
        </pre>
      </div>
    </div>
  );

  const displaCard = isCardDisaplyed ? card : null;

  return (
    <div
      className={cx(styles.row)}
      style={props.style}
      onClick={() => {
        setbodyDisplay(!isCardDisaplyed);
        props.toggleSize(props.index);
      }}
    >
      <div>
        <div className={cx(styles.cell)}>{rowValue.timeValue}</div>
        <div className={cx(styles.cell)}>{rowValue.colum_b_value}</div>
        <div
          className={cx(
            styles.cell,
            css`
              color: ${rowValue.rowColor};
            `
          )}
        >
          {rowValue.colum_c_value}
        </div>
        <div className={cx(styles.cell)}>{rowValue.colum_d_value}</div>
      </div>
      {displaCard}
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    cell: css`
      padding: 4px;
      font-weight: bold;
      font-size-adjust: 0.58;
      text-align: left;
      display: inline-block;
      width: 25%;
    `,
    row: css`
      border-bottom: 1px solid #696969;
      padding: 4px;
      font-weight: bold;
      font-size-adjust: 0.58;
      text-align: left;
      display: block;
    `,
    rowCard: css`
      padding: 4px;
      font-weight: bold;
      font-size-adjust: 0.58;
      text-align: left;
      display: block;
    `,
  };
});
