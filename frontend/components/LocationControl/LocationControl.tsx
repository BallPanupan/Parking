import { useEffect } from "react";
import styles from "./LocationControl.module.css";
interface IProps {
	name: any,
	data: any;
	selectedKey: any;
	setSelectedKey: any;
}

export default function LocationControl({ name, data, selectedKey, setSelectedKey }: IProps) {

	// console.log(`LocationControl ${name}:`, data)

	const updateSelected = (name: string, value: any) => {
		const nameId = `${name}Id`;

		setSelectedKey((prev: any) => {
			let updatedKey = { ...prev, [nameId]: value };
			switch (name) {
				case 'building':
					updatedKey = { buildingId: value, floorId: null, zoneId: null };
					break;
				case 'floor':
					updatedKey = { ...prev, floorId: value, zoneId: null };
					break;
				case 'zone':
					break;
				default:
					return prev;
			}
			return updatedKey;
		});
	};

	useEffect(() => {
	}, [selectedKey]);

	return (
		<div className={styles.locationControl}>
			<p>{name}</p>
			<div className={styles.list}>
				<menu className={styles.menu}>
					{data.map((item: any) => {
						return (
							<ul
								className={selectedKey[`${name}Id`] === item.id ? 'selected' : ""}
								key={item.id}
								onClick={() => updateSelected(name, item.id)}
							>
								<li
								>
									{item.name}
								</li>
								<li className="remove">Remove</li>
							</ul>
						);
					})}
				</menu>
			</div>
		</div>
	);
}
