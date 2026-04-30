import React, { useEffect, useState } from "react";
import { client } from "../../client";
import { urlFor } from "../../imageBuilder";
import { PortableText } from "@portabletext/react";
import "./splithero.css";
import { Link } from "react-router-dom";

const SplitHero = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const query = `*[_type == "splithero"] | order(_createdAt asc){
      items[]{
        image{asset->{url}, alt},
        heading,
        slug,
        title,
        description,
        link
      }
    }`;

    client.fetch(query).then((res) => {
      const allItems = res.flatMap(doc => doc.items || []);
      setItems(allItems);
    });
  }, []);

  if (!items.length) return null;

  return (
    <section className="splithero-section container-fluid py-5">

      {items.map((item, index) => (
        <div
          key={index}
          className={`row align-items-center ${
            index !== items.length - 1 ? "mb-5" : ""
          }`}
        >

          {/* LEFT IMAGE */}
          <div className="col-lg-6">
            {item?.image && (
              <img
                src={urlFor(item.image).width(1200).url()}
                alt={item.image?.alt || "image"}
                className="img-fluid w-100"
              />
            )}
          </div>

          {/* RIGHT CONTENT */}
          <div className="right-content col-lg-6 px-4 py-5">

            {item?.heading && (
              <p className="fs-3 mb-3">
                {item.heading}
              </p>
            )}

            {item?.title && (
              <h3 className="fw-bold mb-3">
                {item.title}
              </h3>
            )}

            {item?.description && (
              <div className="mb-4 text-muted">
                <PortableText value={item.description} />
              </div>
            )}

            {/* Button */}
            {item?.slug?.current && (
              <Link to={`/${item.slug.current}`} className="btn btn-warning rounded-pill fw-bold px-4 py-2" rel="noopener noreferrer" >
                Read More
              </Link>
            )}

          </div>

        </div>
      ))}

      <div className="bottom-shadow"></div>
    </section>
  );
};

export default SplitHero;