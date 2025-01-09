"use client";

import { useEffect, useState } from "react";
import LocationControl from "../LocationControl/LocationControl";
import styles from "./Explorer.module.css";

export default function Explorer() {

	const buildInformation = [
		{
			id: 'building001',
			name: "A",
			type: 'building',
			floor: [
				{
					id: 'floor001',
					name: '01',
					type: 'floor',
					zone: [
						{ id: 'zone001', name: 'zone01', type: 'zone' },
						{ id: 'zone002', name: 'zone02', type: 'zone' },
						{ id: 'zone022', name: 'zone022', type: 'zone' },

					]
				},
				{
					id: 'floor002',
					name: '02',
					type: 'floor',
					zone: [
						{ id: 'zone003', name: 'zone03', type: 'zone' },
						{ id: 'zone004', name: 'zone04', type: 'zone' },
						{ id: 'zone019', name: 'zone019', type: 'zone' },
						{ id: 'zone020', name: 'zone020', type: 'zone' },
						{ id: 'zone021', name: 'zone021', type: 'zone' },
					]
				}
			]
		},
		{
			id: 'building002',
			name: "B",
			type: 'building',
			floor: [
				{
					id: 'floor003',
					name: '03',
					type: 'floor',
					zone: [
						{ id: 'zone005', name: 'zone005', type: 'zone' },
						{ id: 'zone006', name: 'zone006', type: 'zone' },
						{ id: 'zone013', name: 'zone013', type: 'zone' },
						{ id: 'zone014', name: 'zone014', type: 'zone' },
						{ id: 'zone015', name: 'zone015', type: 'zone' },
						{ id: 'zone016', name: 'zone016', type: 'zone' },
						{ id: 'zone017', name: 'zone017', type: 'zone' },
						{ id: 'zone018', name: 'zone018', type: 'zone' },
					]
				},
				{
					id: 'floor004',
					name: '04',
					type: 'floor',
					zone: [
						{ id: 'zone007', name: 'zone007', type: 'zone' },
						{ id: 'zone008', name: 'zone008', type: 'zone' },
						{ id: 'zone009', name: 'zone009', type: 'zone' },
						{ id: 'zone010', name: 'zone010', type: 'zone' },
						{ id: 'zone011', name: 'zone011', type: 'zone' },
						{ id: 'zone012', name: 'zone012', type: 'zone' },
					]
				}
			]
		},
		{
			id: 'building003',
			name: "C",
			type: 'building',
			floor: [
				{
					id: 'floor001',
					name: '01',
					type: 'floor',
					zone: [
						{ id: 'zoneA01', name: 'Alpha', type: 'zone' },
						{ id: 'zoneB02', name: 'Beta', type: 'zone' },
						{ id: 'zoneC03', name: 'Gamma', type: 'zone' }
					]
				},
				{
					id: 'floor002',
					name: '02',
					type: 'floor',
					zone: [
						{ id: 'zoneD04', name: 'Delta', type: 'zone' },
						{ id: 'zoneE05', name: 'Epsilon', type: 'zone' },
						{ id: 'zoneF06', name: 'Zeta', type: 'zone' },
						{ id: 'zoneG07', name: 'Eta', type: 'zone' },
						{ id: 'zoneH08', name: 'Theta', type: 'zone' }
					]
				},
				{
					id: 'floor003',
					name: '03',
					type: 'floor',
					zone: [
						{ id: 'zoneI09', name: 'Iota', type: 'zone' },
						{ id: 'zoneJ10', name: 'Kappa', type: 'zone' }
					]
				},
				{
					id: 'floor004',
					name: '04',
					type: 'floor',
					zone: [
						{ id: 'zoneK11', name: 'Lambda', type: 'zone' },
						{ id: 'zoneL12', name: 'Mu', type: 'zone' },
						{ id: 'zoneM13', name: 'Nu', type: 'zone' },
						{ id: 'zoneN14', name: 'Xi', type: 'zone' },
						{ id: 'zoneO15', name: 'Omicron', type: 'zone' },
						{ id: 'zoneP16', name: 'Pi', type: 'zone' }
					]
				},
				{
					id: 'floor005',
					name: '05',
					type: 'floor',
					zone: [
						{ id: 'zoneQ17', name: 'Rho', type: 'zone' },
						{ id: 'zoneR18', name: 'Sigma', type: 'zone' },
						{ id: 'zoneS19', name: 'Tau', type: 'zone' }
					]
				}
			]
		},

		{
			id: 'building004',
			name: "D",
			type: 'building',
			floor: [
				{
					id: 'floor007',
					name: '07',
					type: 'floor',
					zone: [
						{ id: 'zone013', name: 'zone13', type: 'zone' },
						{ id: 'zone014', name: 'zone14', type: 'zone' }
					]
				},
				{
					id: 'floor008',
					name: '08',
					type: 'floor',
					zone: [
						{ id: 'zone015', name: 'zone15', type: 'zone' },
						{ id: 'zone016', name: 'zone16', type: 'zone' }
					]
				}
			]
		}
	];

	const [selectedKey, setSelectedKey] = useState<any>({
		buildingId: null,
		floorId: null,
		zoneId: null,
	});

	const [selectedData, setSelectedData] = useState<any>({
		building: [],
		floor: [],
		zone: [],
	});


	useEffect(() => {
		const selectedBuilding = buildInformation.find((data) => data.id === selectedKey.buildingId);
		const selectedZone = selectedBuilding?.floor.find((data) => data.id === selectedKey.floorId);

		setSelectedData({
			building: [],
			floor: selectedBuilding?.floor || [],
			zone: selectedZone?.zone || [],
		});
	}, [selectedKey]);

	return (
		<div className={styles.Explorer}>
			<div className="flex-direction">
				<LocationControl name={'building'} data={buildInformation} selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
				<LocationControl name={'floor'} data={selectedData.floor || []} selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
				<LocationControl name={'zone'} data={selectedData.zone || []} selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
			</div>
		</div>
	);
}
