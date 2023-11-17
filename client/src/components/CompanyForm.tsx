"use client";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import createCompany from "@/libs/createCompany";
import editCompany from "@/libs/editCompany";
import getCompany from "@/libs/getCompany";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";

export default function CompanyForm({ userToken, mode, id }: { userToken: string; mode: string; id?: string }) {
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
		if (mode === "edit" && id) {
			setLoading(true);
			getCompany(id)
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

	if (mode === "edit" && !id) {
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
				if (!id) {
					throw new Error("No Company ID given");
				}
				const response = await editCompany(userToken, {
					id: id,
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

	return (
		<form onSubmit={handleSubmit}>
			<div className="m-8">
				<div className="text-5xl font-bold text-white mb-4">
					{mode == "add" ? "Add company" : "Edit company"}
				</div>
				<div className="bg-white rounded-md shadow p-8 gap-6 flex flex-col">
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
				</div>
				{mode == "edit" && (
					<>
						<div className="text-5xl font-bold text-white my-4 pt-2">Interview Session</div>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<div className="bg-white rounded-md shadow p-8 gap-6 flex flex-col">
								<div className="font-semibold text-3xl">Add Session</div>
								<DatePicker
									className="w-1/2 pr-3"
									label="Date"
									slotProps={{ textField: { variant: "filled" } }}
								/>
								<div className="flex gap-6">
									<TimePicker
										className="w-full"
										label="Time start"
										slotProps={{ textField: { variant: "filled" } }}
									/>
									<TimePicker
										className="w-full"
										label="Time end"
										slotProps={{ textField: { variant: "filled" } }}
									/>
								</div>
								<button
									type="submit"
									className="bg-gradient-to-br from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 py-2 px-3 text-white font-semibold rounded-md hover:bg-slate-200 text-lg"
								>
									Add
								</button>
							</div>
						</LocalizationProvider>
					</>
				)}
			</div>
		</form>
	);
}
