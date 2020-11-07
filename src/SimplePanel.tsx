import React from 'react';
import { FieldType, getTimeZoneInfo, PanelProps } from '@grafana/data';
import { SimpleOptions, RowData } from 'types';
import { stylesFactory } from '@grafana/ui';
import { css, cx } from 'emotion';
import { Row } from './Row';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = getStyles();
  const frame = data.series[0];
  const timefield = frame.fields.find(field =>
    options.timefield ? field.name === options.timefield : field.type === FieldType.time
  );
  const column_b = frame.fields.find(field =>
    options.column_b ? field.name === options.column_b : field.type === FieldType.string
  );
  const column_c = frame.fields.find(field =>
    options.column_c ? field.name === options.column_c : field.type === FieldType.string
  );
  const column_d = frame.fields.find(field =>
    options.column_d ? field.name === options.column_d : field.type === FieldType.string
  );

  let rows: RowData[] = [];
  const timezone = data.request?.timezone === undefined ? 'browser' : data.request?.timezone;
  const timeZoneInfo = getTimeZoneInfo(timezone, timefield?.values.get(0));

  const fields = frame.fields;
  for (let i = 0; i < frame.length; i++) {
    let row: RowData = {
      timeValue: '',
      colum_b_value: '',
      colum_c_value: '',
      colum_d_value: '',
      cardData: '',
      isCardDisaplyed: false,
      rowColor: 'none',
    };
    //row.timeValue = new Date(timefield?.values.get(i)[0] + -1 * timeZoneOffset * 60 * 1000).toString();
    row.timeValue = new Date(timefield?.values.get(i)[0]).toLocaleString(navigator.language, {
      timeZone: timeZoneInfo?.ianaName,
    });
    row.colum_b_value = column_b?.values.get(i);
    row.colum_c_value =
      column_c?.values.get(i) === 1 || column_c?.values.get(i) === 0 || column_c?.values.get(i) === null
        ? 'Info'
        : column_c?.values.get(i) === 2
        ? 'Warning'
        : column_c?.values.get(i) === 3
        ? 'High'
        : column_c?.values.get(i) === 4
        ? 'Critical'
        : 'Undefined';
    row.colum_d_value = column_d?.values.get(i);
    let color = column_c?.config.thresholds?.steps.find(
      s =>
        s.value ===
        (column_c?.values.get(i) === 1 || column_c?.values.get(i) === 0 || column_c?.values.get(i) === null
          ? 1
          : column_c?.values.get(i) === 2
          ? 2
          : column_c?.values.get(i) === 3
          ? 3
          : column_c?.values.get(i) === 4
          ? 4
          : 1)
    )?.color;

    row.rowColor = color === undefined ? 'rgb(218, 217, 211)' : color;
    let dummyBody = '';
    fields.forEach(field => {
      if (field.values.get(i)) {
        switch (field.name) {
          case 'Time':
            dummyBody =
              dummyBody + field.name.toUpperCase() + ' : ' + new Date(field.values.get(i)[0]).toUTCString() + '\n';
            break;
          case 'severity':
            dummyBody =
              dummyBody +
              field.name.toUpperCase() +
              ' : ' +
              (field.values.get(i) === 1 || field.values.get(i) === 0 || field.values.get(i) === null
                ? 'Info'
                : field.values.get(i) === 2
                ? 'Warning'
                : field.values.get(i) === 3
                ? 'High'
                : field.values.get(i) === 4
                ? 'Critical'
                : 'Undefined') +
              '\n';
            break;
          default:
            dummyBody = dummyBody + field.name.toUpperCase() + ' : ' + field.values.get(i) + '\n';
        }
      }
    });
    row.cardData = dummyBody;

    rows.push(row);
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <div className={cx(styles.overflow_auto)}>
        <table
          className={cx(
            styles.overflow_auto,
            css`
              width: ${width}px;
              height: ${height}px;
            `
          )}
        >
          <thead className={cx(styles.pug_table)}>
            <th className={cx(styles.pug_table_th)}>
              {timefield?.config.displayName === undefined ? timefield?.name : timefield?.config.displayName}
            </th>
            <th className={cx(styles.pug_table_th)}>
              {column_b?.config.displayName === undefined ? column_b?.name : column_b?.config.displayName}
            </th>
            <th className={cx(styles.pug_table_th)}>
              {column_c?.config.displayName === undefined ? column_c?.name : column_c?.config.displayName}
            </th>
            <th className={cx(styles.pug_table_th)}>
              {column_d?.config.displayName === undefined ? column_d?.name : column_d?.config.displayName}
            </th>
          </thead>
          <tbody className={cx(styles.pug_table)}>
            {rows.map(r => (
              <Row
                timeValue={r.timeValue}
                colum_b_value={r.colum_b_value}
                colum_c_value={r.colum_c_value}
                colum_d_value={r.colum_d_value}
                cardData={r.cardData}
                isCardDisaplyed={r.isCardDisaplyed}
                rowColor={r.rowColor}
              ></Row>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
      overflow: scroll;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
    tableconatiner: css`
      margin: 10px;
      padding: 0;
      border: 1px solid #e5e5e5;
      border-radius: 5px;
    `,
    overflow_auto: css`
      overflow: inherit;
    `,
    pug_table: css`
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
      overflow: inherit;
    `,
    pug_table_td: css`
      border: 1px solid #ddd;
      padding: 8px;
    `,
    pug_table_th: css`
      border-top: 2px solid #696969;
      border-bottom: 2px solid #696969;
      padding: 8px;
      font-weight: bold;
      font-size: 16px;
      text-align: left;
      color: grey;
    `,
  };
});
