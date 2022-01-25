import { Context, DispatchWithoutAction, useContext, useEffect, useReducer, useState } from "react";
import { ObservableController } from "../context/context";

export function useWithRefreshScope(): [(func: Function) => void, DispatchWithoutAction] {
    const forceUpdate = useReducer(signal => !signal, false)[1]
    return [(func: Function) => {
        func()
        forceUpdate()
    }, forceUpdate]
}
export function useMergeState(initData, forceUpdate) {//随组件卸载而清除
    const state = useState(initData)[0]
    function setState(newState) {
        Object.assign(state, newState)
        forceUpdate()
    }
    return [state, setState]
}
export function useForceUpdate() {
    const forceUpdate = useReducer(signal => !signal, false)[1]
    return forceUpdate
}
export function useObservableState(ContextType: Context<ObservableController>, forceUpdate) {

    const obController = useContext(ContextType)
    useEffect(() => {
        obController.register(forceUpdate)
        return () => {
            obController.unregister(forceUpdate)
        }
    }, [])
    return [obController.sharedState, obController.notify]
}