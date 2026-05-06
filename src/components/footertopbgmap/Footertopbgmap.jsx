import React, { useEffect, useState } from "react";
import { client } from "../../client";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../../imageBuilder";
import "./footertopbgmap.css";

const FooterTopBgMap = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "footertopmap"][0]`)
      .then((res) => setData(res?.footertopmap))
      .catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <div className="footertopbgmap">
      <div className="container connect-with-us">
        <div className="bg-light text-center p-4 p-md-5">
          
          {/* Title */}
          <h2 className="fw-bold mb-3">{data.title}</h2>

          {/* Description */}
          <div className="bg-light text-center p-4 p-md-5 fw-semibold">
            <PortableText value={data.description} />
          </div>

          {/* Social Icons */}
          <div className="d-flex justify-content-center flex-wrap gap-3">
            {data.socialLinks?.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#6BA539", // green color like your UI
                }}
              >
                {item.icon && (
                  <img
                    src={urlFor(item.icon).url()}
                    alt={item.platform}
                    style={{ width: "24px", height: "24px", filter: "brightness(0) invert(1)", }}
                  />
                )}
              </a>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default FooterTopBgMap;