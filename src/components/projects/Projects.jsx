import React, { useEffect, useState } from "react";
import { client } from "../../client";
import { urlFor } from "../../imageBuilder";
import { PortableText } from "@portabletext/react";
import "./project.css";
import { Link } from "react-router-dom";

const Projects = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const query = `*[_type == "projects"] {
      items[featuredOnHome == true]{
        image{asset->{url}, alt},
        title,
        slug,
        shortdesc,
        weight,
        link
      }
    }`;

    client.fetch(query).then((res) => {
      const allItems = res
        .flatMap(doc => doc.items || [])
        .sort((a, b) => (b.weight || 0) - (a.weight || 0))  // ✅ sort by weight desc
        .slice(0, 6);  // ✅ take first 6
      setItems(allItems);
    });
  }, []);

  if (!items.length) return null;

  return (
    <section className="featured-projects container-fluid mt-5 py-5">
      <div className="container">
        <h2 className="project-title text-center mb-5">Featured Projects</h2>
        <div className="row">
          {items.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">

              <div className={`card h-100 border-0 shadow-sm project-card-${index + 1}`}>

                {/* Image */}
                {item?.image && (
                  <img
                    src={urlFor(item.image)
                      .width(300)
                      .height(210)
                      .fit("crop")
                      .url()}
                    alt={item.image?.alt || "project"}
                    className="cards-img"
                  />
                )}

                {/* Card Body */}
                <div className="card-body d-flex flex-column">

                  {/* Title */}
                  {item?.title && (
                    <h5 className="card-title fw-bold">
                      {item.title}
                    </h5>
                  )}

                  {/* Description */}
                  {item?.shortdesc && (
                    <div className="card-text mb-3">
                      {item.shortdesc}
                    </div>
                  )}
    
                  {/* Button */}
                  {item?.slug?.current && (
                    <Link to={`/projects/${item.slug.current}`} className="fw-bold" rel="noopener noreferrer" >
                      Read More
                    </Link>
                  )}

                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;