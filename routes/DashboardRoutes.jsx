import { v4 as uuid } from 'uuid';
/**
 *  All Dashboard Routes
 *
 *  Understanding name/value pairs for Dashboard routes
 *
 *  Applicable for main/root/level 1 routes
 *  icon 		: String - It's only for main menu or you can consider 1st level menu item to specify icon name.
 *
 *  Applicable for main/root/level 1 and subitems routes
 * 	id 			: Number - You can use uuid() as value to generate unique ID using uuid library, you can also assign constant unique ID for react dynamic objects.
 *  title 		: String - If menu contains childern use title to provide main menu name.
 *  badge 		: String - (Optional - Default - '') If you specify badge value it will be displayed beside the menu title or menu item.
 * 	badgecolor 	: String - (Optional - Default - 'primary' ) - Used to specify badge background color.
 *
 *  Applicable for subitems / children items routes
 *  name 		: String - If it's menu item in which you are specifiying link, use name ( don't use title for that )
 *  children	: Array - Use to specify submenu items
 *
 *  Used to segrigate menu groups
 *  grouptitle : Boolean - (Optional - Default - false ) If you want to group menu items you can use grouptitle = true,
 *  ( Use title : value to specify group title  e.g. COMPONENTS , DOCUMENTATION that we did here. )
 *
 */

export const DashboardMenu = [
	{
		id: uuid(),
		title: 'Inicio',
		icon: 'home',
		link: '/'
	},
	{
		id: uuid(),
		title: 'Ventas y Asistencia',
		icon: 'account_balance_wallet',
		children: [
			{ id: uuid(), link: '/components/ventas_asistencia/ventas', name: 'Ventas' },
			{ id: uuid(), link: '/components/ventas_asistencia/asistencia', name: 'Asistencia' },
			{ id: uuid(), link: '', name: 'Detalle de Empleado' }
		]
	},
	{
		id: uuid(),
		title: 'Histórico de Pagos',
		icon: 'history',
		link: '/layout-vertical'
	},
	{
		id: uuid(),
		title: 'Tiendas',
		icon: 'shopping_basket',
		link: '/layout-vertical'
	},
	{
		id: uuid(),
		title: 'Metas',
		icon: 'finance',
		link: '/layout-vertical'
	},
	{
		id: uuid(),
		title: 'Gestión de Incentivos',
		icon: 'credit_card',
		link: '/layout-vertical'
	},
	{
		id: uuid(),
		title: 'Configuraciones',
		icon: 'settings',
		children: [
			{ id: uuid(), link: '/components/usuarios', name: 'Usuarios' },
			{ id: uuid(), link: '/components/roles', name: 'Roles y Permisos' },
			{ id: uuid(), link: '/components/company', name: 'Empresas' },	
			{ id: uuid(), link: '/components/brand', name: 'Marcas' },
			{ id: uuid(), link: '/components/store', name: 'Tiendas' }
		]
	},

	
];

export default DashboardMenu;
