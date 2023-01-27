import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./User.module.css";
import useUser from "../../Store/user/hook";
import useActivity from "../../Store/activity/hook";
import { BiEnvelope, BiCake, BiWindowOpen, BiTrafficCone } from "react-icons/bi";
import { MdThumbUp } from "react-icons/md";
import useUserActivity from "../../Hooks/useUserActivity";
import axios from "axios";
import UserBadge from "./UserBadge";

const User = () => {
	const { id } = useParams();
	const user = useUser();
	const userStore = user.userStore.data;
	const userActivity = useUserActivity();
	const userActivityData = userActivity.userActivity;

	const [message, setMessage] = useState();
	const [likes, setLikes] = useState();
	const [comments, setComments] = useState();
	const [multipleMessage, setMultipleMessage] = useState(true);
	const [multipleComments, setMultipleComments] = useState(true);
	const [hasBio, setHasBio] = useState(false);
	const [hasJob, setHasJob] = useState(true);

	useEffect(() => {
		user.otherUser(id);
		userActivity.getUserAtivity(id);
	}, []);

	useEffect(() => {
		setLikes(userActivity.userActivity.likes);
		setMessage(userActivity.userActivity.message);
		setComments(userActivity.userActivity.comments);
		console.log("dans le front");
		console.log(userActivityData);

		if (message === 1) {
			setMultipleMessage(false);
		}
		if (comments === 1) {
			setMultipleComments(false);
		}
		if (userStore.bio) {
			setHasBio(true);
		}
		if (userStore.job === null) {
			setHasJob(false);
		}
	});

	let formatDate = (params) => {
		let result = new Date(params).toLocaleDateString("sq-AL", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit"
		});
		return result;
	};

	const calculateDate = () => {
		var diff = Math.abs(new Date() - new Date(userStore.birthday));
		let diffMilli = diff / 60000 / 60 / 24 / 365.25;
		return Math.floor(diffMilli);
	};
	const birthday = calculateDate();
	const formatInscription = formatDate(userStore.inscription);

	return (
		<div className={classes.user__page}>
			<div className={classes.user__picture}>
				<img src={userStore.imageUrl}></img>
				<div className={classes.user__profil}>
					<div className={classes.user__age}>{userStore.age} ans</div>
					<div className={classes.user__email}>
						{userStore.email} <BiEnvelope />
					</div>
					<UserBadge
						likes={likes}
						comments={comments}
						inscription={formatInscription}
						birthday={birthday}
						message={message}
					/>
				</div>
			</div>
			<div className={classes.user__information}>
				<div className={classes.user__information__header}>
					<div className={classes.user__name}>
						{userStore.firstName} {userStore.lastName}
					</div>
					{hasJob && <div className={classes.user__job}>{userStore.job}</div>}
					{!hasJob && (
						<div className={classes.user__job}>Flemme de renseigner mon job</div>
					)}
				</div>
				{hasBio && <div className={classes.user__bio}>{userStore.bio}</div>}
				{!hasBio && (
					<div className={classes.user__bio}>
						Flemme de rensigner ma bio mais vous pouvez venir me voir au bureau !{" "}
					</div>
				)}
				<div className={classes.user__activity}>
					<div className={classes.user__picto}>
						{multipleMessage && <p>{message} messages</p>}
						{!multipleMessage && <p>{message} message</p>}

						<BiWindowOpen />
					</div>
					<div className={classes.user__picto}>
						{!multipleComments && <p>{comments} commentaires</p>}
						{multipleComments && <p>{comments} commentaire</p>}
						<BiTrafficCone />
					</div>
					<div className={classes.user__picto}>
						<p>Modérateur</p>
						<BiTrafficCone />
					</div>
					<div className={classes.user__picto}>
						<p>{formatInscription}</p>
						<BiCake />
					</div>
					<div className={classes.user__picto}>
						<p>{likes}</p>
						<MdThumbUp />
					</div>
				</div>
			</div>
		</div>
	);
};

export default User;
