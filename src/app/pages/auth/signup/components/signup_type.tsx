import React, { useEffect, useState } from 'react';
import {Button, ButtonProps} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import styles from '../signup.styles';
import { withStyles } from '@material-ui/core/styles';
import {PRIMARY_BLUE} from "../../../../../constants";

interface Props {
  onSelect: (type: number) => void;
  classes: any
}

const ACCOUNT_TYPES = [
  {
    type: 2,
    title: 'Builder',
    image: <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.8315 13.0982L13.75 15.1797L19.6337 21.0634L21.7152 18.9819L15.8315 13.0982Z"/>
      <path d="M17.3971 10.1043C19.2909 10.1043 20.8314 8.56378 20.8314 6.67C20.8314 6.10089 20.6744 5.57103 20.4291 5.10003L17.7798 7.74936L16.3177 6.28732L18.9671 3.638C18.4961 3.39269 17.9662 3.2357 17.3971 3.2357C15.5033 3.2357 13.9628 4.77623 13.9628 6.67C13.9628 7.07231 14.0413 7.45499 14.1688 7.80823L12.3536 9.62351L10.607 7.87692L11.3036 7.18024L9.92011 5.79671L12.0003 3.7165C10.8523 2.56846 8.98794 2.56846 7.8399 3.7165L4.36634 7.19006L5.74988 8.57359H2.98281L2.28613 9.27027L5.75969 12.7438L6.45637 12.0471V9.27027L7.8399 10.6538L8.53658 9.95713L10.2832 11.7037L3.01224 18.9746L5.09245 21.0549L16.2589 9.89825C16.6121 10.0258 16.9948 10.1043 17.3971 10.1043Z"/>
    </svg>
  }, {
    type: 5,
    title: 'Supplier',
    image: <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.923 15.2946C21.923 17.5029 21.923 19.7115 21.923 21.9213C15.3115 21.9213 8.70001 21.9213 2.07715 21.9213C2.07715 15.7597 2.07715 9.59662 2.07715 3.43359C2.23963 3.82862 2.54336 3.97619 2.95974 3.98527C3.34601 3.99376 3.73131 4.04911 4.11677 4.08662C4.81731 4.15473 5.29872 4.51835 5.51893 5.18565C6.72915 8.85203 7.93082 12.5212 9.14018 16.1879C9.17942 16.3068 9.14645 16.3563 9.05726 16.4233C8.1198 17.127 7.75255 18.0631 7.97153 19.2108C8.22423 20.5352 9.51542 21.5001 10.8276 21.37C12.2982 21.2243 13.367 20.0784 13.3485 18.6549C13.3464 18.4948 13.3969 18.4373 13.5439 18.3893C16.1051 17.5531 18.6634 16.7077 21.2249 15.8727C21.543 15.769 21.7949 15.6138 21.923 15.2946Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.07715 3.12467C2.07715 2.7758 2.07715 2.42694 2.07715 2.07812C8.69245 2.07812 15.3077 2.07812 21.923 2.07812C21.923 6.38061 21.923 10.6831 21.923 14.9856C21.6605 14.4734 21.4165 14.3752 20.8559 14.5595C18.2839 15.4049 15.712 16.2507 13.1403 17.0972C13.0481 17.1275 12.973 17.165 12.8928 17.0532C12.333 16.2734 11.5611 15.8989 10.6082 15.8899C10.4967 15.8888 10.4501 15.8496 10.4187 15.7485C10.3173 15.4222 10.208 15.0984 10.1011 14.7739C9.01277 11.4674 7.92618 8.1604 6.83493 4.85494C6.45331 3.69894 5.66736 2.98877 4.4592 2.79029C3.97628 2.71094 3.48288 2.69672 2.99482 2.64758C2.47893 2.59575 2.30461 2.68364 2.07715 3.12467ZM17.9946 3.43423C17.9287 3.45131 17.7963 3.47834 17.6686 3.52007C15.0397 4.37899 12.4114 5.23948 9.78299 6.09991C9.18742 6.29483 9.01612 6.63218 9.21191 7.22996C10.0423 9.76645 10.8732 12.3027 11.7047 14.8388C11.8933 15.4143 12.2474 15.5914 12.8251 15.4022C15.4535 14.5419 18.0819 13.6812 20.7102 12.8208C21.3167 12.6222 21.4869 12.2854 21.2884 11.6798C20.722 9.95234 20.1564 8.22461 19.5902 6.4971C19.3211 5.67618 19.052 4.85531 18.7821 4.03472C18.6561 3.65158 18.3999 3.43899 17.9946 3.43423Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.07715 3.12318C2.30461 2.68216 2.47899 2.59426 2.99488 2.6461C3.48293 2.69518 3.97634 2.70945 4.45926 2.7888C5.66747 2.98729 6.45342 3.69751 6.83499 4.85345C7.92623 8.15891 9.01282 11.4659 10.1011 14.7724C10.208 15.097 10.3174 15.4207 10.4187 15.747C10.4501 15.8482 10.4967 15.8874 10.6082 15.8884C11.5611 15.8975 12.333 16.2719 12.8928 17.0517C12.9731 17.1635 13.0482 17.1261 13.1404 17.0957C15.7121 16.2492 18.2839 15.4033 20.8559 14.558C21.4166 14.3737 21.6606 14.4719 21.923 14.9842C21.923 15.0876 21.923 15.1909 21.923 15.2943C21.795 15.6135 21.5431 15.7687 21.225 15.8724C18.6634 16.7073 16.1052 17.5528 13.544 18.389C13.3969 18.437 13.3465 18.4945 13.3486 18.6546C13.367 20.0782 12.2982 21.224 10.8277 21.3697C9.51547 21.4998 8.22428 20.5349 7.97158 19.2105C7.75261 18.0627 8.11985 17.1266 9.05731 16.423C9.1465 16.356 9.17947 16.3065 9.14023 16.1876C7.93088 12.5209 6.72915 8.85167 5.51899 5.18529C5.29877 4.51799 4.81736 4.15437 4.11682 4.08626C3.73136 4.04875 3.34601 3.9934 2.9598 3.98491C2.54342 3.97583 2.23969 3.82826 2.0772 3.43324C2.07715 3.32988 2.07715 3.22653 2.07715 3.12318Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9946 3.43359C18.3999 3.43835 18.6561 3.65095 18.7822 4.03403C19.0521 4.85462 19.3213 5.67549 19.5903 6.4964C20.1565 8.22392 20.7221 9.95165 21.2885 11.6791C21.487 12.2847 21.3168 12.6216 20.7103 12.8201C18.0819 13.6805 15.4536 14.5412 12.8252 15.4015C12.2475 15.5907 11.8934 15.4136 11.7048 14.8381C10.8733 12.302 10.0424 9.76576 9.212 7.22927C9.01627 6.63143 9.18757 6.29413 9.78308 6.09922C12.4115 5.23878 15.0398 4.3783 17.6687 3.51938C17.7964 3.47776 17.9289 3.45073 17.9946 3.43359Z" fill="#00AAFF"/>
    </svg>
  }, {
    type: 1,
    title: 'Service Provider',
    image: <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 16H16V15H8V16H6V15H2V20H22V15H18V16Z"/>
      <path d="M20 8H17V6C17 4.9 16.1 4 15 4H9C7.9 4 7 4.9 7 6V8H4C2.9 8 2 8.9 2 10V14H6V12H8V14H16V12H18V14H22V10C22 8.9 21.1 8 20 8ZM15 8H9V6H15V8Z"/>
    </svg>
  }, {
    type: 4,
    title: 'Contractor',
    image: <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1902 2.08203C12.6012 2.27175 12.7438 2.59651 12.7194 3.03962C12.6946 3.48978 12.7158 3.94235 12.7134 4.39384C12.7109 4.85422 12.4151 5.176 11.9995 5.176C11.584 5.176 11.2883 4.85384 11.2861 4.39371C11.2839 3.94222 11.305 3.48959 11.28 3.03943C11.2554 2.59625 11.3979 2.27143 11.8093 2.08203C11.9362 2.08203 12.0632 2.08203 12.1902 2.08203Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.143 3.03125C15.8931 3.96858 16.8279 5.37861 17.0058 7.3209C17.0936 7.3209 17.179 7.31671 17.2639 7.32166C17.6533 7.34446 17.952 7.65614 17.9512 8.03563C17.9503 8.415 17.6509 8.72433 17.2609 8.747C17.1976 8.75068 17.134 8.74839 17.0705 8.74839C13.6907 8.74846 10.3108 8.74858 6.93104 8.74782C6.82824 8.74782 6.72272 8.75233 6.62317 8.73176C6.27047 8.659 6.02774 8.33817 6.05028 7.98896C6.07345 7.62954 6.36583 7.34369 6.73555 7.3216C6.81383 7.31696 6.89275 7.3209 6.99263 7.3209C7.16805 5.38427 8.10577 3.96389 9.85834 3.03188C9.85834 3.55144 9.85244 4.01811 9.85948 4.48465C9.87605 5.57684 10.6807 6.46058 11.7741 6.5955C12.7994 6.72198 13.8223 6.03487 14.0592 4.99963C14.1548 4.58198 14.1224 4.1343 14.1413 3.69995C14.1503 3.49544 14.143 3.28998 14.143 3.03125Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.71595 10.1875C10.589 10.1875 13.425 10.1875 16.2601 10.1875C16.4171 12.0361 16.1247 13.7397 14.2218 14.9213C12.8406 15.7789 11.3699 15.8025 9.94687 15.0197C8.51627 14.2327 7.78236 12.9737 7.71817 11.3375C7.70331 10.9594 7.71595 10.5803 7.71595 10.1875Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.95996 21.9184C8.95996 20.8667 8.95996 19.8296 8.95996 18.7539C9.0486 18.8041 9.12085 18.8419 9.19012 18.8846C9.97933 19.3703 10.7714 19.8515 11.5553 20.3457C11.8737 20.5464 12.1701 20.5486 12.4874 20.35C13.273 19.8584 14.0637 19.3751 14.8527 18.889C14.9189 18.8482 14.9873 18.8112 15.0774 18.7595C15.0774 19.8218 15.0774 20.8615 15.0774 21.9184C13.0495 21.9184 11.0169 21.9184 8.95996 21.9184Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.95325 16.1165C11.0188 17.2836 13.0433 17.2735 15.0936 16.0898C15.0936 16.407 15.0985 16.7036 15.0884 16.9996C15.0868 17.0458 15.024 17.1027 14.9759 17.1325C14.0328 17.7177 13.0888 18.3013 12.1402 18.8774C12.0832 18.9121 11.9682 18.9114 11.9108 18.8766C10.9622 18.3006 10.0177 17.7177 9.07573 17.1308C9.01979 17.096 8.9617 17.0154 8.95871 16.9535C8.94595 16.6856 8.95325 16.4167 8.95325 16.1165Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5696 21.9207C20.5702 21.5278 20.5707 21.1348 20.5702 20.7419C20.5689 19.486 19.7523 18.4282 18.5343 18.1073C17.9827 17.9621 17.4284 17.8277 16.8754 17.6883C16.7645 17.6604 16.6536 17.6325 16.5303 17.6016C16.5303 19.0582 16.5303 20.4849 16.5303 21.9098C16.5425 21.9134 16.5534 21.9171 16.5653 21.9208H20.5696V21.9207Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.46941 21.9178C7.483 21.9145 7.49576 21.911 7.50992 21.9078C7.50992 20.4766 7.50992 19.0455 7.50992 17.5977C6.82522 17.7693 6.15741 17.9347 5.49062 18.1043C4.24649 18.4206 3.43043 19.4739 3.42973 20.7635C3.42954 21.1483 3.43005 21.5331 3.43068 21.9179H7.46941V21.9178Z"/>
    </svg>
  },
]

function SignUpAccountType({onSelect, classes }: Props): JSX.Element {
  return (
    <>
      <p className={classes.Description}>
        {'Please select your account type'}
      </p>
      <Grid
        container
        style={{padding: 20}}
        spacing={2}>
        {ACCOUNT_TYPES.map((account) => <Grid
          item
          md={6}
          xs={12}
          key={account.title}
        >
          <ButtonType
            onClick={() => onSelect(account.type)}
            startIcon={account.image}
          >{account.title}</ButtonType>
        </Grid>)}
      </Grid>
    </>
  )
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(SignUpAccountType);


const ButtonType = withStyles({
  root: {
    color: 'grey',
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: '2px 2px 4px #ccc',
    marginBottom: 5,
    "&:active": {
      backgroundColor: PRIMARY_BLUE,
      color: 'white',
      "& svg": {
        fill: 'white',
      }
    }
  },
  startIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 30,
    fill: PRIMARY_BLUE,
  }
})((props: ButtonProps) => (
  <Button
    fullWidth={true}
    size={'large'}
    type={'button'}
    variant={'text'}
    {...props}
  />
));

