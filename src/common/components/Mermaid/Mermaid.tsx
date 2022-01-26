
import { useEffect } from 'react'
//var mermaid = require('mermaid')
import mermaid from 'mermaid' //??
console.log(mermaid)
export const Mermaid = (props) => {
    useEffect(() => {
        mermaid.initialize({
            startOnLoad: true,
            securityLevel: "loose"
        })
        mermaid.contentLoaded()
    }, [])
    return (
        <div className='mermaid'>{props.chart ? props.chart : props.children}</div>
    )
}