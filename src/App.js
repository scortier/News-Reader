import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

import logo from './logo.jpeg';
import { NewsCards, Modal } from './components';
import useStyles from './styles';

const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    alanBtn({
//       key: '64370f4c903e66c5b517887fefa45c1b2e956eca572e1d8b807a3e2338fdd0dc/stage',
         key: 'b7c5003f6518b3a80b4d1ca9f98631012e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'instructions') {
          setIsOpen(true);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
//       onConnectionStatus: async function (status) {
//         if (status === 'authorized') {
//           await alanBtnInstance.activate();
//           alanBtnInstance.playText(
//             'Welcome to the Alan AI News Reader App by Aditya Singh Sisodiya'
//           );
//         }
//       },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        <img src="data:image/jpeg;base64,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" className={classes.alanLogo} alt="logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="https://www.linkedin.com/in/scortier/"> Aditya Singh Sisodiya</a> 
          </Typography>
          <img className={classes.image} src={logo} height="50px" alt="logo" />
        </div>
      ) : null}
    </div>
  );
};

export default App;
