import { FieldConfigProperty, FieldType, PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';
import { FieldSelectEditor } from './FieldSelectEditor';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel)
  .setPanelOptions((builder) => {
    return builder
      .addTextInput({
        path: 'text',
        name: 'Simple text option',
        description: 'Description of panel option',
        defaultValue: 'Default value of text input option',
      })
      .addCustomEditor({
        id: 'timeField',
        path: 'timeField',
        name: 'timeField',
        description: 'Field which is time',
        editor: FieldSelectEditor,
        category: ['Dimensions'],
        settings: {
          filterByType: FieldType.time,
        },
      })
      .addCustomEditor({
        id: 'column_b',
        path: 'column_b',
        name: 'column_b',
        description: 'Field to use for second column',
        editor: FieldSelectEditor,
        category: ['Dimensions'],
      })
      .addCustomEditor({
        id: 'column_c',
        path: 'column_c',
        name: 'column_c',
        description: 'Field to use for third column',
        editor: FieldSelectEditor,
        category: ['Dimensions'],
      })
      .addCustomEditor({
        id: 'column_d',
        path: 'column_d',
        name: 'column_d',
        description: 'Field to use for forth column',
        editor: FieldSelectEditor,
        category: ['Dimensions'],
      });
  })
  .useFieldConfig({
    standardOptions: {
      [FieldConfigProperty.Decimals]: { defaultValue: 0 },
      [FieldConfigProperty.Unit]: {},
      [FieldConfigProperty.Mappings]: {},
      [FieldConfigProperty.DisplayName]: {},
      [FieldConfigProperty.Thresholds]: {},
    },
  });
