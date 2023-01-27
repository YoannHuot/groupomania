import { Card } from "antd";

const { Meta } = Card;

import React from "react";

const test = () => {
	return (
		<>
			<Card
				hoverable
				style={{ width: 240 }}
				cover={
					<img
						alt="example"
						src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
					/>
				}
			>
				<Meta title="Europe Street beat" description="www.instagram.com" />
			</Card>
			, mountNode,
		</>
	);
};

export default test;
