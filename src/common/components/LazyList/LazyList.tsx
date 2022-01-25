import { PureComponent, ReactNode, useCallback, useEffect } from "react"

interface LazyListProps {
    scrollTarget: HTMLElement,
    size: number,
    basis: number,
    dataStore: any[],
    loadInitData: (dataStore: any[], atleast: number) => Promise<any>,
    loadNewData: (dataStore: any[], atleast: number) => Promise<any>,//要求数据源至少提供limit道数据
    Item: (props) => JSX.Element
    // onItemClick?: (data) => void 选中有必要 点击没必要 已经通过LazyListItem暴露了数据接口
}
export class LazyList extends PureComponent<LazyListProps> {//节流卡顿 清理工作由外部控制
    data = {
        lPtr: 0, rPtr: 0,
        lastScrollTop: 0,
        topFillerHeight: 0, bottomFillerHeight: 0,
        heightList: [],
        frameCount: 0,
    }
    constructor(props: LazyListProps) {
        super(props)
        props.loadInitData(props.dataStore, 0).then(() => { this.data.rPtr = props.dataStore.length; this.forceUpdate() })//初始窗口应该以实际获得的数据为准
        window.addEventListener('scroll', this.scrollListener)
        console.log('类实例创建')
    }
    componentWillUnmount(): void {
        window.removeEventListener('scroll', this.scrollListener)
        console.log('类实例销毁')
    }
    updateFillerOnDown(step) {
        for (let i = 0; i < step; i++) {
            this.data.topFillerHeight += this.data.heightList[this.data.lPtr + i]
            if (this.data.bottomFillerHeight != 0)
                this.data.bottomFillerHeight -= this.data.heightList[this.data.rPtr + i]//[l,r)左闭右开
        }
        this.data.rPtr += step
        this.data.lPtr += step
    }
    continuedScrollListener = () => {
        let i = setInterval(() => {
            if (this.data.frameCount == 250) {
                this.data.frameCount = 0
                clearInterval(i)
                return
            } else
                this.data.frameCount++
            let t = this.props.scrollTarget
            console.log(t.scrollTop)
            //下滑
            if (t.scrollTop - this.data.lastScrollTop > 0) {
                let dH = t.scrollTop - this.props.basis - this.data.topFillerHeight//下滑量

                if (dH < this.data.heightList[this.data.lPtr]) {
                    return
                }

                let step = 0
                do {
                    dH -= this.data.heightList[this.data.lPtr + step]
                    step++
                } while (dH >= 0)

                if (this.data.rPtr + step > this.props.dataStore.length)
                    this.props.loadNewData(this.props.dataStore, step).then(() => {
                        this.updateFillerOnDown(step)
                        this.forceUpdate()
                    }).catch(() => {//失败，将step降级到刚好加载完剩余的dataStore
                        let step = this.props.dataStore.length - this.data.rPtr
                        if (step == 0) return
                        this.updateFillerOnDown(step)
                        console.log('数据不足')
                        this.forceUpdate()
                    })
                else {
                    this.updateFillerOnDown(step)
                    this.forceUpdate()
                }

            }
            else if (t.scrollTop - this.data.lastScrollTop < 0 && this.data.lPtr != 0) {
                let dH = this.data.topFillerHeight + this.props.basis - t.scrollTop
                if (dH < this.data.heightList[this.data.lPtr - 1]) return


                let step = 1
                while (dH - this.data.heightList[this.data.lPtr - step] >= 0) {
                    dH -= this.data.heightList[this.data.lPtr - step]
                    this.data.topFillerHeight -= this.data.heightList[this.data.lPtr - step]//顶部减去将要渲染的列表项高度
                    this.data.bottomFillerHeight += this.data.heightList[this.data.rPtr - step]
                    step++
                }
                step--
                this.data.rPtr -= step
                this.data.lPtr -= step
                this.forceUpdate()
                console.log('上滑')
                console.log(this.data)
            }
            this.data.lastScrollTop = t.scrollTop

        }, 1)
    }
    scrollListener = (e) => {
        if (this.data.frameCount != 0)
            return
        else
            this.continuedScrollListener()
    }
    render(): ReactNode {
        console.log('LazyList刷新')
        return (<this.LazyListBase />)
    }
    LazyListBase = () => {
        const measureRef = useCallback(node => {
            if (node != null) {
                this.data.heightList.push(node.getBoundingClientRect().height)
            }
        }, [])
        return (
            <div className="list" >
                <div className="topFiller" style={{ height: `${this.data.topFillerHeight}px`, backgroundColor: 'white' }} />

                <div className="listBody">
                    {
                        (() => {
                            let jsxList = []
                            for (let i = this.data.lPtr; i < this.data.rPtr; i++) {
                                jsxList.push(<this.LazyListItem data={this.props.dataStore[i]} key={i} index={i} measure={i >= this.data.heightList.length ? measureRef : null} />)
                            }

                            return jsxList

                        })()
                    }
                </div>
                <div className="bottomFiller" style={{ height: `${this.data.bottomFillerHeight}px`, backgroundColor: 'white' }} />
            </div>
        )
    }
    LazyListItem = (props) => {
        return (
            <div className={`listItem ${props.index}`} ref={props.measure}>
                <this.props.Item data={props.data} index={props.index} />
            </div>
        )
    }
}