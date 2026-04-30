import React, { useEffect, useState } from 'react';
import { client } from '../../client';
import { urlFor } from '../../imageBuilder';
import { PortableText } from '@portabletext/react';
import './footer.css';

const Footer = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // We fetch the document and ensure we grab the asset references for images
    const query = `*[_type == "footer"][0]{
      footer1{logo, description},
      footer2{title, description, socialLinks[]{platform, url, icon}},
      footer3{links[]{title, url}},
      footer4{links[]{title, url}},
      footerBottom{copyright, links[]{title, url}}
    }`;

    client.fetch(query).then((res) => setData(res));
  }, []);

  if (!data) return null;

  return (
    <footer className="footer">
      <div className="container-fluid custom-px py-5">
        <div className="row">
          {/* LEFT - LOGO + TEXT */}
          <div className="col-md-4 footer-1">
            {data.footer1?.logo && (
              <img
                src={urlFor(data.footer1.logo).width(350).url()}
                alt="footer logo"
                className="mb-3"
              />
            )}
           <PortableText value={data.footer1?.description} />
          </div>

          {/* MIDDLE - SOCIAL */}
          <div className="col-md-4 footer-2 mt-5">
            <h3>{data.footer2?.title}</h3>
            <p className="mt-4 mb-4">{data.footer2?.description}</p>
            <div className="d-flex gap-5 mt-3">
              {data.footer2?.socialLinks?.map((item, i) => (
                <a href={item.url} key={i} target="_blank" rel="noreferrer">
                  {item.icon && (
                    <img
                      src={urlFor(item.icon).width(30).url()}
                      alt={item.platform}
                    />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT - MENUS */}
          <div className="col-md-4 mt-5">
            <div className="row">
              <div className="col-6 footer-3">
                <ul className="list-unstyled">
                  {data.footer3?.links?.map((item, i) => (
                    <li key={i}>
                      <a href={item.url}>{item.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-6 footer-4">
                <ul className="list-unstyled">
                  {data.footer4?.links?.map((item, i) => (
                    <li key={i}>
                      <a href={item.url}>{item.title}</a>
                    </li>
                  ))}
                </ul>                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom d-flex justify-content-between align-items-center custom-px py-4">
        <p className="mb-0">{data.footerBottom?.copyright}</p>
        <div className="d-flex gap-3">
          {data.footerBottom?.links?.map((item, i) => (
            <a href={item.url} key={i}>{item.title}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;