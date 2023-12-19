import logo from '../images/pizza.png';

export default function Header(){

    return(
        <div className="row">
            <span>
              <h1 className="header-text">Pizza Calculator</h1>
            </span>
            <span>
              <img src={logo} className="app-logo" alt="pizza" />
            </span>
        </div>
    )
}