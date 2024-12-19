import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import './header.scss';

function Header() {
  return (
    <section className='header'>
      <figure>
        <img src="/assets/logo.svg" alt="logo"/>
      </figure>
      <ul className='header__menu'>
        <li className='header__menu-item active-menu'>Github <KeyboardArrowDownIcon /></li>
        <li className='header__menu-item'>HTML <KeyboardArrowDownIcon /></li>
        <li className='header__menu-item'>CSS <KeyboardArrowDownIcon /></li>
        <li className='header__menu-item'>Javascript <KeyboardArrowDownIcon /></li>
      </ul>
      <div>
        <PersonIcon />
      </div>
    </section>
  )
}

export default Header