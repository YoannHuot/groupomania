import React, { useEffect, useState } from "react";
import Activity from "./Activity/Activity";
import AddActivity from "./Activity/AddActivity/AddActivity";
import classes from "./Home.module.css";
import useActivity from "../../Store/activity/hook";
import useUser from "../../Store/user/hook";

const Home = () => {
	const activity = useActivity();
	const user = useUser();
	const userList = user.userStore.data;
	const activityList = activity.activityStore.data;

	useEffect(() => {
		user.auth();
		activity.activities();
	}, []);

	return (
		<div className={classes.home}>
			<AddActivity />
			{activity.activityStore.data.length && (
				<>
					<div className={classes.home__results}>
						{activityList
							.map((activite, i) => (
								<Activity key={i} activite={activite} user={userList} />
							))
							.reverse()}
					</div>
				</>
			)}
			{!activity.activityStore.data.length && <div>Il y a pas de nouvelles activités</div>}
		</div>
	);
};

export default Home;
