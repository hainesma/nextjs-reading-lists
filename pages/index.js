import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { GraphQLClient } from "graphql-request";
import Link from "next/link";

const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT);

const BookList = ({ books }) => {
  console.log({books})
  return (
    <div>
      <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <div>
          { books.map ( book  => (
          <div key = { book.id } as = { `/books/${book.id}` } href = "/books/[id]" >
            <a>
              <div 
                style = {{ backgroundImage: `url(${book.image.url})` }}
                title = { book.name }
              />
            </a>
            
            <p>{book.name}</p>
          </div>
          ))}
        </div>
      </section>
      </Layout>
    </div>   
  );
};

export async function getStaticProps() {
  const { books } = await graphcms.request(
    `
    query Books() {
      books {
        id
        name
        description
        link
        image {
            id
            url
        }
      }
    }
    `
  );
  console.log({ books });
  return {
    props: {
      books,
    },
  };
}
console.log(graphcms);

export default BookList;