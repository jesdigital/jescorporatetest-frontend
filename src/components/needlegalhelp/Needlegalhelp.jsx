import React, { useEffect, useState } from 'react';
import { client } from '../../client';
import { urlFor } from '../../imageBuilder';
import { PortableText } from '@portabletext/react';
import './needlegalhelp.css';

const Needlegalhelp = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const query = `*[_type == "needlegalhelp"][0]{
      img,
      heading,
      title,
      description,
      link{
        label,
        url
      }
    }`;

    client.fetch(query).then((res) => {
      setData(res);
    });
  }, []);

  if (!data) return null;

  return (
    <section className="need-legal-help py-5">
      <div className="container">
        <h2 className="nlh-title text-center mb-5">Need Legal Help?</h2>
        <div className="row align-items-center bg-light">

          {/* LEFT IMAGE */}
          <div className="col-lg-6 mb-4 mb-lg-0 g-0 nlh text-center">
            {data.img && (
              <img
                src={urlFor(data.img).width(585).url()}                
                alt={data.img?.alt || "Legal Help"}
                className="img-fluid"
              />
            )}
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-6 p-5">

            {/* Small Heading */}
            {data.heading && (
              <p className="small-heading text-uppercase mb-2">
                {data.heading}
              </p>
            )}

            {/* Title */}
            {data.title && (
              <h3 className="main-title mb-3">
                {data.title}
              </h3>
            )}

            {/* Description (Portable Text) */}
            {data.description && (
              <div className="description mb-4">
                <PortableText value={data.description} />
              </div>
            )}

            {/* Button */}
            {data.link?.url && (
              <a
                href={data.link.url}
                className="btn btn-warning rounded-pill fw-bold px-4 py-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.link.label || 'Visit Website'}
              </a>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

export default Needlegalhelp;