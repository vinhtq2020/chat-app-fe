interface Props {
	avatar?: string
	username?: string 
}

export const UserItem = (props: Props) => {
	return <div className="rounded-4 shadow-md bg-white flex flex-col">
		<img className="h-4 w-4" src={props.avatar} alt="" srcSet="" />
		<div className="font-semibold">{props.username}</div>
	</div>
}