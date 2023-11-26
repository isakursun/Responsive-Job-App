import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header>
        <h2>
            <img
            height={70} src="https://logos.textgiraffe.com/logos/logo-name/Job-designstyle-summer-m.png" />
            <span>İş Takip</span>
        </h2>
        <nav>
            <NavLink to={"/"}>İş Listesi</NavLink>
            <NavLink to={"/add-job"}>İş Ekle</NavLink>
        </nav>
    </header>
  )
}

export default Header