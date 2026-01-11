import poems from "@/data/poems.json";
import PoemPlayerClient from "./PoemPlayerClient";

export function generateStaticParams() {
  return poems.map((p: { id: string | number }) => ({
    id: p.id.toString(),
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  return <PoemPlayerClient id={params.id} />;
}
