import CatDAO from "../models/catDAO"

export default {
	getAll: async(req, res) => {
		try {
			const result = await CatDAO.getAll();
			res.send(result);
		} catch(e) {
			console.error(e);
		}
	},

	getByUsername: async(req, res) => {
		const username = req.params.username;
		try {
			const result = await CatDAO.getByUsername(username);
			res.send(result);
		} catch(e) {
			console.error(e);
		}
	},

	create: async(req, res) => {
		try {
			// delete null data 
			for (const field in req.body) {
				if (!req.body[field]) delete req.body[field]
			}

			const result = await CatDAO.create(req.body);
			if(!result) {
				res.send("success");
			} else {
				res.send("failed")
			}
		} catch(e) {
			console.error(e);
		}
	},

	delete: async(req, res) => {
		const username = req.params.username;
		try {
			const result = await CatDAO.delete(username);
			if(!result) {
				res.send("success");
			} else {
				res.send("failed")
			}
		} catch(e) {
			console.error(e);
		}
	},

	update: async(req, res) => {
		const username = req.body.username

		let body = {
			password: req.body.password,
			bio: req.body.bio,
			profile_picture: req.body.profile_picture
		}
		
		for (const field in body) {
			if (!body[field]) delete body[field];
		}

		try {
			const result = await CatDAO.update(username, body);
			
			if(result) {
				res.send("success");
			} else {
				res.send("failed")
			}
		} catch(e) {
			console.error(e);
		}
	},

	login: async(req, res) => {
		const username = req.body.username;
		const password = req.body.password;
		try {
			const result = await CatDAO.login(username, password);
			
			if(result) {
				res.send("success");
			} else {
				res.send("failed")
			}

		} catch(e) {
			console.error(e);
		}
	},

	follow: async(req, res) => {
		console.log(req.body);
		const username = req.body.username;
		const username_to_follow = req.body.username_to_follow;

		try {
			const result = await CatDAO.follow(username, username_to_follow);

			if(!result) {
				res.send("success");
			} else {
				res.send("failed")
			}
		} catch(e) {
			console.error(e);
		}
	},

	unfollow: async(req, res) => {
		const username = req.body.username;
		const username_to_unfollow = req.body.username_to_unfollow;

		try {
			const result = await CatDAO.unfollow(username, username_to_unfollow);

			if(!result) {
				res.send("success");
			} else {
				res.send("failed")
			}
		} catch(e) {
			console.error(e);
		}
	},

}