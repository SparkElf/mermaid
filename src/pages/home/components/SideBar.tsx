import { Component, PureComponent, ReactNode, useEffect, useState } from "react"
import { QRCode } from "../../../common/components/QRCode/QRCode"
import { useForceUpdate } from "../../../common/hook/Hook"
import { getGreeting } from "../../../common/util/time"

const data = [
    {
        avatar: "https://p26-passport.byteacctimg.com/img/user-avatar/0fe2c9e8f1482f3ff898169e4980de2a~300x300.image",
        userName: "Java中文社群",
        rank: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/f8d51984638784aff27209d38b6cd3bf.svg",
        desc: "公众号 @ Java中文社群"
    },
    {
        avatar: "https://p6-passport.byteacctimg.com/img/user-avatar/ceff4560c9a0b128a71587e297ef2617~300x300.image", userName: "阿里巴巴云原生",
        rank: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/f8d51984638784aff27209d38b6cd3bf.svg", desc: "阿里巴巴云原生公众号 @ 阿里巴巴集团"
    },
    {
        avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/0d83531202d06e281a9bb609888bd648~300x300.image", userName: "若川",
        rank: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/f8d51984638784aff27209d38b6cd3bf.svg", desc: "关注@若川视野，源码共读！加微信 ruochuan12 参与"
    },
]
export class SideBar extends PureComponent {
    active = false
    constructor(props) {
        super(props)
        window.addEventListener('scroll', this.listener)
        console.log('SideBar创建')
    }

    listener = (e) => {
        if (document.documentElement.scrollTop > 1000 && !this.active) {
            this.active = true
            this.forceUpdate()
        }

        else if (document.documentElement.scrollTop <= 1000 && this.active) {
            this.active = false
            this.forceUpdate()
        }
    }
    componentWillUnmount(): void {
        window.removeEventListener('scroll', this.listener)
        console.log('SideBar销毁')
    }
    render(): ReactNode {
        return (
            <div className='sideBar'>

                <div className="sign">
                    <div className="row">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-68373e0a=""><path fillRule="evenodd" clipRule="evenodd" d="M8 2C8 1.72386 7.77614 1.5 7.5 1.5H6.5C6.22386 1.5 6 1.72386 6 2L5.9995 3H3C2.44772 3 2 3.47259 2 4.05556V7H22V4.05556C22 3.47259 21.5523 3 21 3H18V2C18 1.72386 17.7761 1.5 17.5 1.5H16.5C16.2239 1.5 16 1.72386 16 2V3H8V2ZM22 8.5H2V20.9444C2 21.5274 2.44772 22 3 22H21C21.5523 22 22 21.5274 22 20.9444V8.5Z" fill="#FFCF8B" data-v-68373e0a=""></path><rect x="5" y="12" width="3" height="2" rx="1" fill="#FF7D00" data-v-68373e0a=""></rect><rect x="10.5" y="12" width="3" height="2" rx="1" fill="#FF7D00" data-v-68373e0a=""></rect><rect x="5" y="16" width="3" height="2" rx="1" fill="#FF7D00" data-v-68373e0a=""></rect><rect x="10.5" y="16" width="3" height="2" rx="1" fill="#FF7D00" data-v-68373e0a=""></rect><rect x="16" y="12" width="3" height="2" rx="1" fill="#FF7D00" data-v-68373e0a=""></rect><rect x="16" y="16" width="3" height="2" rx="1" fill="#FF7D00" data-v-68373e0a=""></rect></svg>
                        <span className="gretting">{getGreeting(new Date().getHours())}</span>
                        <button>去签到</button>
                    </div>

                    <div className="slogan">点亮你在社区的每一天</div>
                </div>
                <div className={`stickyBlock${this.active ? " active" : ""}`}>
                    <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe37c58e2f9349978bfde1342e856eec~tplv-k3u1fbpfcp-no-mark:480:400:0:0.awebp?"></img>
                    <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d7ece9bc779448ea2c8c19c081f325d~tplv-k3u1fbpfcp-no-mark:480:400:0:0.awebp?"></img>
                    <QRCode />
                </div>
                <div className="rankingList">
                    <div className="rankingHeader">🎖️ 作者榜</div>
                    <div className="userList">
                        {
                            data.map((item, key) => {
                                return (
                                    <div className="userListItem" key={key}>
                                        <img src={item.avatar} className="avatar" />
                                        <div className="content">
                                            <div className="title">
                                                <span className="userName">{item.userName}</span>
                                                <img src={item.rank} />
                                            </div>
                                            <div className="desc">{item.desc}</div>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="rankingFooter">{"完整榜单 >"}</div>
                </div>

            </div >
        )
    }
}
