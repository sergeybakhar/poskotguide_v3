import React from 'react';
import Card from '../Card';
import CardsList from '../CardsList';
import Contact from '../Contact';
import Header from '../Header';
import Footer from '../Footer';
import NotFound from '../NotFound';
import Intro from '../Intro';
import styles from './App.module.scss';
import { HashRouter, Route, Switch } from 'react-router-dom';
import TopCards from '../TopCards';
import MapPage from '../Map';

const App = () => (
  <div className={styles.container}>
    <HashRouter>
      <>
        <Header />
        <Intro />
        <Switch>
          <Route exact path="/" component={CardsList} />
          <Route exact path="/contact/" component={Contact} />
          {/* <Route exact path="/map" component={Map} /> */}
          <Route exact path="/map" component={MapPage} />
          <Route exact path="/:id/:cardURL/" component={Card} />
          <Route exact path="/404.html" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
        <TopCards />
        <Footer />
      </>
    </HashRouter>
  </div>
);

export default App;
