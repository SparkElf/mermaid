import { useNavigate } from 'react-router-dom'
import './TabBar.styl'
interface TabBarProps {
    data: any[],
    links?: string[],
    select: number,
    onSelect?: (key: number) => void
}
export const TabBar = (props: TabBarProps) => {
    let navigate = useNavigate()
    return (
        <div className={"tabBar"}>
            {
                props.data.map((text, key) => {
                    let className = "tab"
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