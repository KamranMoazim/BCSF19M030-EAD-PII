import React, { ReactNode } from 'react';
import Sidebar from './components/Sidebar';

interface Props {
    children:ReactNode
}

const Layout = ({ children }:Props) => {
    return (
        <div className="container-fluid">
                <Sidebar />
                <main role="main" className="">
                    {children}
                </main>
        </div>
    );
};

export default Layout;
