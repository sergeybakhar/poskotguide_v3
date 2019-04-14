import React, { Component } from 'react';
import styles from './Card.module.scss';
import './card.css';
import Loader from '../Loader';
import ImageGallery from 'react-image-gallery';
import '../../../node_modules/react-image-gallery/styles/scss/image-gallery.scss';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import { FacebookProvider, Comments } from 'react-facebook';
import {
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  ViberShareButton,
  FacebookIcon,
  TelegramIcon,
  WhatsappIcon,
  ViberIcon
} from 'react-share';
import { compose } from 'redux';
import { firebaseConnect, getVal } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";
import parse from 'html-react-parser';

class Card extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderMarkers(map, maps) {
    const { card } = this.props;

    new maps.Marker({
      position: {
        lat: card.map[0].center.lat,
        lng: card.map[0].center.lng
      },
      title: card.map[1].title,
      map
    });
  }

  render() {
    const { card } = this.props;
    console.log(this.props)
    return (
      card ? (
        <div className={styles.card}>
          <Helmet>
            <title>{card.header}</title>
          </Helmet>
          <h1 className={styles.card__header}>{card.header}</h1>
          {/* <span className={styles.card__address}>Адрес:</span> */}
          <p className={styles.card__description}>{parse(card.description)}</p>

          <h2 className={styles.card__title}>Посмотреть фото</h2>

          <ImageGallery
            items={card.images}
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            showBullets
            additionalClass={styles.card__slider}
          />

          <h2 className={styles.card__title}>Узнать, где это</h2>
          <div className={styles.card__map}>
            <div className={styles['card__map-inner']}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDg5tHJ15X8lBjP3aTryWcd6JEQ_yzav1s' }}
                center={
                  {
                    lat: card.map[0].center.lat,
                    lng: card.map[0].center.lng
                  }
                }
                defaultZoom={card.map[0].zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
              />
            </div>
          </div>

          <h2 className={styles.card__title}>Рассказать другим, пусть тоже узнают</h2>
          <div className={styles['card__social-share']}>
            <FacebookShareButton
              url={`http://poskotguide.od.ua/${card.url}`}
              quote={card.header}
              className={styles['card__social-share-item']}
            >
              <FacebookIcon size={40} />
            </FacebookShareButton>

            <TelegramShareButton
              url={`http://poskotguide.od.ua/${card.id}/${card.url}`}
              title={card.header}
              className={styles['card__social-share-item']}
            >
              <TelegramIcon size={40} />
            </TelegramShareButton>

            <ViberShareButton
              url={`http://poskotguide.od.ua/${card.url}`}
              title={card.header}
              className={`${styles['card__social-share-item']} ${styles['card__social-share-item--viber']}`}
            >
              <ViberIcon size={40} />
            </ViberShareButton>

            <WhatsappShareButton
              url={`http://poskotguide.od.ua/${card.url}`}
              title={card.header}
              className={styles['card__social-share-item']}
            >
              <WhatsappIcon size={40} />
            </WhatsappShareButton>
          </div>

          <h2 className={styles.card__title}>Обсудить и поделиться впечатлениями</h2>
          <div className={styles['card__fb-comments']}>
            <FacebookProvider appId="1045257252264946" language='ru_RU'  >
              <Comments href="http://localhost:3000/" width='50%' numPosts='3' orderBy='social' />
            </FacebookProvider>
          </div>
        </div>
      ) : (
          <Loader />
        )
    );
  }
}

Card.propTypes = {
  card: PropTypes.object
};

const mapStateToProps = ({ firebase }, props) => {
  return ({
    card: getVal(firebase, `data/cards/${props.match.params.id - 1}`),
  })
};

export default compose(
  firebaseConnect((props) => {
    return [
      { path: `/cards/${props.match.params.id - 1}` },
    ]
  }),
  connect(mapStateToProps)
)(Card)
