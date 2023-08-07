// Create a NextJS page for the About page
//
// 1. Create a new file called about.js in the pages directory
// 2. Add the following code to the file:
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function About() {
    return (
        <div className={styles.container}>
            <Head>
                <title>About Ben</title>
            </Head>

            <main>
                <h1>About Ben</h1>
                <p>Ben is a software engineer</p>
            </main>
        </div>
    )
}