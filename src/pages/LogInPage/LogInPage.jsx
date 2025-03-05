import React from "react";
import "./LogInPage.scss";
import { FlexGrid, Column, Row, Tile, TextInput, Button } from "@carbon/react";
import {LogInForm} from "../../components/LogInForm/LogInForm.jsx";

export const  LogInPage= () => {
;

	return (
		<>
			<FlexGrid className="login-form">
				<Row className="login-row">
					<Column className="login-canvas">
						<Tile className="login-canvas"></Tile>
					</Column>
					<Column className="login-column">
						<Tile className="login-column">
							< LogInForm />
						</Tile>
					</Column>
				</Row>
			</FlexGrid>
		</>
	);
};
