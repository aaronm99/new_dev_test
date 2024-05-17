import { GlobeDemo } from "@/components/globe";
import style from "./style.module.scss";
import { DataTableDemo } from "@/components/ui/data-table";

export type PlanetDataType = {
  plName: string;
  releaseDate: string;
  plRade: string;
};

const Information = ({ planetData }: { planetData: PlanetDataType[] | [] }) => {
  return (
    <div className={style.planets}>
      <div>
        <h1>Planets</h1>
        <GlobeDemo />
      </div>
      <div className={style.planet__table}>
        <DataTableDemo data={planetData} />
      </div>
    </div>
  );
};

export default Information;
