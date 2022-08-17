import React from 'react';
import AbilityNode from './AbilityNode';

interface AbilityNodesOwnProps {
  maxNodes: number;
  currentIndex: number;
  rowNumber: number;
  rowNodes: boolean[];
}

type AbilityNodesProps = AbilityNodesOwnProps;

function AbilityNodes(props: AbilityNodesProps) {
  const { currentIndex, rowNumber, maxNodes, rowNodes } = props;
  
  return (
    <>
      {Array.from({ length: maxNodes }).map((_, i) => (
        <AbilityNode key={i} index={i} currentIndex={currentIndex} rowNumber={rowNumber} rowNodes={rowNodes}/>
      ))}
    </>
  );
}

export default React.memo(AbilityNodes);
