export enum PageNames {
  Home,
  Games,
  Play,
  Settings,
  Help,
}
export function makePageString(page: PageNames): string {
  if(page === PageNames.Home) {
    return 'Dashboard';
  } else if(page === PageNames.Games) {
    return 'Games';
  } else if(page === PageNames.Play) {
    return 'Play';
  } else if(page === PageNames.Settings) {
    return 'Settings';
  } else if(page === PageNames.Help) {
    return 'Help';
  } else {
    return 'undefined';
  }
}