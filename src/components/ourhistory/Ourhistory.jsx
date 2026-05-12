import React, { useEffect, useState } from "react";
import { client } from "../../client";
import { urlFor } from "../../imageBuilder";
import { PortableText } from "@portabletext/react";

const OurHistory = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    client
      .fetch(`
        *[_type == "ourhistory"][0]{
          title,
          desc,
          link{
            label,
            url
          },
          image
        }
      `)
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  if (!data) return null;

  return (
    <section className="our-history pb-5">
      <div className="container">
        <div className="row align-items-center gy-4">

          {/* LEFT SIDE CONTENT */}
          <div className="col-12 col-lg-5">

            {/* TITLE */}
            <h2 className="mb-4">
              {data.title}
            </h2>

            {/* DESCRIPTION */}
            <div className="mb-4">
              <PortableText value={data.desc} />
            </div>

            {/* BUTTON */}
            {data.link?.label && data.link?.url && (
              <a
                href={data.link.url}
                className="btn btn-warning px-4 py-2 rounded-5 fw-bold"
              >
                {data.link.label}
              </a>
            )}

          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="col-12 col-lg-7">

            {data.image && (
              <img
                src={urlFor(data.image).url()}
                alt={data.image?.alt || data.title}
                className="img-fluid w-100"
              />
            )}

          </div>

        </div>
      </div>
    </section>
  );
};

export default OurHistory;