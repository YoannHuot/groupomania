import React from "react";
import classes from "./Activity.module.css";
import useUser from "../../../Store/user/hook";
import { useEffect, useState } from "react";
import useComments from "../../../Hooks/useComments";
import useActivity from "../../../Store/activity/hook";
import useUserActivity from "../../../Hooks/useUserActivity";
import ActivityCommentsHandler from "./ActivityComments/ActivityCommentsHandler";
import ActivityLikes from "./ActivityLikes/ActivityLikes";
import ActivityPostComments from "./ActivityComments/ActivityPostComments";
import Comments from "./ActivityComments/Comments";
import { IoSettingsOutline, IoTrashOutline } from "react-icons/io5";
import DeleteModal from "./Modals/DeleteModal";
import ModifyActivityModal from "./Modals/ModifyActivityModal";
import { useHistory } from "react-router-dom";

const Activity = (props) => {
	const history = useHistory();
	const activity = props.activite;
	const activeUser = props.user;

	const activityStore = useActivity();
	const user = useUser();

	const comments = useComments();

	const userActivity = useUserActivity();

	const [commentShow, setCommentShow] = useState(false);
	const [autorizeDelete, setAutorizeDelete] = useState(false);
	const [deleteHandler, setDeleteHandler] = useState(false);
	const [modifyHandler, setModifyHandler] = useState(false);

	const lastComment = () => {
		comments.getComment(activity.id);
	};

	useEffect(() => {
		comments.getComment(activity.id);
		activityStore.activities();
		if (activeUser.id === activity.userId) {
			setAutorizeDelete(true);
		}
	}, [commentShow, activity.id]);

	const commentShowHandler = () => {
		if (commentShow) {
			setCommentShow(false);
		} else {
			setCommentShow(true);
		}
	};

	let formatDate = (params) => {
		let result = new Date(params).toLocaleDateString("sq-AL", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit"
		});
		return result;
	};

	let activityDate = formatDate(activity.created_at);

	const deleteActivity = async () => {
		if (deleteHandler === false) {
			setDeleteHandler(true);
		} else {
			setDeleteHandler(false);
		}
	};

	const modifyActivity = () => {
		if (modifyHandler === false) {
			setModifyHandler(true);
		} else {
			setModifyHandler(false);
		}
	};

	const showUserProfil = () => {
		if (activeUser.id === activity.userId) {
			history.push("/profil");
		} else {
			// userActivity.getUserAtivity(activity.userId);
			history.push(`${"user/"}${activity.userId}`);
		}
	};

	return (
		<>
			<div key={activity.id} className={classes.activity__list}>
				<div className={classes.activity__header}>
					<img
						onClick={showUserProfil}
						alt="profil picutre"
						src={activity.imageUrl}
					></img>
					<div className={classes.activity__header__content}>
						<div onClick={showUserProfil} className={classes.activity__header__date}>
							Postée le {activityDate} par {activity.firstName} {activity.lastName}
						</div>
						<div className={classes.activity__header__title}>{activity.title}</div>
					</div>
					<div className={classes.activity__header__picto}>
						{autorizeDelete && (
							<>
								<IoSettingsOutline onClick={modifyActivity} />
								<IoTrashOutline onClick={deleteActivity} />
							</>
						)}
					</div>
				</div>

				<div className={classes.activity__content}>
					<p>{activity.content}</p>
					{activity.file && (
						<img
							className={classes.activity__content__image}
							alt="activity"
							src={activity.file}
						></img>
					)}
					{!activity.file && <></>}
				</div>

				<div className={classes.activity__footer}>
					<ActivityLikes activity={activity} user={user.userStore.data} />
					<ActivityCommentsHandler showActivity={commentShowHandler} />
				</div>
				{commentShow && (
					<>
						<ActivityPostComments
							user={user.userStore.data}
							activity={activity}
							lastComment={lastComment}
						/>
						<>
							{comments.comments
								.map((item, i) => {
									return (
										<Comments
											key={i}
											comment={item}
											activityId={activity.id}
											user={user.userStore.data}
											comments={comments}
										/>
									);
								})
								.reverse()}
						</>
					</>
				)}
				{!commentShow && <></>}
				{deleteHandler && (
					<DeleteModal deleteHandler={deleteActivity} activityId={activity.id} />
				)}
				{modifyHandler && (
					<ModifyActivityModal modifyActivity={modifyActivity} activity={activity} />
				)}
			</div>
		</>
	);
};

export default Activity;
