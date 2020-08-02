import { MenuItemRole } from './menu-item';
import { MenuRole } from './menu.types';

export const MENU_ROLES_LOOKUP: Record<MenuRole, MenuItemRole> = {
	navigation: MenuItemRole.Link,
	menu: MenuItemRole.MenuItem,
};
