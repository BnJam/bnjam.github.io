import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css';

export default function BlogPosts() {
    return (
        <div className={styles.container}>
        <Head>
            <title>Blog Posts</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    
        <main>
            <div className={styles.grid}>
            {/* <Link href={"blog_posts/index.js"} className={styles.card}> */}
            <Link href={"posts/2019-06-29-approaching-distributed-systems"} className={styles.card}>
                <h3>Approaching Distributed Systems &rarr;</h3>
                <p>Learn some of the basics of distributed systems</p>
            </Link>
    
            </div>
        </main>
        </div>
    )
}