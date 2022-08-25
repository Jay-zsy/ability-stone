import styled from "@emotion/styled";

type Orientation = 'horizontal' | 'vertical';

function getOrientation(o: Orientation) {
  if (o === 'horizontal') {
    return 'row';
  } else {
    return 'column';
  }
}

export const FlexDiv = styled("div")<{ orientation?: Orientation  }>(({ orientation = 'horizontal' }) => ({
  display: 'flex',
  flexDirection: getOrientation(orientation),
  alignItems: 'center',
}));

export const ContainerDiv = styled("div")({
  height: '100vh',
});