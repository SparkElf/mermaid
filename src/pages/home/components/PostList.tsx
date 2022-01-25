
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../..";
import { GlobalState, loadArticleHistory } from "../../../common/context/context";
import { useForceUpdate, useObservableState } from "../../../common/hook/Hook";
import { parseTimeInterval } from "../../../common/util/time";
import { getArticles } from "../../../fake-api"

export const loadNewData = (listType, postType, offset, limit) => {
    let postTypeStr
    let staticOffset = { offset: offset }
    switch (postType) {
        case 0:
            postTypeStr = 'hot'
            break;
        case 1:
            postTypeStr = 'new'
            break;
        case 2:
            return function (dataStore, atleast) {
                return loadArticleHistory({ categoryId: (listType <= 4 || listType >= 10) ? listType : 0, limit: limit, offset: staticOffset.offset }).then(res => {
                    if (res.length < atleast) throw "no enough data"
                    dataStore.push(...res)
                    staticOffset.offset += res.length
                })
            }
        default:
            return;
    }
    return function (dataStore, atleast) {
        return getArticles({ categoryId: (listType <= 4 || listType >= 10) ? listType : 0, sortBy: postTypeStr, limit: limit, offset: staticOffset.offset }).then(res => {
            console.log(res)
            if (res.data.articles.length < atleast) throw "no enough data"
            dataStore.push(...res.data.articles)
            staticOffset.offset += res.data.articles.length
        })
    }
}

//img没加载完成前影响布局 所以必须用div包裹
export const PostItem = (props) => {
    let data = props.data
    let headerData = [data.author_user_info.user_name, parseTimeInterval(data.article_info.mtime), props.index]
    const navigate = useNavigate()
    return (
        <>
            <div className={`postItem`} onClick={() => {
                navigate(`/detail/${data.article_id}`, { state: { article: data } })
            }} >
                <div>
                    <TabBar data={headerData} />
                    <span className="title">{data.article_info.title}</span>
                    <span className="brief">{data.article_info.brief_content}</span>
                </div>
                <div className="img">
                    <img src={data.article_info.cover_image}></img>
                </div>
            </div>
            <div className="divider" />
        </>
    )
}
const TabBar = (props) => {
    return (
        <div className="tabBar">
            {
                props.data.map((text, key) => {
                    return (
                        <div className="tab" key={key} >{text}</div>
                    )
                }
                )
            }
        </div>
    )
}
