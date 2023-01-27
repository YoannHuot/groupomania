import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useUserActivity from "../../Hooks/useUserActivity";
import { MdThumbUp } from "react-icons/md";
import classe from "./MyPosts.module.css";
import classeActivity from "../Home/Activity/Activity.module.css";
import classesLikes from "../Home/Activity/ActivityLikes/ActivityLikes.module.css";

const MyPosts = () => {
	const { id } = useParams();
	const userActivity = useUserActivity();
	const userActivityData = userActivity.userAllActivity;

	useEffect(() => {
		userActivity.getAllActivityByUser(id);
	}, []);

	console.log(userActivityData);
	return (
		<div>
			<div className={classe.posts__list}>
				{userActivityData.length &&
					userActivityData.map((items) => (
						<div className={classe.activity__list}>
							<div className={classeActivity.activity__header}>
								<img alt="profil picutre" src={items.imageUrl}></img>
								<div className={classeActivity.activity__header__content}>
									<div className={classeActivity.activity__header__date}>
										Postée le {items.created_at} par {items.firstName}{" "}
										{items.lastName}
									</div>
									<div className={classeActivity.activity__header__title}>
										{items.title}
									</div>
								</div>
							</div>
							<div className={classeActivity.activity__content}>
								<p>{items.content}</p>
								{items.file && (
									<img
										className={classeActivity.activity__content__image}
										alt="activity"
										src={items.file}
									></img>
								)}
								{!items.file && <></>}
							</div>
							<div className={classeActivity.activity__footer}>
								<div className={classe.likes__card}>
									<MdThumbUp className={classesLikes.likes__icon} />
									<p>{items.like}</p>
								</div>
							</div>
						</div>
					))}
				{!userActivityData.length && <div>RAS</div>}
			</div>
		</div>
	);
};

export default MyPosts;
