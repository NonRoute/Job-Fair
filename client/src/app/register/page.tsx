"use client";
import Center from "@/components/Center";
import { TextField } from "@mui/material";
import Link from "next/link";
import { useRef } from "react";
import userRegister from "../../libs/userRegister";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Register() {
	const name = useRef("");
	const tel = useRef("");
	const email = useRef("");
	const password = useRef("");

	const router = useRouter();

	const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await userRegister(name.current, tel.current, email.current, password.current);
		if (response.success) {
			toast.success("Register success");
			router.push("/");
		} else {
			toast.error("Register failed");
			console.error(response.msg);
		}
	};
	return (
		<form onSubmit={onRegister}>
			<Center header="Register">
				<TextField required label="Name" type="text" variant="filled" onChange={(e) => (name.current = e.target.value)} />
				<TextField required label="Telephone Number" type="text" variant="filled" onChange={(e) => (tel.current = e.target.value)} />
				<TextField required label="Email" type="email" variant="filled" onChange={(e) => (email.current = e.target.value)} />
				<TextField required label="Password" type="password" variant="filled" onChange={(e) => (password.current = e.target.value)} />
				<div className="flex flex-col gap-1">
					<button
						type="submit"
						className="bg-gradient-to-br from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 py-2 px-3 text-white font-semibold rounded-md hover:bg-slate-200 text-lg"
					>
						Register
					</button>
					<Link href="/login" className="text-sky-600 font-semibold underline ml-auto">
						Already have an account? Login here
					</Link>
				</div>
			</Center>
		</form>
	);
}
