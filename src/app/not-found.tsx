import Link from "next/link";


import styles from '@/components/404/style.module.css';


export default function NotFound() {
    return (
    <div id={styles.body}>
        <div id={styles.notfound}>
            <div className={styles.notfound_bg}></div>
            <div className={styles.notfound}>
                <div className={styles.notfound_404}>
                    <h1>404</h1>
                </div>
                <h2>Oops! Page Not Found</h2>
                <Link href="/">Back to HomePage</Link>
            </div>
        </div>
    </div>
    );
}