import React, { useEffect, useState } from "react";
import { client } from "../../client";
import { urlFor } from "../../imageBuilder";
import { PortableText } from "@portabletext/react";

const TypesOfOpportunities = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    client
      .fetch(`
        *[_type == "typesofopportunities"][0]{
          title,
          opportunities | order(weight asc)[]{            
            desc,
            icon{
              asset->{
                url
              },
              alt
            }
          }
        }
      `)
      .then((res) => setData(res))
      .catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <section className="py-5 types-of-opportunities">
      <div className="container">

        <div className="row g-5">

          {/* Left Side Title */}
          <div className="col-lg-4">
            <h2>
              {data.title}
            </h2>
          </div>

          {/* Right Side Content */}
          <div className="col-lg-8">

            {data?.opportunities?.map((item, index) => (
              <div
                className="d-flex flex-column flex-md-row align-items-start mb-5"
                key={index}
              >

                {/* Icon */}
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-md-4 mb-3 mb-md-0"
                  
                >
                  <img
                    src={urlFor(item.icon).url()}
                    alt={item.icon?.alt || item.heading}
                    className="img-fluid"
                  />
                </div>

                {/* Content */}
                <div>               

                  <div className="types-of-opportunities__content">
                    <PortableText value={item.desc} />
                  </div>
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default TypesOfOpportunities;