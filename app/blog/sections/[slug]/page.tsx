// app/blog/sections/[slug]/page.tsx
import { loadData } from "@/src/utils/blogData/loadData"; // ✅ maintenant externe
import { Metadata, ResolvingMetadata } from "next";
import ButtonPage from "@components/Blog/ButtonPage";
import SectionContainer from "@/app/blog/SectionContainer";
import BlogIcon from "@components/svg_Icon/Blog";
export async function generateStaticParams() {
    const { sections } = await loadData();
    return sections.map(({ slug }) => ({ slug }));
}
import SectionClient from "./SectionClient";
import { notFound } from "next/navigation";
export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const { sections, posts } = await loadData();

    const section = sections.find((s) => s.slug === slug);
    if (!section) throw new Error(`Section not found for slug: ${slug}`);

    const seo = section.seo ?? {
        title: section.title,
        description: section.description,
        image: undefined,
    };

    const parentMeta = await parent;
    const previousImages = parentMeta.openGraph?.images || [];

    const titles =
        section.postIds
            ?.map((id) => posts.find((p) => p.id === id)?.title)
            .filter(Boolean)
            .join(" • ") || "";

    return {
        title: seo.title || section.title,
        description: `${seo.description || section.description}${
            titles ? " | Articles : " + titles : ""
        }`,
        openGraph: {
            images: seo.image ? [seo.image, ...previousImages] : previousImages,
        },
    };
}

export default async function SectionPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const { sections, posts, authors } = await loadData();
    const section = sections.find((s) => s.slug === slug);
    if (!section) return notFound();

    return (
        <SectionContainer id="blog" title="Blog" icon={<BlogIcon />}>
            <ButtonPage href="/blog" />
            <SectionClient section={section} posts={posts} authors={authors} />
        </SectionContainer>
    );
}
