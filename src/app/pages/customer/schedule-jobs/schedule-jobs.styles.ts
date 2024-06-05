import { Theme } from '@material-ui/core/styles';
import { dataContainer, fabRoot, pageContainer, pageContent, pageMainContainer, topActionBar } from 'app/pages/main/main.styles';
export default (theme: Theme): any => ({
  ...fabRoot,
  ...pageContent,
  ...pageMainContainer,
  ...pageContainer,
  ...topActionBar,
  ...dataContainer,
  'addButtonArea': {
    'display': 'flex',
    'justifyContent': 'flex-end',
    'padding': '20px 30px 5px 0',
    'position': 'absolute',
    'right': '0',
    'top': 55,
    zIndex: 99,
  },
});
