import styles from "./LocationControl.module.css";

interface IProps {
	name: "building" | "floor" | "zone";
	data: string[];
	selected: any;
	setSelected: any;
}

export default function LocationControl({ name, data, selected, setSelected }: IProps) {
	const updateSelected = (name: "building" | "floor" | "zone", value: any) => {
		if (selected['building'] && (name === 'building' && selected['building'] !== value)) {
			setSelected({
				building: value,
				floor: null,
				zone: null,
			})
		}
		setSelected((prevState: any) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<div className={styles.locationControl}>
			<p>{name}</p>
			<div className={styles.list}>
				<menu className={styles.menu}>
					{data.map((item: string, index: number) => {
						return (
							<li
								className={selected[name] === index ? 'selected' : ""}
								key={index}
								onClick={() => updateSelected(name, index)}
							>
								{item}
							</li>
						);
					})}
				</menu>
			</div>
		</div>
	);
}
