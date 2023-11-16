"use client";
import { useRef } from "react";
import { TextField } from "@mui/material";
import Center from "@/components/Center";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import createCompany from "@/libs/createCompany";
import updateCompany from "@/libs/updateCompany";

export default function CompanyForm({ userToken, mode, id }: { userToken: string; mode: string; id?: string }) {
	const router = useRouter();
	const name = useRef("");
	const business = useRef("");
	const address = useRef("");
	const province = useRef("");
	const postalcode = useRef("");
	const tel = useRef("");
	const picture = useRef("");

	const handleSubmit = async (e: any) => {
		e.preventDefault(); // Prevent the default form submission behavior
		if (mode === "add") {
			try {
				const response = await createCompany(userToken, {
					name: name.current,
					address: address.current,
					business: business.current,
					province: province.current,
					postalcode: postalcode.current,
					tel: tel.current,
					picture: picture.current
				});
				if (response?.success) {
					toast.success("Add Company Data success");
					router.push("/");
				} else {
					toast.error("Add Company Data failed");
				}
			} catch (error) {
				console.error(error);
				toast.error("Error adding company");
			}
		}
		if (mode === "update") {
			try {
				if (!id) {
					throw new Error("No Company ID given");
				}
				const response = await updateCompany(userToken, {
					name: name.current,
					address: address.current,
					business: business.current,
					province: province.current,
					postalcode: postalcode.current,
					tel: tel.current,
					picture: picture.current
				});
				if (response?.success) {
					toast.success("Update Company Data success");
					router.push("/"); // change to company page
				} else {
					toast.error("Update Company Data failed");
				}
			} catch (error) {
				console.error(error);
				toast.error("Error updating company");
			}
		} else {
			console.log("Wrong mode");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Center header={mode == "add" ? "Add company" : "Update company"}>
				<TextField required label="Name" type="text" variant="filled" onChange={(e) => (name.current = e.target.value)} />
				<TextField required label="Bussiness" type="text" variant="filled" onChange={(e) => (business.current = e.target.value)} />
				<TextField required label="Address" type="text" variant="filled" onChange={(e) => (address.current = e.target.value)} />
				<TextField required label="Province" type="text" variant="filled" onChange={(e) => (province.current = e.target.value)} />
				<TextField required label="Postalcode" type="text" variant="filled" onChange={(e) => (postalcode.current = e.target.value)} />
				<TextField required label="Tel" type="tel" variant="filled" onChange={(e) => (tel.current = e.target.value)} />
				<TextField required label="Picture(URL)" type="url" variant="filled" onChange={(e) => (picture.current = e.target.value)} />
				<button
					type="submit"
					className="bg-gradient-to-br from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 py-2 px-3 text-white font-semibold rounded-md hover:bg-slate-200 text-lg"
				>
					{mode == "add" ? <>Create</> : <>Save</>}
				</button>
			</Center>
		</form>
	);
}
