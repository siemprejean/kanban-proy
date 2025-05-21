'use client';

import { useEffect, useState } from 'react';
import 'styles/theme.scss';
import NavbarVertical from '../navbar/NavbarVertical';
import NavbarTop from '../navbar/NavbarTop';
import {Loading} from '../ui/loading';

export default function DashboardLayout({ children }) {
	const [showMenu, setShowMenu] = useState(true);
	const [loading, setLoading] = useState(true);

	const ToggleMenu = () => {
		setShowMenu(!showMenu);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1000); // Simulate 1-second loading time

		return () => clearTimeout(timer);
	}, []);

	if (loading) {
		return <Loading/>;
	}

	return (
		<div>
			<div id="db-wrapper" className={`${showMenu ? '' : 'toggled'}`}>
				<div className="navbar-vertical navbar">
					<NavbarVertical
						showMenu={showMenu}
						onClick={(value) => setShowMenu(value)}
					/>
				</div>
				<div id="page-content">
					<div
						className="header"
						style={{
							backgroundColor: '#ffffff',
							padding: '16px 24px',
							borderBottom: '1px solid #e0e0e0',
							boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
							position: 'sticky',
							top: 0,
							zIndex: 1000
						}}
					>
						<NavbarTop
							data={{
								showMenu: showMenu,
								SidebarToggleMenu: ToggleMenu
							}}
						/>
					</div>
					{children}
				</div>
			</div>
		</div>
	);
}
