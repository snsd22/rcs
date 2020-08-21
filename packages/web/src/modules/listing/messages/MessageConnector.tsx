import React from 'react';
import { ViewMessages } from '@abb/controller';
import { RouteComponentProps } from 'react-router-dom';

import { InputBar } from './InputBar';

export class MessageConnector extends React.PureComponent<
  RouteComponentProps<{
    listingId: string;
  }>
> {
  render() {
    const {
      match: {
        params: { listingId },
      },
    } = this.props;
    return (
      <ViewMessages listingId={listingId}>
        {({ loading, messages }) => {
          if (loading) {
            return <div>...loading</div>;
          }
          return (
            <div>
              {messages.map((m, i) => (
                <div key={`${i}-lm`}>{m.text}</div>
              ))}
              <InputBar listingId={listingId}></InputBar>
            </div>
          );
        }}
      </ViewMessages>
    );
  }
}
