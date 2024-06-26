import { Theme } from '@material-ui/core/styles';
import { pageContainer, pageContent, pageMainContainer, dataContainer, fabRoot, topActionBar } from 'app/pages/main/main.styles';
export default (theme: Theme): any => ({
    ...pageContainer,
    ...pageContent,
    ...pageMainContainer,
    ...dataContainer,
    ...fabRoot,
    ...topActionBar,
    'addButtonArea': {
        'display': 'flex',
        'justifyContent': 'flex-end',
        'padding': '12px 30px 5px 0',
        'position': 'absolute',
        'right': '0',
        'zIndex': '1000'
    },
    capitalize: {
      textTransform: 'capitalize'
    },
});
