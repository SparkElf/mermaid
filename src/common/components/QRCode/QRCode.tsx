import './QRCode.styl'
export const QRCode = () => {
    return (
        <div className="qrCode" onClick={
            () => {
                window.location.href = 'https://juejin.cn/app'
            }
        }>
            <img src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/home.e8f8c43.png" ></img>
            <div>
                <span className="title">下载稀土掘金APP</span>
                <span className="desc">一个帮助开发者成长的社区</span>
            </div>

        </div>
    )
}