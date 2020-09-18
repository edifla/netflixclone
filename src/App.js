import React, {useEffect, useState} from  'react';
import Tmdb from './Tmdb';
import MovieRow from './componentes/MovieRow'
import './App.css';
import FeaturedMovie from './componentes/FeaturedMovie';
import Header from './componentes/Header';

export default() => {

  const [movielist, setMovieList] = useState([]);
  const[featuredData,setFeaturedData] = useState(null);
  const[blackHeader, setBlackHeader] =useState(false);
  useEffect(()=>{
    
    const loadALL = async() => {
      //Pegando a lista TOTAl

      let list = await Tmdb.getHomelist();
      setMovieList(list)//Exibe as listas


      //  Pegar o filme em destaque(Featured)
      let originals = list.filter(i=>i.slug==='originals');//Pegou da lista apenas quem tem o SLUG Originals
      let randomChosen = Math.floor(Math.random()*(originals[0].items.results.length -1)); //Vai gerar um número aleatório que estará armazenando um filme
      let chosen = originals[0].items.results[randomChosen];//Pega o filme escolhido
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id,'tv');

      setFeaturedData(chosenInfo);//Exibe o destaque
      
    }

    loadALL();

  },[]);
  useEffect(()=>{
    const scrollListener= () =>{
      
      if(window.scrollY > 10){

        setBlackHeader(true);

      }else{

        setBlackHeader(false)

      }
    }
    window.addEventListener('scroll', scrollListener);
    
    return () =>{
      window.removeEventListener('scroll',scrollListener);
    }

  },[]);
  
  return (
    <div className="page"> 
     
      <Header black={blackHeader}/>

      {featuredData &&
      <FeaturedMovie item={featuredData} />
      }
     
      
      <section className="lists">

        {movielist.map((item,key)=>(
            <MovieRow key={key} title={item.title} items={item.items} />
        ))}

      </section>
          <footer>
             Feito por Rafael Albuquerque <br/>
             seguindo os passos da B7Web. <br/>
             Direitos de imagem para Netflix.<br/>
             Dados pegos do site Themoviedb.org.<br/>
          </footer>

          {movielist.length <= 0 &&
              <div className="Loading">
                  <img src="https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading.gif"></img>
              </div>
          }
    </div>
  );
}
