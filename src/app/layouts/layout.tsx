import { ReactNode } from "react";
import Header from "./header/header";
import "./layout.scss";
import Sidebar from "./sidebar/sidebar";

interface LayoutProps {
    children: ReactNode;
}
function Layout({ children }: LayoutProps) {
    return (
        <div className="container">
            <Header />
            <main className="main-layout">
                <Sidebar />
                {children}
            </main>
        </div>
    )
}

export default Layout