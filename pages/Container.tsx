import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"
import RoutesProtector from "./RoutesProtector"
import { Outlet } from "react-router-dom"

export default function Container() {
    return(
        <div className="wrapper" style={{height: '100%'}}>
            <NavBar />
            <br />
            <div className="container">
                <div className="main-content">
                <RoutesProtector>
                    <Outlet />
                </RoutesProtector>
                </div>
            </div>
            <Footer />
        </div>
    )
}