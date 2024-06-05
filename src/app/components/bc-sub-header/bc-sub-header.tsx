import * as CONSTANTS from '../../../constants';
import React from 'react';
import { Toolbar } from '@material-ui/core';
import styled from 'styled-components';


interface BCSubHeaderProps {
    title?: string;
    children?: React.ReactNode;
}

function BCSubHeader({ title, children }: BCSubHeaderProps): JSX.Element {
  return (
    <StyledToolbar>
      <h1 className={'h1-typography title'}>
        {title}
      </h1>
      {children}
    </StyledToolbar>
  );
}

const StyledToolbar = styled(Toolbar)`
  width: 100%;
  background: ${CONSTANTS.PRIMARY_BLUE};
  padding: 20px 40px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: fixed !important;
  z-index: 100;

  .title {
    color: ${CONSTANTS.PRIMARY_WHITE};
    margin: 0;
    font-weight: normal;
  }

  @media (max-width: 600px) {
    display: block !important;
    .title {
      font-size: 24px;
      margin-right: 20px
    }
  }
`;

export default BCSubHeader;
