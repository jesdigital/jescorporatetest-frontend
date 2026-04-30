import React, { useEffect, useState } from 'react';
import { client } from '../../client';
import { urlFor } from '../../imageBuilder';
import './header.css';

const Header = () => {
  const [headerData, setHeaderData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const query = `*[_type == "header"][0]{
      logo,
      primaryMenuItems[]{
        title,
        url
      },
      secondaryMenuItems[]{
        title,
        url,
        children[]{
          title,
          url
        }
      }
    }`;

    client.fetch(query).then((data) => {
      setHeaderData(data);
    });
  }, []);

  if (!headerData) return null;

  // ✅ Combine menus for mobile
  const combinedMenu = [
    ...(headerData.primaryMenuItems || []),
    ...(headerData.secondaryMenuItems || [])
  ];

  return (
    <header className="container-fluid shadow-sm custom-px">

      {/* TOP HEADER */}
      <div className="d-flex justify-content-between align-items-center py-3">

        {/* LEFT: LOGO */}
        <div>
          {headerData.logo && (
            <a href="/" >        
            <img
              src={urlFor(headerData.logo).width(175).url()}
              alt="Logo"
              style={{ height: '100px' }}
            />
            </a>
          )}
        </div>

        {/* RIGHT: DESKTOP MENU */}
        <div className="navigation-section d-none d-lg-block">

          {/* PRIMARY MENU */}
          <div className="nav-top">
            <nav>
              <ul className="d-flex gap-5 list-unstyled justify-content-end mb-4">
                {headerData.primaryMenuItems?.map((item, index) => (
                  <li key={index}>
                    <a href={item.url}>{item.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* SECONDARY MENU */}
          <div className="nav-bottom">
            <nav>
              <ul className="d-flex gap-5 m-0 list-unstyled">
                {headerData.secondaryMenuItems?.map((item, index) => (
                  <li key={index} className="menu-item position-relative">

                    {/* Parent */}
                    <a href={item.url}>{item.title}</a>

                    {/* CHILD MENU */}
                    {item.children && item.children.length > 0 && (
                      <ul className="submenu position-absolute">
                        {item.children.map((child, i) => (
                          <li key={i}>
                            <a href={child.url}>{child.title}</a>
                          </li>
                        ))}
                      </ul>
                    )}

                  </li>
                ))}
              </ul>
            </nav>
          </div>

        </div>

        {/* ✅ MOBILE HAMBURGER */}
        <button
          className="btn d-lg-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* ✅ MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu d-lg-none">

          <ul className="list-unstyled p-3 m-0">

            {combinedMenu.map((item, index) => (
              <li key={index} className="mb-2">

                {/* Parent */}
                <a
                  href={item.url}
                  className="d-block fw-bold"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.title}
                </a>

                {/* Children */}
                {item.children && item.children.length > 0 && (
                  <ul className="list-unstyled ps-3">
                    {item.children.map((child, i) => (
                      <li key={i}>
                        <a
                          href={child.url}
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

              </li>
            ))}

          </ul>

        </div>
      )}

    </header>
  );
};

export default Header;