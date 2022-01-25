
import { createContext, PureComponent, ReactNode, useEffect, useState } from "react";
import { GlobalState, ObservableController } from "./common/context/context";

export const AppContext = createContext(new ObservableController(null))

import { render } from "react-dom";

import { Home } from "./pages/home/Home";

import './index.styl'

import { Header } from "./pages/Header";
import { Footer } from "./pages/Footer";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";


interface AppSharedState {
    scrollEnough: boolean,
    headerSelect: number
}
const GlobalGard = ({ children }) => {
    return children
}

class App extends PureComponent {
    sharedState = {}
    sharedStateController = new ObservableController(this.sharedState)
    constructor(props) {
        super(props)

    }
    //provider中不能直接匿名对象赋值 https://zh-hans.reactjs.org/docs/context.html 会导致不必要的重渲染
    render(): ReactNode {
        return (
            <>
                <AppContext.Provider value={this.sharedStateController}>
                    <GlobalGard>
                        <Header />
                        <Outlet></Outlet>
                        <Footer />
                    </GlobalGard>
                </AppContext.Provider>
            </>
        )
    }

}

render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} >
                <Route index element={<Home />} />
            </Route>
        </Routes>
    </BrowserRouter>
    , document.getElementById("App"));


