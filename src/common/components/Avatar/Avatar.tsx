import './Avatar.styl'
interface AvatarProps {
    src: string,
    size: string,
}
export const Avatar = (props: AvatarProps) => {//img标签记得用div包裹避免加载前后布局不一致
    return (
        <div className='avatar'>
            <img src={props.src} style={{ width: props.size, height: props.size }} />
        </div>
    )

}