import React, { useState, useEffect } from "react";
import classes from "./Comments.module.css";
import { IoSettingsOutline, IoTrashOutline } from "react-icons/io5";
import DeleteCommentModal from "../Modals/DeleteCommentModal";
import ModifyComment from "./ModifyComment";

const Comments = (props) => {
	const commentId = props.comment.id;
	const [deleteComment, setDeleteComment] = useState(false);
	const [modifyComment, setModifyComment] = useState(false);
	const [commentUser, setCommentUser] = useState(false);

	useEffect(() => {
		if (props.user.id === props.comment.userId) {
			setCommentUser(true);
		}
	}, []);

	const deleteCommentHandler = () => {
		if (deleteComment) {
			setDeleteComment(false);
		} else {
			setDeleteComment(true);
		}
	};

	const modifyCommentHandler = () => {
		if (modifyComment) {
			setModifyComment(false);
		} else {
			setModifyComment(true);
			// props.lastComment(commentId);
		}
	};

	return (
		<div className={classes.comment__list}>
			<div className={classes.comment__list__header}>
				<div className={classes.comment__list__header__content}>
					<img src={props.comment.user.imageUrl}></img>
					<p>Posté par {props.comment.user.firstName}</p>
				</div>
				<div className={classes.comment__list__header__picto}>
					{commentUser && (
						<>
							<IoSettingsOutline onClick={modifyCommentHandler} />
							<IoTrashOutline onClick={deleteCommentHandler} />
						</>
					)}
				</div>
			</div>
			{!modifyComment && (
				<div className={classes.comment__list__content}>
					<p>{props.comment.content}</p>
				</div>
			)}
			{modifyComment && (
				<ModifyComment
					modifyCommentHandler={modifyCommentHandler}
					activityId={props.activityId}
					commentId={commentId}
					comments={props.comments}
					previousContent={props.comment.content}
				/>
			)}
			{deleteComment && (
				<DeleteCommentModal
					deleteCommentHandler={deleteCommentHandler}
					id={props.activityId}
					commentId={commentId}
					comments={props.comments}
				/>
			)}
		</div>
	);
};

export default Comments;
