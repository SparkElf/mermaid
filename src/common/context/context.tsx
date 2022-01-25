export class ObservableController {
    sharedState = void 0
    private consumers = []

    constructor(sharedState) {
        this.sharedState = sharedState
    }

    notify = () => {
        for (let i = 0; i < this.consumers.length; i++)
            this.consumers[i]()
    }
    register(forceUpdate) {
        this.consumers.push(forceUpdate)
    }
    unregister(forceUpdate) {
        for (let i = 0; i < this.consumers.length; i++)
            if (this.consumers[i] == forceUpdate)
                this.consumers.splice(i, 1)
    }
}

export const GlobalState = {
    articleHistory: []
}
export async function loadArticleHistory({ categoryId = 0, offset = 0, limit = GlobalState.articleHistory.length }) {
    let arr = categoryId == 0 ? GlobalState.articleHistory : GlobalState.articleHistory.filter(
        a => a.category_info.first_category_id === categoryId || a.category_info.second_category_id === categoryId
    )
    let right = arr.length - offset//末尾元素是dataStore.length-1，然后再减去offset，注意左闭右开所以不用-1
    if (right < 0) return []
    let left = (right - limit > 0) ? (right - limit) : 0
    return arr.slice(left, right).reverse()
}