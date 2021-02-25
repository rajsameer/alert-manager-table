import React from 'react';
import { FieldType, getTimeZoneInfo, PanelProps, ValueMapping, ValueMap, MappingType } from '@grafana/data';
import { SimpleOptions, RowData } from 'types';
import { stylesFactory } from '@grafana/ui';
import { css, cx } from 'emotion';
import { ListWarpper } from './List';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = getStyles();
  const frame = data.series[0];
  const timefield = frame.fields.find((field) =>
    options.timefield ? field.name === options.timefield : field.type === FieldType.time
  );
  const column_b = frame.fields.find((field) =>
    options.column_b ? field.name === options.column_b : field.type === FieldType.string
  );
  const column_c = frame.fields.find((field) =>
    options.column_c ? field.name === options.column_c : field.type === FieldType.string
  );
  const column_d = frame.fields.find((field) =>
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
      rowColor: 'none',
      isCardDisaplyed: false,
      rowSize: 35,
    };
    //row.timeValue = new Date(timefield?.values.get(i)[0] + -1 * timeZoneOffset * 60 * 1000).toString();
    if (typeof timefield?.values.get(i) === 'object') {
      row.timeEpoch = timefield?.values.get(i)[0];
      row.timeValue = new Date(timefield?.values.get(i)[0]).toLocaleString(navigator.language, {
        timeZone: timeZoneInfo?.ianaName,
      });
    } else {
      row.timeEpoch = timefield?.values.get(i);
      row.timeValue = new Date(timefield?.values.get(i)).toLocaleString(navigator.language, {
        timeZone: timeZoneInfo?.ianaName,
      });
    }

    row.colum_b_value = column_b?.values.get(i);
    const mapping = column_c?.config.mappings ? column_c.config.mappings : undefined;
    if (mapping && mapping.length > 0) {
      const valueMap = mapping as ValueMapping[];
      valueMap.forEach((v) => {
        if (v.type === MappingType.ValueToText) {
          const value = v as ValueMap;
          if (value.value === String(column_c?.values.get(i))) {
            row.colum_c_value = value.text;
          }
        }
      });
    } else {
      row.colum_c_value = column_c?.values.get(i);
    }

    row.colum_d_value = column_d?.values.get(i);
    let color = column_c?.config.thresholds?.steps.find((s) => s.value === parseInt(column_c?.values.get(i), 10))
      ?.color;

    row.rowColor = color === undefined ? 'rgb(218, 217, 211)' : color;
    let dummyBody = '';
    fields.forEach((field) => {
      if (field.values.get(i)) {
        switch (field.name) {
          case 'Time':
            dummyBody =
              dummyBody +
              field.name.toUpperCase() +
              ' : ' +
              (typeof field.values.get(i) === 'number'
                ? new Date(field.values.get(i)).toUTCString()
                : new Date(field.values.get(i)[0]).toUTCString()) +
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

  rows.sort((a: RowData, b: RowData) => {
    const time1 = a.timeEpoch === undefined ? 0 : a.timeEpoch;
    const time2 = b.timeEpoch === undefined ? 0 : b.timeEpoch;
    return time2 - time1;
  });

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
      <div className={cx(styles.table)}>
        <div className={cx(styles.table_header)}>
          <div className={cx(styles.table_header_cell)}>
            {timefield?.config.displayName === undefined ? timefield?.name : timefield?.config.displayName}
          </div>
          <div className={cx(styles.table_header_cell)}>
            {column_b?.config.displayName === undefined ? column_b?.name : column_b?.config.displayName}
          </div>
          <div className={cx(styles.table_header_cell)}>
            {column_c?.config.displayName === undefined ? column_c?.name : column_c?.config.displayName}
          </div>
          <div className={cx(styles.table_header_cell)}>
            {column_d?.config.displayName === undefined ? column_d?.name : column_d?.config.displayName}
          </div>
        </div>
        <div className={cx(styles.table_header)}>
          <ListWarpper rows={rows} height={height} width={width} />
        </div>
      </div>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
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
    table: css`
      overflow: inherit;
    `,
    table_header: css`
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
      border-bottom: 2px solid #696969;
    `,
    table_header_cell: css`
      position: relative;
      width: 25%;
      padding: 4px;
      display: inline-block;
      font-weight: bold;
      font-size: 16px;
      text-align: left;
      color: grey;
    `,
  };
});
