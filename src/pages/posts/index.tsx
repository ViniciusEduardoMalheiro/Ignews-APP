import Head from 'next/head'
import { getPrismicClient } from '../../services/prismic'
import styles from './styles.module.scss' 
import { GetStaticProps } from 'next';
import  Prismic  from '@prismicio/client'
import { RichText } from 'prismic-dom';

type Post = {
     slug: string;
     title: string,
     excerpt: string,
     updatedAt: string,
};
interface PostsProps {
    posts: Post[],
}

export default function Posts ({ posts }: PostsProps) {
    return (
        <>
        <Head>
            <title>Posts | Ignews</title>
        </Head>

        <main className={styles.container}>
            <div className={styles.posts}>
                
            <a href="#">
                <time>28 de abril de 2022</time>
                <strong>Como renomear vários arquivos de uma vez usando o terminal</strong>
                <p>Suponha que seu projeto tenha uma base de código com 150 arquivos JavaScript e você precisar migrar para TypeScript alterando as extensões dos arquivos. </p>
            </a>
            <a href="#">
                <time>28 de abril de 2022</time>
                <strong>Como renomear vários arquivos de uma vez usando o terminal</strong>
                <p>Suponha que seu projeto tenha uma base de código com 150 arquivos JavaScript e você precisar migrar para TypeScript alterando as extensões dos arquivos. </p>
            </a>
            <a href="#">
                <time>28 de abril de 2022</time>
                <strong>Como renomear vários arquivos de uma vez usando o terminal</strong>
                <p>Suponha que seu projeto tenha uma base de código com 150 arquivos JavaScript e você precisar migrar para TypeScript alterando as extensões dos arquivos. </p>
            </a>
            </div>
        </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();


    const response = await prismic.query<any>([
        Prismic.predicates.at('document.type', 'publication') 
    ], {    
        fetch: ['publication.title', 'publication.content'],
        pageSize: 100,
    })

    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            })
        };
    })
       
     return {
         props: { }
     }
}