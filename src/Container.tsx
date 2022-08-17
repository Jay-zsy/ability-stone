import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { FacetHistory, IFC, MaxNumOfNodes, rows } from './constants';
import Header from './Header';
import Row from './Row';

interface ContainerOwnProps {
  className?: string;
}

type ContainerProps = ContainerOwnProps;

function Container(props: ContainerProps) {
  const { className } = props;

  const [maxNodes, setMaxNodes] = useState<MaxNumOfNodes>(9);
  const [facetedNodes, setFacetedNodes] = useState<IFC>({
    r1: [],
    r2: [],
    r3: [],
  });
  const [history, setHistory] = useState<FacetHistory>([]);

  const facet = useCallback((rowNumber: number, facet: boolean) => {
    setHistory((ps) => [...ps, { rowNumber, facet }]);
    const idxKey = `r${rowNumber}` as keyof IFC;
    setFacetedNodes((ps) => {
      let row = ps[idxKey];
      row = [...row, facet];
      return {...ps, [idxKey]: row};
    })
  }, []);

  // useEffect(() => {
  //   console.log({history, facetedNodes});
  // }, [facetedNodes, history])
  

  return (
    <div className={classNames(className)}>
      <Header maxNodes={maxNodes} setMaxNodes={setMaxNodes} history={history} setHistory={setHistory} setFacetedNodes={setFacetedNodes}/>
      {rows.map(({ type, rowNumber }, i) => (
        <Row
        key={rowNumber}
        type={type}
        maxNodes={maxNodes}
        facet={facet}
        rowNumber={rowNumber}
        facetedNodes={facetedNodes}
        />
      ))}
    </div>
  );
}

export default React.memo(Container);
