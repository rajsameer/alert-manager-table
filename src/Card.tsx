import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { DisplayData } from 'types';

export const Card: React.FC<DisplayData> = props => {
  const [bodyDisplay, setbodyDisplay] = useState(props.bodyDisplay);
  return (
    <div
      className={cx(css`
        margin-bottom: 5px;
      `)}
    >
      {' '}
      <div
        className={cx(css`
          display: block;
          padding: 6px 16px;
          font-size: 0.875rem;
          font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
          font-weight: 400;
          line-height: 1.43;
          border-radius: 4px;
          letter-spacing: 0.01071em;
          background-color: ${props.color};
          cursor: pointer;
        `)}
        onClick={() => setbodyDisplay(!bodyDisplay)}
      >
        <div>
          <div
            className={cx(css`
              display: inline-block;
              cursor: pointer;
            `)}
          >
            <i
              className={cx(
                'fa',
                `${props.icon}`,
                'fa-2x',
                css`
                  color: white;
                  cursor: pointer;
                `
              )}
              aria-hidden="true"
            ></i>
          </div>
          <div
            className={cx(css`
              display: inline-block;
              font-weight: 500;
              font-size: 1.3rem;
              margin-left: 10px;
              color: white;
              cursor: pointer;
            `)}
          >
            {'  ' + props.header}
          </div>
        </div>
        <div
          className={cx(css`
            position: relative;
            display: block;
          `)}
        >
          <pre
            className={cx(css`
              display: ${bodyDisplay ? 'block' : 'none'};
            `)}
          >
            {props.body}
          </pre>
        </div>
      </div>
    </div>
  );
};
