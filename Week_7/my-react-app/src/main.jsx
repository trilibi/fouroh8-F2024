import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import HelloWorld from './components/HelloWorld.jsx'
import 'materialize-css/dist/css/materialize.min.css'
import FetchPokemon from './components/pokemon.jsx'

//Carousel Component

function Carousel() {

  return<><div class="carousel">
  <a class="carousel-item" href="#one!"><img src="https://picsum.photos/200/300" /></a>
  <a class="carousel-item" href="#two!"><img src="https://picsum.photos/200/300" /></a>
  <a class="carousel-item" href="#three!"><img src="https://picsum.photos/200/300" /></a>
  <a class="carousel-item" href="#four!"><img src="https://picsum.photos/200/300" /></a>
  <a class="carousel-item" href="#five!"><img src="https://picsum.photos/200/300" /></a>
</div></>

}

//This is the actual application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo center">Jake</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">JavaScript</a></li>
      </ul>
    </div>
  </nav>
<HelloWorld name="Jake" age="23"/>   
<FetchPokemon />
    
  </StrictMode>,
)
