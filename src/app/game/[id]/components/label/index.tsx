interface LabelProps {
   name: string;
}

export function Label({ name }: LabelProps) {
   return (
      <div className="flex-grow sm:flex-grow-0 py-1 px-3 text-center text-black rounded-lg bg-slate-200 hover:font-bold duration-200">
         {name}
      </div>
   );
}
