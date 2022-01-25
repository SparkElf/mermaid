
import { createContext, PureComponent, ReactNode, useEffect, useState } from "react";
import { GlobalState, ObservableController } from "./common/context/context";

export const AppContext = createContext(new ObservableController(null))

import { render } from "react-dom";

import { Home } from "./pages/home/Home";

import './index.styl'
import { Detail } from "./pages/detail/Detail";
import { Header, links as headerLinks } from "./pages/Header";
import { Footer } from "./pages/Footer";
import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useForceUpdate, useObservableState } from "./common/hook/Hook";
import { Hot } from "./pages/hot/Hot";
import { Information } from "./pages/information/Information";
import { Course } from "./pages/course/Course";
import { Activity } from "./pages/activity/Activity";


interface AppSharedState {
    scrollEnough: boolean,
    headerSelect: number
}
const GlobalGard = ({ children }) => {
    const forceUpdate = useForceUpdate()
    const [sharedState, notify] = useObservableState(AppContext, forceUpdate) as [AppSharedState, any]
    const location = useLocation()
    let match = false
    for (let i = 0; i < headerLinks.length; i++)
        if (headerLinks[i] == location.pathname) {
            sharedState.headerSelect = i
            match = true
            break
        }
    if (match == false) sharedState.headerSelect = -1
    useEffect(() => {
        notify()
    }, [sharedState.headerSelect])
    return children
}

class App extends PureComponent {
    sharedState = { scrollEnough: false, headerSelect: 0 }
    sharedStateController = new ObservableController(this.sharedState)
    constructor(props) {
        super(props)
        window.addEventListener('scroll', this.listener)
        window.onbeforeunload = function (e) {
            localStorage.removeItem('articleHistory')
            localStorage.setItem('articleHistory', JSON.stringify(GlobalState.articleHistory))
        }
        GlobalState.articleHistory = JSON.parse(localStorage.getItem('articleHistory'))
        if (GlobalState.articleHistory == null) GlobalState.articleHistory = []
    }
    componentWillUnmount(): void {
        window.removeEventListener('scroll', this.listener)
    }
    listener = () => {
        if (document.documentElement.scrollTop > 1000 && !this.sharedState.scrollEnough) {
            this.sharedState.scrollEnough = true
            this.sharedStateController.notify()
        }

        else if (document.documentElement.scrollTop <= 1000 && this.sharedState.scrollEnough) {
            this.sharedState.scrollEnough = false
            this.sharedStateController.notify()
        }
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
                <Route path="detail/:article_id" element={<Detail />} />
                <Route path="hot" element={<Hot />}></Route>
                <Route path="information" element={<Information />}></Route>
                <Route path="course" element={<Course />}></Route>
                <Route path="activity" element={<Activity />}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
    , document.getElementById("App"));


