import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'

export default function Product01() {
    return (
        <Layout>
            <Head>
                <title>Product 01</title>
            </Head>
            <h1>Product 01</h1>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
        </Layout>
    )
}