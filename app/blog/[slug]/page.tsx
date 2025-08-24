// app/blog/[slug]/page.tsx
import { loadData } from "@/src/utils/blogData/loadData";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import PostClient from "./PostClient";
import ButtonPage from "@components/Blog/ButtonPage";
import SectionContainer from "@/app/blog/SectionContainer";
import BlogIcon from "@components/svg_Icon/Blog";
type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};
export async function generateStaticParams() {
    const { posts } = await loadData();
    return posts.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const { posts } = await loadData();
    const post = posts.find((p) => p.slug === slug);
    if (!post) throw new Error(`Post not found for slug: ${slug}`);

    const parentMeta = await parent;
    const previousImages = parentMeta.openGraph?.images || [];

    return {
        title: post.seo?.title ?? post.title,
        description: post.seo?.description ?? post.excerpt,
        openGraph: {
            images: post.seo?.image
                ? [post.seo.image, ...previousImages]
                : previousImages,
        },
    };
}

// 4) Page component — `params` est une Promise
export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const { sections, posts, authors } = await loadData();
    const post = posts.find((p) => p.slug === slug);
    if (!post) return notFound();
    return (
        <SectionContainer id="blog" title="Blog" icon={<BlogIcon />}>
            <ButtonPage href="/blog" />
            <PostClient post={post} sections={sections} authors={authors} />
        </SectionContainer>
    );
}
