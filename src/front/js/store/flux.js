const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			privateData: null,
			message: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			// Sign up a new user
			signup: async (username, email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ username, email, password })
					});
					if (resp.ok) {
						const data = await resp.json();
						setStore({ token: data.token });
						return data;
					} else {
						console.error("Error signing up", resp.status);
					}
				} catch (error) {
					console.log("Error signing up", error);
				}
			},

			// Log in an existing user
			login: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email, password })
					});
					if (resp.ok) {
						const data = await resp.json();
						setStore({ token: data.token });
						return data;
					} else {
						console.error("Error logging in", resp.status);
					}
				} catch (error) {
					console.log("Error logging in", error);
				}
			},

			// Fetch private data
			getPrivateData: async () => {
				const store = getStore();
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/private-data", {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${store.token}`
						}
					});
					if (resp.ok) {
						const data = await resp.json();
						setStore({ privateData: data["private-data"] });
						return data;
					} else {
						console.error("Error fetching private data", resp.status);
					}
				} catch (error) {
					console.log("Error fetching private data", error);
				}
			}
		}
	};
};

export default getState;