import { Search } from "lucide-react";
import { WindowControls } from "../components";
import WindowWrapper from "../hoc/WindowWrapper";
import { locations } from "../constants";
import useLocationStore from "../store/location";
import clsx from "clsx";

const Finder = () => {
  const { activeLocation, setActiveLocation } = useLocationStore();

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          <div>
            <h3>Favorites</h3>
            <ul>
              {Object.values(locations).map((item) => (
                <li key={item.id} onClick={() => setActiveLocation(item)} className={clsx(item.id === activeLocation.id ? 'active' : 'not-active')}>
                  <img src={item.icon} className="w-3" alt={item.name}/>
                  <p className="text-sm font-medium truncate">{item.name}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Work</h3>
            <ul>
              <ul>
              {locations.work.children.map((item) => (
                <li key={item.id} onClick={() => setActiveLocation(item)} className={clsx(item.id === activeLocation.id ? 'active' : 'not-active')}>
                  <img src={item.icon} className="w-3" alt={item.name}/>
                  <p className="text-sm font-medium truncate">{item.name}</p>
                </li>
              ))}
            </ul>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
