import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export function TopClients() {
  return (
    <>
      <div className='text-center text-4xl font-bold'>
        Well-versed in all your most-used programs.
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true
        }}
        className="w-full m-4 mt-20"
      >
        <CarouselContent>
          {Array.from({ length: 7 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center h-[80px] justify-center p-6">
                    <Image alt="" src={`/landing-page/${index + 1}.svg`} width={134} height={30} />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  )
}
