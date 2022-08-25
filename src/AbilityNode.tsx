import Checkbox, { CheckboxProps } from '@mui/material/Checkbox/Checkbox';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import SquareIcon from '@mui/icons-material/Square';
import styled from '@emotion/styled';

interface AbilityNodeOwnProps {
  className?: string;
  index: number;
  currentIndex: number;
  rowNumber: string;
  rowNodes: boolean[];
}

type AbilityNodeProps = AbilityNodeOwnProps;

function makeNodeColor(rowNumber: string, disabled?: boolean) {
  return rowNumber === 'r3' ? `rgba(0, 128, 185, ${disabled ? 0.26 : 1})` : `rgba(192, 68, 68, ${disabled ? 0.26 : 1})`;
}

const StyledCheckbox = styled(Checkbox)<CheckboxProps & { rownumber: string }>(({ rownumber }) => ({
  transform: 'rotate(45deg)',
  color: makeNodeColor(rownumber),
  pointerEvents: 'none',
}));

function AbilityNode(props: AbilityNodeProps) {
  const { className, index, currentIndex, rowNumber, rowNodes } = props;

  const disabled = useMemo(() => {
    return !rowNodes[index]
  }, [index, rowNodes])

  return (
    <div className={classNames(className)}>
      <StyledCheckbox
      checked={currentIndex > index}
      checkedIcon={<SquareIcon htmlColor={makeNodeColor(rowNumber, disabled)}/>}
      rownumber={rowNumber} />
    </div>
  );
}

export default React.memo(AbilityNode);
