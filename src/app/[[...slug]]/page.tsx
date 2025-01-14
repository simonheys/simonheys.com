import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Components, { MappedComponent } from '../../components/Components';
import Fill from '../../components/ui/Fill';
import {
  Component,
  content,
  getComponentsForPath,
  getMeta,
  getPageForPath,
  getPagePaths,
  Page as PageType,
} from '../../modules/content';

const meta = getMeta();

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

type PageWithHeader = PageType & {
  header?: Component;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const slug = params?.slug || [];
  const page = getPageForPath(slug);

  if (!page) {
    return {
      title: 'Not Found',
    };
  }

  const { title, subtitle, description, excerpt } = page;
  const pageTitle = [title, subtitle, ...meta.titles]
    .filter(Boolean)
    .join(' – ');

  return {
    title: pageTitle,
    description: description || subtitle,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug.join('/')}`,
    },
    openGraph: {
      title: pageTitle,
      description: description || subtitle || excerpt,
      images: [`${process.env.NEXT_PUBLIC_BASE_URL}/og/image.png`],
    },
  };
}

export async function generateStaticParams() {
  const paths = getPagePaths();
  return paths.map((path) => ({
    slug:
      (path as unknown as { params: { slug?: string[] } }).params?.slug || [],
  }));
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const slug = params?.slug || [];
  const page = getPageForPath(slug) as PageWithHeader;

  if (!page) {
    notFound();
  }

  const components = getComponentsForPath(slug);
  const { path, fill, header = content.all.header as Component } = page;

  return (
    <>
      {fill ? (
        <Fill>
          <MappedComponent {...header} />
          <MappedComponent {...fill} />
        </Fill>
      ) : (
        <MappedComponent {...header} />
      )}
      {components && <Components components={components} key={path} />}
    </>
  );
}
