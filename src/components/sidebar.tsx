import { FormEvent } from "react";
import { useState } from "react";

const SideBar = () => {
  const [hamburgerButton, setHamburgerButton] = useState<boolean>(false);
  const hamburgerMenu = () => {
    const checkedBox = document.getElementById(
      "sidebar__checkbox"
    ) as HTMLInputElement;
    if (checkedBox.checked) {
      setHamburgerButton(true);
    } else {
      setHamburgerButton(false);
    }
  };
  return (
    <section className="sidebar">
      <div
        className={
          !hamburgerButton
            ? "sidebar__navigation"
            : "sidebar__navigation sidebar__navigationvisible"
        }
      >
        <nav className="sidebar__navigation__list">
          <ul className="sidebar__navigation__list__item">
            <li className="sidebar__navigation__list__item__items">
              <a
                href="./taki"
                className="sidebar__navigation__list__item__items__link"
              >
                <span>Takılar</span>
              </a>
            </li>
            <li className="sidebar__navigation__list__item__items">
              <a
                href="./hediyelik-esya"
                className="sidebar__navigation__list__item__items__link"
              >
                <span>Hediyelik Eşyalar</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <input
        type="checkbox"
        className="sidebar__checkbox"
        id="sidebar__checkbox"
        onClick={() => hamburgerMenu()}
      />
      <label htmlFor="sidebar__checkbox" className="sidebar__hamburger-menu">
        <span className="sidebar__hamburger-menu__line"></span>
      </label>
      <picture className="sidebar__logo">
        <a href="/" className="sidebar__logo--mask">
          Leylaki
        </a>
      </picture>
      <a href="/taki" className="sidebar__takilar">
        Takılar
      </a>
      <a href="/hediyelik-esya" className="sidebar__hediyelik-esyalar">
        Hediyelik Esyalar
      </a>
    </section>
  );
};
export default SideBar;
