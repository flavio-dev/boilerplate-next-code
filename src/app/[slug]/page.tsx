import { tMix } from "./types";

export async function generateStaticParams() {
  const res = await fetch("https://api.mixcloud.com/homesessionz/favorites/");
  const { data: mixes } = await res.json();

  return mixes.map((mix: tMix) => ({
    slug: mix.slug,
  }));
}

const getMixInfo = async (slug: string) => {
  const res = await fetch(`https://api.mixcloud.com/homesessionz/${slug}`, {
    cache: "force-cache",
  });
  const mixInfo = await res.json();
  return mixInfo;
};

export default async function MixPage({
  params,
}: {
  params: { slug: string };
}) {
  const mixInfo = await getMixInfo(params.slug);

  console.log("mixInfo  ", mixInfo);

  return (
    <div>
      <p>mix page with key : {params.slug}</p>
      <p>description: {mixInfo.description}</p>
    </div>
  );
}
