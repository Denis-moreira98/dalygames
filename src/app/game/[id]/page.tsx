import { GameProps } from "@/utils/types/games";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/container";
import { Label } from "./components/label/index";
import { GameCard } from "@/components/gameCard";

async function getData(id: string) {
   try {
      const res = await fetch(
         `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
         { cache: "no-store" }
      );

      return res.json();
   } catch (err) {
      throw new Error("Failed to fetch data");
   }
}

async function getGameSorted() {
   try {
      const res = await fetch(
         `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
         { cache: "no-store" }
      );
      return res.json();
   } catch (err) {
      throw new Error("Failed to fetch data");
   }
}

export default async function Game({
   params: { id },
}: {
   params: { id: string };
}) {
   const data: GameProps = await getData(id);
   const sortedGame: GameProps = await getGameSorted();

   if (!data) {
      redirect("/");
   }

   return (
      <main className="w-full text-black">
         <div className="bg-black h-80 w-full relative sm:h-96">
            <Image
               className="object-cover w-full h-80 sm:96 opacity-75"
               alt={`Imagem do jogo ${data.title}`}
               src={data.image_url}
               priority={true}
               quality={100}
               fill={true}
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
            />
         </div>
         <Container>
            <h1 className="font-bold text-xl my-4">{data.title}</h1>
            <p>{data.description}</p>
            <h2 className="font-bold text-lg mt-2 mb-2">PLataforma</h2>
            <div className="flex gap-2 flex-wrap">
               {data.platforms.map((item) => (
                  <Label name={item} key={item} />
               ))}
            </div>

            <h2 className="font-bold text-lg mt-2 mb-2">Categorias</h2>
            <div className="flex gap-2 flex-wrap">
               {data.categories.map((item) => (
                  <Label name={item} key={item} />
               ))}
            </div>

            <p className="mt-7 mb-2">
               <strong>Data de Lançamento: </strong>
               {data.release}
            </p>

            <h2 className="font-bold text-lg mt-2 mb-2">Jogo recomendado:</h2>
            <div className="flex">
               <div className="flex-grow">
                  <GameCard data={sortedGame} />
               </div>
            </div>
         </Container>
      </main>
   );
}
