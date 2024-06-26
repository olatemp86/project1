import { Theme } from '@material-ui/core/styles';
import { fabRoot, pageContainer, pageContent, pageMainContainer, topActionBar } from 'app/pages/main/main.styles';

export default (theme: Theme): any => ({
  ...fabRoot,
  ...pageContent,
  ...pageMainContainer,
  ...pageContainer,
  ...topActionBar
});
