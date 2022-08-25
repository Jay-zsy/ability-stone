import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Replay, Undo } from '@mui/icons-material';
import { IconButton, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';

import { getAbilityStoneState } from './ability-stone-selector';
import { changeMaxNodesAC, resetNodes, undoFacetNodeAC } from './ability-stone-slice';
import { maxNumOfNodes, probability } from './constants';
import { numToPercent } from './helpers';
import { FlexDiv } from './styled-components';

interface HeaderOwnProps {}

type HeaderProps = HeaderOwnProps;


function Header(props: HeaderProps) {
  // const {  } = props;

  const { maxNodes, pIndex } = useSelector(getAbilityStoneState);
  const dispatch = useDispatch();

  const maxNodesOnChange = useCallback((e: SelectChangeEvent) => {
    dispatch(changeMaxNodesAC({ number: Number(e.target.value)}))
  }, [dispatch]);

  const undoOnClick = useCallback(() => {
    dispatch(undoFacetNodeAC());
  }, [dispatch]);

  const resetOnClick = useCallback(() => {
    dispatch(resetNodes());
  }, [dispatch]);

  return (
    <FlexDiv>
      <Typography>
        {'Max Nodes'}
      </Typography>
      <Select onChange={maxNodesOnChange} value={String(maxNodes)}>
        {maxNumOfNodes.map((n) => (<MenuItem key={n} value={n}>{n}</MenuItem>))}
      </Select>
      <IconButton onClick={undoOnClick}>
        <Undo/>
      </IconButton>
      <IconButton onClick={resetOnClick}>
        <Replay/>
      </IconButton>
      <Typography>
        {'Next'}
      </Typography>
      <FlexDiv orientation='vertical'>
        <Typography>
          {'Success'}
        </Typography>
        <Typography>
          {numToPercent(probability[pIndex])}
        </Typography>
      </FlexDiv>
      <FlexDiv orientation='vertical'>
        <Typography>
          {'Fail'}
        </Typography>
        <Typography>
          {numToPercent(1 - probability[pIndex])}
        </Typography>
      </FlexDiv>
    </FlexDiv>
  );
}

export default React.memo(Header);
