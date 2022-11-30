import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function MainPage(props) {
	return (
		<Container>
			<Row>
				<Col>{props.pageUrl}</Col>
			</Row>
		</Container>
	);
}
