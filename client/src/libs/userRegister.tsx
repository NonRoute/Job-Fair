export default async function userRegister(name: String, tel: String, email: String, password: String) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name,
			tel,
			email,
			password,
			role: 'user'
		})
	})
	return await response.json()
}
