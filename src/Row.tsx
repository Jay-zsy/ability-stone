import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Check, Close } from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';
import { IconButton } from '@mui/material';

import { getAbilityStoneState } from './ability-stone-selector';
import { facetNodeAC } from './ability-stone-slice';
import AbilityNodes from './AbilityNodes';
import { RowType } from './constants';
import { FlexDiv } from './styled-components';

interface RowOwnProps {
  className?: string;
  type?: RowType;
  rowNumber: string;
}

type RowProps = RowOwnProps;

function Row(props: RowProps) {
  const { className, rowNumber } = props;

  const { maxNodes, facetedNodes } = useSelector(getAbilityStoneState);
  const dispatch = useDispatch();

  const rowNodes = useMemo(() => {
    return facetedNodes[rowNumber];
  }, [facetedNodes, rowNumber]);

  const [idx, setIdx] = useState(rowNodes.length);

  useEffect(() => {
    setIdx(rowNodes.length || 0);
  }, [rowNodes.length])
  
  const successFacetOnClick = useCallback(() => {
    dispatch(facetNodeAC({rowNumber, facet: true}));
  }, [dispatch, rowNumber]);

  const failFacetOnClick = useCallback(() => {
    dispatch(facetNodeAC({rowNumber, facet: false}));
  }, [dispatch, rowNumber]);

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
