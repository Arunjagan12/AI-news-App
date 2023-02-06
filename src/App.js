import React , {useState,useEffect} from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import NewsCards from './components/NewsCards/NewsCards';

import useStyles from './styles';

const AlanKey='a5607ae0e1b0e5a0d2755cf4c3bbb9fd2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {

  const [newsArticles , setNewsArticles] = useState([]);
  const [activeArticle,setActiveArticle] = useState(-1);

  const classes = useStyles();

    useEffect( () =>{
    alanBtn({ key: AlanKey,
      onCommand : ({command , articles, number}) =>{
        if(command==='newHeadlines'){
          setNewsArticles(articles);
          setActiveArticle(-1);
        }
        else if(command==='highlight'){
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        }
        else if(command==='open'){
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

    });
    },[]);
  return (
    <div>
       <div className={classes.logoContainer}>
       <img src="https://pbs.twimg.com/profile_images/882601763387449346/D_9Fb-Oz_400x400.jpg" className={classes.alanLogo} alt="logo" />
       </div>
       <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="https://www.linkedin.com/in/j-arun-b5827b229"> Arun </a> 
        
          </Typography>
        </div>
      ) : null}
    </div>
  );
};

export default App