import Link from "next/link";
import styles from "./Menu.module.css";

// Define the type for the props object
interface MenuProps {
  select?: string;
}

export default function Menu({ select }: MenuProps) {
	const listMenuKey = {
		'location'       : 'Manage Location',
		'parking-package': 'Manage Parking Package',
		'parking-using'  : 'Parking using',
	}

	const ListMenu = () => {
		const result = Object.entries(listMenuKey).map(([key, value]) => (
			<li
				key={key}
				className={key === select ? styles.select : ''}
			>
				<Link href={`/admin/manage/${key}`}>{value}</Link>
			</li>
		));
		return result;
	}

  return (
    <menu className={styles.menu}>
      <ListMenu/>
    </menu>
  );
}
