import { Container } from "@/components/container";
import { GameProps } from "@/utils/types/games";
import Link from "next/link";
import Image from "next/image";

async function getDalyGame() {
   try {
      const res = await fetch(
         `${process.env.NEXT_API_URL}/next-api/?api=game_day`
      );
      return res.json();
   } catch (err) {
      throw new Error("failed to fetch data");
   }
}
export default async function Home() {
   const dalyGames: GameProps = await getDalyGame();

   return (
      <main className="w-full">
         <Container>
            <h1 className="text-center font-bold text-xl mt-8 mb-5">
               Separamos um jogo exclusivo para você
            </h1>
         </Container>
      </main>
   );
}
