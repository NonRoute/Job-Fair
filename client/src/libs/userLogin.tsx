export default async function userLogin(email: String, password: String) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email,
			password
		})
	})
	return await response.json()
}
