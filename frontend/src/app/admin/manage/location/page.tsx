"use client";

import { useEffect, useState } from "react";
import LocationControl from "../../../../../components/LocationControl/LocationControl";
import Menu from "../../../../../components/Menu/Menu";

export default function MangeLocation() {
  const dataA = [
    'Coffee',
    'Tea',
    'Milk',
    'Coffee',
    'Tea',
    'Milk',
  ]

  const dataB = [
    'Coffee',
    'Tea',
    'Milk',
    'Coffee',
    'Tea',
    'Milk',
    'Coffee',
    'Tea',
    'Milk',
    'Coffee',
    'Tea',
    'Milk',
    'Coffee',
    'Coffee',
    'Tea',
    'Milk',
    'Coffee',
    'Tea',
    'Milk',
    'Coffee',
    'Tea',
    'Milk',
    'Coffee',
    'Tea',
    'Milk',
  ]

  const dataC = [
    'Coffee',
    'Tea',
    'Milk',
    'Coffee',
    'Tea',
    'Milk',
    'Coffee',
    'Tea',
    'Milk',
    'Coffee',
    'Tea',
    'Milk',
    'Coffee',
    'Tea',
    'Milk',
    'Coffee',
    'Tea',
    'Milk',
    'Coffee',
    'Tea',
    'Milk',
    'Coffee',
    'Tea',
    'Tea',
    'Milk',
    'Coffee',
    'Tea',
    'Milk',
    'Coffee',
    'Tea',
    'Milk',
    'Coffee',
    'Tea',
    'Milk',
    'Coffee',
    'Tea',
    'Milk',
    'Coffee',
    'Tea',
    'Milk',
    'Coffee',
    'Tea',
    'Milk',
    'Coffee',
    'Tea',
    'Milk',
  ]

  const [selected, setSelected] = useState<{
    building: string | null;
    floor: string | null;
    zone: string | null;
  }>({
    building: null,
    floor: null,
    zone: null,
  });
  
  useEffect(() => {
  }, [selected]);

  return (
    <div>
      <main>
        <h1>Admin Page: manage location</h1>
        <Menu select={'location'}/>
        container
        

        <div className="flex-justify-content">
          <LocationControl name={'building'} data={dataA} selected={selected} setSelected={setSelected}/>
          <LocationControl name={'floor'} data={dataB} selected={selected} setSelected={setSelected}/>
          <LocationControl name={'zone'} data={dataC} selected={selected} setSelected={setSelected}/>
        </div>



      </main>


      <footer>
        footer
      </footer>
    </div>
  );
}
