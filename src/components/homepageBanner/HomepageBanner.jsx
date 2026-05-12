import React, { useEffect, useState } from "react";
import { client } from "../../client";
import { urlFor } from "../../imageBuilder";
import { PortableText } from "@portabletext/react";
import "./homepageBanner.css";

const HomepageBanner = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "homepageBanner"][0]{
        text,
        desc,
        link,
        image{asset->{url}, alt}
      }`)
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return null;

  const bgImage = data?.image
    ? urlFor(data.image).width(1000).url()
    : "";

  return (
    <section
      className="homepage-banner container-fluid bg-light"
      style={{
        background: bgImage
          ? `url(${bgImage}) no-repeat top right / auto`
          : "none",
      }}
    >
      <div className="container">
        <div className="row align-items-center">

          <div className="col-lg-6 col-md-8">

            <div className="mb-3 announcement">
              <PortableText value={data.text} />
            </div>

            <div className="mb-4 homepage-desc">
              <PortableText value={data.desc} />
            </div>

            {data?.link?.url && (
              <a
                href={data.link.url}
                className="btn btn-warning px-4 py-2 rounded-5 fw-bold"
                target="_self"
                rel="noopener noreferrer"
              >
                {data.link.label || "Read More"}
              </a>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};

export default HomepageBanner;