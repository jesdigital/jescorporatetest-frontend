import React, { useEffect, useState } from "react";
import { client } from "../../client";
import { PortableText } from "@portabletext/react";
import "./footertopbgcolor.css";

const FooterTopBgColor = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const query = `*[_type == "footertopbgcolor"] | order(weight asc){
      items[]{
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
    <section className="footertopbgcolor py-5">
      <div className="container">
        <div className="row g-4">

          {items.map((item, index) => (
            <div key={index} className="col-md-4 d-flex">

              <div className="bgcolor-card d-flex align-items-start bg-white p-4 h-100 w-100">

                {/* Text */}
                <div className="bgcolor-text">
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

export default FooterTopBgColor