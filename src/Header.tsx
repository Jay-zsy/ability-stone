import { IconButton, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { FacetHistory, IFC, MaxNumOfNodes, maxNumOfNodes } from './constants';
import { Replay, Undo } from '@mui/icons-material';
import { FlexDiv } from './styled-components';


interface HeaderOwnProps {
  maxNodes: MaxNumOfNodes;
  history: FacetHistory;
  setMaxNodes: React.Dispatch<React.SetStateAction<MaxNumOfNodes>>;
  setHistory: React.Dispatch<React.SetStateAction<FacetHistory>>;
  setFacetedNodes: React.Dispatch<React.SetStateAction<IFC>>;
}

type HeaderProps = HeaderOwnProps;


function Header(props: HeaderProps) {
  const { maxNodes, history, setMaxNodes, setHistory, setFacetedNodes } = props;

  const maxNodesOnChange = useCallback((e: SelectChangeEvent) => {
    const value = Number(e.target.value) as MaxNumOfNodes;
    if (value <= 10  && value >= 6) {
      setMaxNodes(() => value);
    }
  }, [setMaxNodes]);

  const undoOnClick = useCallback(() => {
    if (!history.length) {
      return;
    }
    // console.log(history.length)
    let row: number | undefined = undefined;
    setHistory((ps) => {
      const temp = ps;
      row = temp.pop()?.rowNumber;
      console.log(temp)
      return temp;
    });
    const rowNum = `r${row}` as keyof IFC;
    setFacetedNodes((ps) => {
      const r = ps[rowNum];
      r.pop();
      return { ...ps, [rowNum]: r };
    });
  }, [history.length, setFacetedNodes, setHistory]);

  const resetOnClick = useCallback(() => {
    setHistory(() => []);
    setFacetedNodes(() => { return { r1: [], r2: [], r3: [] }; });
  }, [setFacetedNodes, setHistory]);

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
    </FlexDiv>
  );
}

export default React.memo(Header);
