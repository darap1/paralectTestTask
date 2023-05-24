import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Main from "./pages/Main";
import Favorite from "./pages/Favorite";
import Vacancy from "./pages/Vacancy";
import axios from "axios";

function App() {
	useEffect(() => {
		const getToken = async () => {
			if (!localStorage.getItem("token")) {
				try {
					const response = await axios.get(process.env.REACT_APP_TOKEN_URL, {
						headers: {
							"x-secret-key": process.env.REACT_APP_SECRET_KEY,
						},
					});
					const data = response.data;
					localStorage.setItem("token", JSON.stringify(data));
				} catch (error) {
					console.error("Error fetching token:", error);
				}
			} else {
				const token = JSON.parse(localStorage.getItem("token"));
				if (token.ttl * 1000 < Date.now()) {
					try {
						const parametrs = new URLSearchParams({
							refresh_token: token.refresh_token,
							client_id: process.env.REACT_APP_CLIENT_ID,
							client_secret: process.env.REACT_APP_SECRET_KEY,
						});
						const response = await axios.get(
							process.env.REACT_APP_REFRESH_TOKEN_URL + parametrs,
							{
								headers: {
									"x-secret-key": process.env.REACT_APP_SECRET_KEY,
								},
							}
						);
						const data = response.data;
						localStorage.setItem("token", JSON.stringify(data));
					} catch (error) {
						console.error("Error refreshing token:", error);
					}
				}
			}
		};

		getToken();
	}, []);

	return (
		<div className="container">
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/favorite" element={<Favorite />} />
					<Route path="/vacancy/:id" element={<Vacancy />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;

