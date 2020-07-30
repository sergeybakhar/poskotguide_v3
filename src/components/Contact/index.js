import React from 'react';
import styles from './Contact.module.scss';
import { FacebookProvider, Comments } from 'react-facebook';
import { Helmet } from "react-helmet";

const Contact = () => (
    <div className={styles.contact}>
        <Helmet>
            <title>Контакты</title>
        </Helmet>
        <p className={styles.contact__description}>Любые отзывы, пожелания и рекомендации только приветствуются!</p>
        <div className={styles['contact__fb-comments']}>
            <FacebookProvider appId="1045257252264946" language='ru_RU'  >
                <Comments href="http://poskotguide.od.ua/#/contact" width='100%' numPosts='3' orderBy='reverse_time' />
            </FacebookProvider>
        </div>
    </div>
);

export default Contact;