import {MenuItem} from './menu.model';
import {MobileFooterOptions} from "../footer/footer.component";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'SIDEMENU.HOME',
    icon: 'bx-home-circle',
    route: 'home'
  },
  {
    id: 2,
    label: 'SIDEMENU.CONTACT-US',
    icon: 'bxs-contact',
  },
  {
    id: 3,
    label: 'SIDEMENU.SETTINGS',
    icon: 'bxs-cog',
    route: 'settings'
  },
];
export const MENU_MOBILE: MenuItem[] = [
  {
    id: MobileFooterOptions.Terms_Of_Use,
    label: 'SIDEMENU.Terms_Of_Use',
  },
  {
    id: MobileFooterOptions.Privacy_Policy,
    label: 'SIDEMENU.Privacy_Policy',
  },
  {
    id: MobileFooterOptions.Technical_Support,
    label: 'SIDEMENU.Technical_Support',
  },
  {
    id: MobileFooterOptions.Accessibility_Statement,
    label: 'SIDEMENU.Accessibility_Statement',
  },
  {
    id: MobileFooterOptions.FAQ,
    label: 'SIDEMENU.FAQ',
  }
];
