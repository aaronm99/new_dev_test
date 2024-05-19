import { PlanetDataType } from "@/components/Planets";
import React from "react";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "./glowing-stars";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { format } from "date-fns";

const Cards = ({ data }: { data: PlanetDataType[] | [] }) => {
  return (
    <div className="py-4">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-[75%] mx-auto sm:mx-0 sm:w-full"
      >
        <CarouselContent>
          {data.map((x, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <GlowingStarsBackgroundCardPreview data={x} index={index + 1} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Cards;

function GlowingStarsBackgroundCardPreview({
  data,
  index,
}: {
  data: PlanetDataType;
  index: number;
}) {
  const formattedDate = format(data.releaseDate, "do MMMM yyyy");

  return (
    <div>
      <GlowingStarsBackgroundCard>
        <GlowingStarsTitle className="flex items-center space-x-2">
          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white">
            <p className="text-black font-bold">{index}</p>
          </div>
          <p>{data.plName}</p>
        </GlowingStarsTitle>
        <div className="">
          <GlowingStarsDescription>
            Released {formattedDate}.
          </GlowingStarsDescription>
          <GlowingStarsDescription>
            Radius of {data.plRade}
          </GlowingStarsDescription>
        </div>
      </GlowingStarsBackgroundCard>
    </div>
  );
}
