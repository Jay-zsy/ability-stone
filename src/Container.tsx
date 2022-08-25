import classNames from 'classnames';
import React from 'react';

import { rows } from './constants';
import Header from './Header';
import Row from './Row';

interface ContainerOwnProps {
  className?: string;
}

type ContainerProps = ContainerOwnProps;

function Container(props: ContainerProps) {
  const { className } = props;

  return (
    <div className={classNames(className)}>
      <Header/>
      {rows.map(({ type, rowNumber }, i) => (
        <Row
        key={rowNumber}
        type={type}
        rowNumber={rowNumber}
        />
      ))}
    </div>
  );
}

export default React.memo(Container);
