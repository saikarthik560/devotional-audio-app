import { getAllPoems, getPoemById } from "@/lib/poems";
import { PoemClient } from "./PoemClient";
import { notFound } from "next/navigation";
import { LayeredBackground } from "@/components/LayeredBackground";
import { ParticleSystem } from "@/components/ParticleSystem";
import { GlowLayer } from "@/components/GlowLayer";
import Image from "next/image";
import Link from "next/link";

interface PoemPlayerPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const poems = await getAllPoems();
  return poems.map((poem) => ({
    id: poem.id,
  }));
}

export default async function PoemPlayerPage({ params }: PoemPlayerPageProps) {
  const resolvedParams = await params;
  const poem = await getPoemById(resolvedParams.id);

  if (!poem) {
    return (
      <div className="relative min-h-screen bg-[#0a0a14] flex items-center justify-center">
        <LayeredBackground intensity={1} />
        <ParticleSystem count={20} layer="background" interactive />
        <GlowLayer intensity={0.6} color="gold" />
        <ParticleSystem count={15} layer="foreground" interactive />
        <div className="relative z-20 text-center px-4">
          <div className="w-24 h-24 mx-auto mb-8 opacity-40">
            <Image src="/icons/lotus.svg" alt="Lotus" width={96} height={96} />
          </div>
          <h1 className="font-serif text-2xl text-amber-200/80 mb-4">Sacred verse not found</h1>
          <p className="font-serif text-amber-400/50 mb-8">This devotion may be preparing to bloom</p>
          <Link href="/library" className="font-serif text-amber-400/60 hover:text-amber-300 transition-colors duration-500">
            Return to Library
          </Link>
        </div>
      </div>
    );
  }

  return <PoemClient poem={poem} />;
}
