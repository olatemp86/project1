import { Theme } from '@material-ui/core/styles';
import * as CONSTANTS from "../../../constants";

export default (theme: Theme): any => ({
  dialogActions: {
    padding: '35px 60px !important',
    backgroundColor: 'auto'
  },
  dialogContent: {
    padding: '20px 40px !important',
  },
  inputRootSingle: {
    height: 54,
  },
  inputRoot: {
    minHeight: 94,
    alignItems: 'flex-start',
  },
  messageBox: {
    height: '400px',
    width: '100%',
    //padding: '5px',
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#4F4F4F',
  },
  checkboxInput: {
    marginTop: '-6px',
  },
  closeButton: {
    color: '#4F4F4F',
    //borderColor: '#4F4F4F',
    marginRight: '10px',
    height: '34px',
    fontSize: '14px !important',
    padding: '0 12px',
    textTransform:'none',
  },
  submitButton: {
    color: CONSTANTS.PRIMARY_WHITE,
    backgroundColor: `${CONSTANTS.TABLE_ACTION_BUTTON} !important`,
    borderColor: CONSTANTS.TABLE_ACTION_BUTTON,
    '&:hover': {
      backgroundColor: `${CONSTANTS.TABLE_ACTION_BUTTON_HOVER} !important`,
      borderColor: CONSTANTS.TABLE_ACTION_BUTTON_HOVER,
    },
    width: '110px !important',
    height: '34px',
    fontSize: '14px !important',
    padding: '0 12px',
    textTransform:'none',
  },
  submitButtonDisabled : {
    color: `${CONSTANTS.PRIMARY_WHITE}  !important`,
    backgroundColor: `${CONSTANTS.TABLE_HOVER} !important`,
  },
  formField: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  fullWidth: {
    width: '100%',
    marginBottom: '3px',
    '& .MuiOutlinedInput-multiline' : {
      padding: '0 !important',
    }
  },
  grey4 : {
    color: '#BDBDBD',
  }
});