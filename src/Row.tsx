import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { RowData } from 'types';
import { stylesFactory } from '@grafana/ui';

export const Row: React.FC<RowData> = props => {
  const styles = getStyles();
  const [isCardDisaplyed, setbodyDisplay] = useState(props.isCardDisaplyed);
  return (
    <>
      <tr onClick={() => setbodyDisplay(!isCardDisaplyed)}>
        <td className={cx(styles.pug_table_th)}>{props.timeValue}</td>
        <td className={cx(styles.pug_table_th)}>{props.colum_b_value}</td>
        <td
          className={cx(
            styles.pug_table_th,
            css`
              color: ${props.rowColor};
            `
          )}
        >
          {props.colum_c_value}
        </td>
        <td className={cx(styles.pug_table_th)}>{props.colum_d_value}</td>
      </tr>
      <tr
        className={cx(css`
          display: ${isCardDisaplyed ? 'in-line' : 'none'};
        `)}
      >
        <td colSpan={4}>
          <pre
            className={cx(css`
              color: grey;
              overflow-x: auto;
              display: block;
              font-weight: bold;
              border: 1px solid #696969;
              font-size: 14px;
            `)}
          >
            {props.cardData}
          </pre>
        </td>
      </tr>
    </>
  );
};

const getStyles = stylesFactory(() => {
  return {
    pug_table_th: css`
      border-bottom: 1px solid #696969;
      padding: 8px;
      font-weight: bold;
      font-size-adjust: 0.58;
      text-align: left;
    `,
  };
});
