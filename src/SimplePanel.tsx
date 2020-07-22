import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions, DisplayData } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { Card } from './Card'

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = getStyles();
  const uiData : DisplayData[] = [];
  data.series.forEach((series,sIndex) => {
    let numberOfRows = series.fields.find(field => field.name === "Time")?.values?.length ?? 0;
    for(let vIndex = 0; vIndex < numberOfRows; vIndex++) {
      const uiRow  = {} as DisplayData;
      uiRow.header = series.fields.find(field => field.name === "alertname")?.values.get(vIndex);
      const severity = series.fields.find(field => field.name === "severity")?.values.get(vIndex);
      switch (true) {
        case severity === 1 ||severity === 0 ||severity == null:
          uiRow.icon = 'fa-info';
          uiRow.color = "#868686"
        break;
        case severity === 2:
          uiRow.icon = 'fa-exclamation';
          uiRow.color = "#ed980e"
        break;
        case severity === 3:
          uiRow.icon = 'fa-bolt';
          uiRow.color = "#f64b5e"
        break;
        case severity === 4:
          uiRow.icon = 'fa-bolt';
          uiRow.color = "#f64b5e"
        break;
        default:
      }
      let dummyBody  = '\n'
      series.fields.forEach(field => {
        if(field.values.get(vIndex)) {
          switch (field.name) {
            case "Time":
              dummyBody = dummyBody + field.name.toUpperCase() + ' : ' + new Date(field.values.get(vIndex)[0]).toUTCString() + '\n'
            break;
            case "severity":
              dummyBody = dummyBody + field.name.toUpperCase() + ' : ' + 
              (field.values.get(vIndex) === 1 ||field.values.get(vIndex) === 0 ||field.values.get(vIndex) == null ? 'Info' : 
              (field.values.get(vIndex) == 2 ? 'Warning' : 
              (field.values.get(vIndex) == 3 ? 'High' :
              (field.values.get(vIndex) == 4 ? 'Critical': 'Undefined')))) + '\n'
            break;
            default:
              dummyBody = dummyBody + field.name.toUpperCase() + ' : ' + field.values.get(vIndex) + '\n'
          }
           
        }
      })
      uiRow.body = dummyBody
      uiData.push(uiRow)
    }
    
  })
  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
          overflow: auto;
        `
      )}
    >
      {
        uiData.map((row,i) => {
          return <Card header={row.header} icon={row.icon} body={row.body} bodyDisplay={false} color={row.color}></Card>
        })
            
      }

      
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
  };
});
