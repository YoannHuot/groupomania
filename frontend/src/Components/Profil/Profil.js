import classes from "./Profil.module.css";
import React, { useState, useEffect } from "react";
import {
	BiEnvelope,
	BiFemaleSign,
	BiCake,
	BiMessageSquareDetail,
	BiWindowOpen,
	BiWrench,
	BiTrafficCone,
	BiEditAlt
} from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import useUser from "../../Store/user/hook";
import ModifyProfil from "./ModifyProfil";
import ModifyBio from "./ModifyBio";
import ModifyPicture from "./ModifyPicture";
import useUserActivity from "../../Hooks/useUserActivity";
import UserBadge from "../Users/UserBadge";
import { useHistory } from "react-router-dom";

const Profil = () => {
	const user = useUser();
	const userActivity = useUserActivity();
	const userData = user.userStore.data;
	const history = useHistory();

	let formatDate = (params) => {
		let result = new Date(params).toLocaleDateString("sq-AL", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit"
		});
		return result;
	};

	let birthday = formatDate(userData.birthday);
	let inscription = formatDate(userData.inscription);

	const [checkUserJob, setCheckUserJob] = useState(false);
	const [modifyData, setModifyData] = useState(false);
	const [modifyBio, setModifyBio] = useState(false);
	const [modifyPicture, setModifyPicture] = useState(false);
	const [userLikes, setUserLikes] = useState();
	const [userPosts, setUserPosts] = useState();

	useEffect(() => {
		user.auth();
		userActivity.getUserAtivity(userData.id);

		console.log(userActivity.userActivity);
		if (userData.job === null) {
			setCheckUserJob(true);
		}
	}, []);

	useEffect(() => {
		setUserPosts(userActivity.userActivity.message);
	});

	const modifyProfilHandler = () => {
		setModifyData(true);
	};

	const stopModifyHandler = (data) => {
		setModifyData(data);
	};

	const modifyBioHandler = () => {
		setModifyBio(true);
	};

	const stopModifyBioHandler = (data) => {
		setModifyBio(data);
	};

	const modifyProfilPicture = () => {
		setModifyPicture(true);
	};
	const stopModifyProfilPicture = (data) => {
		setModifyPicture(data);
	};

	const showUserPost = () => {
		userActivity.getAllActivityByUser(userData.id);
		history.push(`${"posts/"}${userData.id}`);
	};

	return (
		<>
			<div className={classes.profil}>
				<div className={classes.profil__container}>
					<div className={classes.profil__card}>
						<img
							className={classes.profil__picture}
							alt="profil"
							src={userData.imageUrl}
							onClick={modifyProfilPicture}
						></img>
						<h2 className={classes.profil__userFirstName}>{userData.firstName}</h2>
						<h2 className={classes.profil__userLastName}>{userData.lastName}</h2>
					</div>
					<div className={classes.profil__badge}>
						<h2>Badges</h2>
						<UserBadge className={classes.profil__badge} />
					</div>
				</div>

				<div className={classes.profil__container}>
					<div className={classes.profil__details}>
						<header className={classes.profil__header}>
							<h3>Détails du profil</h3>
							<div
								className={classes.profil__details__modify}
								onClick={modifyProfilHandler}
							>
								<IoMdSettings />
							</div>
						</header>
						<div>
							<BiFemaleSign />
							<p>{userData.age} ans</p>
						</div>
						<div>
							<BiEnvelope />
							<p>{userData.email}</p>
						</div>
						<div>
							<BiCake />
							<p>{birthday}</p>
						</div>
						<div>
							<BiWrench />
							{!checkUserJob && <p>{userData.job}</p>}
							{checkUserJob && <p>Aucun job renseigné</p>}
						</div>
					</div>
					<div className={classes.profil__activity}>
						<h3>Votre activité</h3>
						<div>
							<BiWindowOpen />
							<p>{inscription}</p>
						</div>
						<div>
							<BiTrafficCone />
							{!userData.isadmin && <p>Administrateur</p>}
							{userData.isadmin && <p>Utilisateur</p>}
						</div>
						<div>
							<BiMessageSquareDetail />
							<p>Nombre de message postés : {userPosts}</p>
						</div>
						<div>
							<BiEditAlt />
							<button className={classes.profil__posts} onClick={showUserPost}>
								{" "}
								Voir vos posts ICI
							</button>
						</div>
					</div>
					<div className={classes.bio}>
						<header className={classes.profil__header}>
							<h3>Biographie</h3>
							<div
								className={classes.profil__details__modify}
								onClick={modifyBioHandler}
							>
								<IoMdSettings />
							</div>
						</header>
						<div className={classes.profil__details__bio}>
							<p>{userData.bio}</p>
						</div>
					</div>
				</div>
			</div>
			{modifyData && (
				<ModifyProfil
					mail={userData.email}
					birthday={userData.birthday}
					onModify={stopModifyHandler}
				/>
			)}
			{modifyBio && (
				<ModifyBio
					title={"Modification du profil"}
					message={"il pleut"}
					onModify={stopModifyBioHandler}
				/>
			)}
			{modifyPicture && <ModifyPicture onModify={stopModifyProfilPicture} />}
		</>
	);
};

export default Profil;
