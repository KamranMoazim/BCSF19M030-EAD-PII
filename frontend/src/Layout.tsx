import React, { ReactNode } from 'react';
import Sidebar from './components/Sidebar';

interface Props {
    children:ReactNode
}

const Layout = ({ children }:Props) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
