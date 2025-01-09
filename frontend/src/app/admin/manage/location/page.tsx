
import Menu from "../../../../../components/Menu/Menu";
import Explorer from "../../../../../components/Explorer/Explorer";

export default function MangeLocation() {

  return (
    <div>
      <main>
        <h1>Admin Page: manage location</h1>
        <Menu select={'location'}/>
        
        <Explorer />

      </main>

      <footer>
        footer
      </footer>
    </div>
  );
}
