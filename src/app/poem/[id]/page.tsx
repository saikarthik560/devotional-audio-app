import { getAllPoems } from "@/lib/poems";
import PoemPlayerClient from "./PoemPlayerClient";

export async function generateStaticParams() {
  const poems = await getAllPoems();
  return poems.map((p) => ({
    id: p.id.toString(),
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  return <PoemPlayerClient id={params.id} />;
}
