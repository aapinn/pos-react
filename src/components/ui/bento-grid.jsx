import { cn } from "@/lib/utils";
import Image from "next/image";

export const BentoGrid = ({
  className,
  children
}) => {
  return (
    (<div
      className={cn(
        "grid md:auto-rows-[20rem]  grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 w-full py-5",
        className
      )}>
      {children}
    </div>)
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  alt,
  header,
  price,
  rate,
  addItem,
  id

}) => {
  return (
    (<div
      className={cn( 
        "hover:border-3 shadow-md hover:border-green-500 row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border-2 border-transparent justify-between flex flex-col space-y-2",
        className
      )}>
      <div className="relative w-[80%] m-auto h-[7rem] md:h-[10rem] xl:h-[10rem] rounded-xl">
        <Image
        priority
        alt={alt}
        src={header}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div>
        <div
          className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div
          className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
        <div className="flex justify-between font-sans text-green-600 text-xs font-bold dark:text-green-300 mt-1">
          <p>{price}</p>
          <p className="hidden md:flex">{rate}</p>
        </div>
          <button className="w-full font-sans bg-green-100 py-2 mt-4 rounded-lg hover:bg-green-200 text-neutral-600 text-xs font-bold dark:text-neutral-300" typeof="submit" onClick={()=> addItem(id)} type="submit">Add to dish</button>
      </div>
    </div>)
  );
};
