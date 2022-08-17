import { IconButton } from '@mui/material';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IFC, RowType } from './constants';
import StarIcon from '@mui/icons-material/Star';
import { Check, Close } from '@mui/icons-material';
import AbilityNodes from './AbilityNodes';
import { FlexDiv } from './styled-components';

interface RowOwnProps {
  className?: string;
  type?: RowType;
  maxNodes: number;
  facet: (rowNumber: number, facet: boolean) => void;
  rowNumber: number;
  facetedNodes: IFC;
}

type RowProps = RowOwnProps;

function Row(props: RowProps) {
  const { className, maxNodes, facet, rowNumber, facetedNodes } = props;

  const rowNodes = useMemo(() => {
    const idxKey = `r${rowNumber}` as keyof IFC;
    return facetedNodes[idxKey];
  }, [facetedNodes, rowNumber]);

  const [idx, setIdx] = useState(rowNodes.length);

  useEffect(() => {
    setIdx(rowNodes.length || 0);
  }, [rowNodes.length])
  
  const successFacetOnClick = useCallback(() => {
    facet(rowNumber, true);
  }, [facet, rowNumber]);

  const failFacetOnClick = useCallback(() => {
    facet(rowNumber, false);
  }, [facet, rowNumber]);

  return (
    <FlexDiv className={classNames(className)}>
      <FlexDiv>
        <AbilityNodes maxNodes={maxNodes} currentIndex={idx} rowNumber={rowNumber} rowNodes={rowNodes}/>
      </FlexDiv>
      <StarIcon />
      <IconButton onClick={successFacetOnClick} disabled={idx >= maxNodes}><Check/></IconButton>
      <IconButton onClick={failFacetOnClick} disabled={idx >= maxNodes}><Close/></IconButton>
    </FlexDiv>
  );
}

export default React.memo(Row);
