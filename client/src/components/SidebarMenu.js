import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogout } from '../actions';

const SidebarMenu = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(
            setLogout({
                user: null,
                token: null
            })
        );
    };

    useEffect(() => {
        const handleResize = () => {
            setIsSidebarVisible(window.innerWidth > 767);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check on component mount

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const renderSidebarMenu = () => (
        <Sidebar
            as={Menu}
            inverted
            animation='overlay'
            visible={isSidebarVisible}
            icon='labeled'
            vertical
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '5px'
            }}
        >
            <Link to='/dashboard'>
                <Menu.Item name='home'>
                    <Icon name='home' />
                    Dashboard
                </Menu.Item>
            </Link>
            <Link to='/inbox'>
                <Menu.Item name='user'>
                    <Icon name='inbox' />
                    Inbox
                </Menu.Item>
            </Link>
            <Link to='/projects'>
                <Menu.Item name='projects'>
                    <Icon name='folder open' />
                    Projects
                </Menu.Item>
            </Link>
            <Link to='/teams'>
                <Menu.Item name='team'>
                    <Icon name='group' />
                    Teams
                </Menu.Item>
            </Link>
            <Link to='/calendar'>
                <Menu.Item name='calendar'>
                    <Icon name='calendar' />
                    Calendar
                </Menu.Item>
            </Link>
            <Link to='/reports'>
                <Menu.Item name='reports'>
                    <Icon name='chart pie' />
                    Reports
                </Menu.Item>
            </Link>
            <Link to='/account'>
                <Menu.Item name='account'>
                    <Icon name='user circle' />
                    Account
                </Menu.Item>
            </Link>
            <div>
                <Link to='/' onClick={handleSignOut}>
                    <Menu.Item name='log out' style={{ justifyContent: 'center' }}>
                        <Icon name='log out' />
                        Logout
                    </Menu.Item>
                </Link>
            </div>
        </Sidebar>
    );

    const renderDropdownMenu = () => (
        <Dropdown
            icon='bars'
            floating
            button
            className='icon'
            style={{
                position: 'fixed',
                top: '10px',
                right: '10px',
                zIndex: 999
            }}
        >
            <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/dashboard'>
                    <Icon name='home' />
                </Dropdown.Item>
                <Dropdown.Item as={Link} to='/inbox'>
                    <Icon name='inbox' />

                </Dropdown.Item>
                <Dropdown.Item as={Link} to='/projects'>
                    <Icon name='folder open' />

                </Dropdown.Item>
                <Dropdown.Item as={Link} to='/teams'>
                    <Icon name='group' />

                </Dropdown.Item>
                <Dropdown.Item as={Link} to='/reports'>
                    <Icon name='chart pie' />

                </Dropdown.Item>
                <Dropdown.Item as={Link} to='/account'>
                    <Icon name='user circle' />

                </Dropdown.Item>
                <Dropdown.Item as={Link} to='/' onClick={handleSignOut}>
                    <Icon name='log out' />

                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );

    return (
        <>
            {isSidebarVisible ? renderSidebarMenu() : renderDropdownMenu()}
        </>
    );
};

export default SidebarMenu;
