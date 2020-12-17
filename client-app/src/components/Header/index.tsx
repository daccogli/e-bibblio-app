import React from 'react';
import { Link } from 'react-router-dom'; 
import './index.scss';
import { Button } from 'react-bootstrap';
import Menu from '../Menu';
 
const Header:React.FC = () => {
 
    return (
    <header> 
        <nav>
            <Link className='route' to='/'>
                <Button variant="light">
                    Home
                </Button>
            </Link>
            <Link className='route' to='/books'>
                <Button variant="light">
                    Books
                </Button>
            </Link> 
            <Link className='route' to='/users'>
                <Button variant="light">
                    Users
                </Button>
            </Link> 
            <Link className='route' to='/lendings'>
                <Button variant="light">
                    Lendings
                </Button>
            </Link> 
            <Link className='route' to='/logs'>
                <Button variant="light">
                    Logs
                </Button>
            </Link> 
        </nav>
    </header>
    )
};
export default Header;
