import MemoGlobe from "@/components/globe";
import Cards from "@/components/ui/cards";
import { DataTable } from "@/components/ui/data-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils";
import { motion } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";
import React from "react";
import style from "./style.module.scss";

export type PlanetDataType = {
  plName: string;
  releaseDate: string;
  plRade: string;
};

const Planets = ({ planetData }: { planetData: PlanetDataType[] | [] }) => {
  const [view, setView] = React.useState<"list" | "grid">("list");

  return (
    <motion.div
      transition={{
        initial: { opacity: 0, y: "0%", x: "0%" },
        viewport: { once: true, margin: "0px 0px -50px" },
        whileInView: { opacity: 1, y: "0%", x: "0%" },
        transition: { duration: 0.4, damping: 500, stiffness: 10 },
      }}
      className={style.planets}
    >
      <div className="">
        <div className={style.heading__wrapper}>
          <div className="flex items-center">
            <h2 id="planets">Planets</h2>
            <div className="-ml-16 hidden sm:block">
              <MemoGlobe />
            </div>
          </div>

          <Select
            defaultValue="list"
            onValueChange={(e: "list" | "grid") => {
              setView(e);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a view" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>View as</SelectLabel>
                <SelectItem value="list">
                  <div className={cn("space-x-2", style.select)}>
                    <List />
                    <p>List</p>
                  </div>
                </SelectItem>
                <SelectItem value="grid">
                  <div className={cn("space-x-2", style.select)}>
                    <LayoutGrid />
                    <p>Grid</p>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className={style.planet__table}>
        {view === "list" && (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85 }}
          >
            <DataTable data={planetData} />
          </motion.div>
        )}
        {view === "grid" && (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85 }}
          >
            <Cards data={planetData} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Planets;
