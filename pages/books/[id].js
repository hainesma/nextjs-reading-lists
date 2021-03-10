import { GraphQLClient } from "graphql-request";

const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT);

// Exporting async getStaticProps causes Next.js to pre-render this page at build time.
export async function getStaticProps({ params }) {
    console.log({ book });
    const { book } = await graphcms.request(
        `
        query Book() {
            book(where: { id: $id }) {
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
        `,
        {
            id: params.id,
        }
    );

    return {
        props: {
            book,
        },
    };
}

// getStaticPaths lets you specify which paths to pre-render
export async function getStaticPaths() {
    const books = await graphcms.request(`
    {
        books(where: { id: $id }) {
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
    `;

    return {
        paths: books.map( ({ id }) => ({
            params: { id },
        })),
        fallback: false,
    };
}

export default function BookPage({ book }) {
    return (
        <div>
        <div
            style = {{ backgroundImage: `url(${book.image.url})` }}
            title = { book.title }
        />
        <div>
            { book.title }
        </div>
        </div>
    )
}