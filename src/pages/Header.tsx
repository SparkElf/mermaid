import { Context, PureComponent, ReactNode, useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AppContext } from ".."
import { SearchBar } from "../common/components/SearchBar/SearchBar"
import { OptionBar } from "../common/components/OptionBar/OptionBar"
import { ObservableController } from "../common/context/context"
import { useForceUpdate, useObservableState } from "../common/hook/Hook"

import './Header.styl'
import logo from '/src/asset/img/logo.svg'
import searchIcon from '/src/asset/img/search-icon.svg'

const data = ['首页', '热点', '资讯', '课程', '活动']
export const links = ['/', '/hot', '/information', '/course', '/activity']

//所有订阅了该consumer的都会重新渲染
export const Header = () => {
    const forceUpdate = useForceUpdate()
    const sharedState = useObservableState(AppContext, forceUpdate)[0]
    console.log('header', sharedState)
    return (
        <div className={`header-spark${sharedState.scrollEnough ? " active" : ""}`}>
            <div className="container">
                <img src={logo} className="logo"></img>
                <OptionBar data={data} links={links} select={sharedState.headerSelect} />

                <SearchBar icon={searchIcon} placeholder="探索稀土掘金" />
                <div className="btnGroup">
                    <button className="signinBtn">登陆</button>
                    <button className="signupBtn">注册</button>
                </div>
            </div>
        </div>
    )
}