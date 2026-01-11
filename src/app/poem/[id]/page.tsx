import { getAllPoems } from "@/lib/poems";
import PoemPlayerClient from "./PoemPlayerClient";

export async function generateStaticParams() {
  const poems = await getAllPoems();
  return poems.map((p) => ({
    id: p.id.toString(),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PoemPlayerClient id={id} />;
}
