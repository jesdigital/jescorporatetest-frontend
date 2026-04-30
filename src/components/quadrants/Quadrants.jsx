import React, { useEffect, useState } from "react";
import { client } from "../../client";
import { urlFor } from "../../imageBuilder";
import { PortableText } from "@portabletext/react";
import "./quadrants.css";

const Quadrants = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const query = `*[_type == "quadrants"]{
      items[]{
        image{
          asset->{url},
          alt
        },
        description
      }
    }`;

    client.fetch(query).then((res) => {
      // Flatten all items from all documents
      const allItems = res.flatMap(doc => doc.items || []);
      setItems(allItems);
    });
  }, []);

  if (!items.length) return null;

  return (
    <section className="quadrants-section py-5">
      <div className="container">
        <div className="row g-4">

          {items.map((item, index) => (
            <div key={index} className="col-md-4">

              <div className="quadrant-card d-flex align-items-start">

                {/* Icon */}
                <div className="quadrant-icon me-3">
                  <img
                    src={urlFor(item.image).width(200).url()}
                    alt={item.image?.alt || "icon"}
                    className="img-fluid"
                  />
                </div>

                {/* Text */}
                <div className="quadrant-text">
                  <PortableText value={item.description} />
                </div>

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Quadrants;