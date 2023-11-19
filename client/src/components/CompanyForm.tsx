"use client";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import createCompany from "@/libs/createCompany";
import editCompany from "@/libs/editCompany";
import getCompany from "@/libs/getCompany";
import deleteCompany from "@/libs/deleteCompany";
import AddSession from "./AddSession";

export default function CompanyForm({
	userToken,
	mode,
	companyId
}: {
	userToken: string;
	mode: string;
	companyId?: string;
}) {
	const router = useRouter();
	const [name, setName] = useState<string>("");
	const [business, setBusiness] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [province, setProvince] = useState<string>("");
	const [postalcode, setPostalcode] = useState<string>("");
	const [tel, setTel] = useState<string>("");
	const [picture, setPicture] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (mode === "edit" && companyId) {
			setLoading(true);
			getCompany(companyId)
				.then((company) => {
					// console.log(company.data);
					setName(company.data.name);
					setBusiness(company.data.business);
					setAddress(company.data.address);
					setProvince(company.data.province);
					setPostalcode(company.data.postalcode);
					setTel(company.data.tel);
					setPicture(company.data.picture);
				})
				.catch((error) => {
					console.error("Error fetching company details:", error);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, []);

	if (mode === "edit" && !companyId) {
		return <>Incorrect parameter</>;
	}

	if (loading) {
		return <>Loading...</>;
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault(); // Prevent the default form submission behavior
		if (mode === "add") {
			try {
				const response = await createCompany(userToken, {
					name: name,
					address: address,
					business: business,
					province: province,
					postalcode: postalcode,
					tel: tel,
					picture: picture
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
		if (mode === "edit") {
			try {
				if (!companyId) {
					throw new Error("No Company ID given");
				}
				const response = await editCompany(userToken, {
					id: companyId,
					name: name,
					address: address,
					business: business,
					province: province,
					postalcode: postalcode,
					tel: tel,
					picture: picture
				});
				if (response?.success) {
					toast.success("Edit Company Data success");
					router.push("/"); // change to company page
				} else {
					toast.error("Edit Company Data failed");
				}
			} catch (error) {
				console.error(error);
				toast.error("Error updating company");
			}
		} else {
			console.log("Wrong mode");
		}
	};

	const handleDeleteCompany = async (e: any) => {
		e.preventDefault();
		try {
			if (!companyId) {
				throw new Error("No Company ID given");
			}
			const response = await deleteCompany(userToken, companyId);
			if (response?.success) {
				toast.success("Delete Company Data success");
				// Should add delay to make UX better
				router.push("/"); // change to company page
			} else {
				toast.error("Delete Company Data failed");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="m-8">
			<form
				onSubmit={handleDeleteCompany}
				className="text-5xl font-bold text-white mb-4 flex flex-row justify-between"
			>
				{mode == "add" ? "Add company" : "Edit company"}
				<button
					type="submit"
					className="bg-white py-1 px-3 text-red-500 font-semibold rounded-md 
							border-2 border-red-500 hover:bg-slate-200 text-lg text-center"
				>
					Delete Company
				</button>
			</form>
			<form onSubmit={handleSubmit} className="bg-white rounded-md shadow p-8 gap-6 flex flex-col">
				<TextField
					required
					label="Name"
					type="text"
					variant="filled"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<TextField
					required
					label="Business"
					type="text"
					variant="filled"
					value={business}
					onChange={(e) => {
						setBusiness(e.target.value);
					}}
				/>
				<TextField
					required
					label="Address"
					type="text"
					variant="filled"
					value={address}
					onChange={(e) => {
						setAddress(e.target.value);
					}}
				/>
				<TextField
					required
					label="Province"
					type="text"
					variant="filled"
					value={province}
					onChange={(e) => {
						setProvince(e.target.value);
					}}
				/>
				<TextField
					required
					label="Postalcode"
					type="text"
					variant="filled"
					value={postalcode}
					onChange={(e) => {
						setPostalcode(e.target.value);
					}}
				/>
				<TextField
					required
					label="Tel"
					type="tel"
					variant="filled"
					value={tel}
					onChange={(e) => {
						setTel(e.target.value);
					}}
				/>
				<TextField
					required
					label="Picture (URL)"
					type="url"
					variant="filled"
					value={picture}
					onChange={(e) => {
						setPicture(e.target.value);
					}}
				/>
				<button
					type="submit"
					className="bg-gradient-to-br from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 py-2 px-3 text-white font-semibold rounded-md hover:bg-slate-200 text-lg"
				>
					{mode == "add" ? <>Create</> : <>Save</>}
				</button>
			</form>
			{mode == "edit" && companyId && <AddSession userToken={userToken} companyId={companyId} />}
		</div>
	);
}
