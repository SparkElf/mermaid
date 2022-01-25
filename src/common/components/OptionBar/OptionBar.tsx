
import { useNavigate } from 'react-router-dom'

import './OptionBar.styl'
interface OptionBarProps {
    data: any[],
    links?: string[],
    fence?: boolean,
    select: number,
    onSelect?: (key: number) => void
}
export const OptionBar = (props: OptionBarProps) => {//该组件要控制兄弟组件，最后还是使用外部状态为佳
    let navigate = useNavigate()
    return (
        <div className={"optionBar" + (props.fence ? " fence" : "")}>
            {
                props.data.map((text, key) => {
                    let className = "option"
                    if (key == props.select) className += " choose"
                    return (
                        <div className={className} key={key} onClick={() => {
                            if (props.onSelect)
                                props.onSelect(key)
                            if (props.links)
                                navigate(props.links[key])
                        }} >
                            {text}
                        </div>
                    )
                })
            }
        </div>
    )
}