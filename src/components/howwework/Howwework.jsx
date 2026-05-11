import React, { useEffect, useState } from "react";
import { client } from "../../client";
import { urlFor } from "../../imageBuilder";

const query = `*[_type == "howwework"]  | order(weight asc){
  title,
  description,
  icon{
    asset,
    alt
  }
}`

const HowWeWork = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    client.fetch(query).then((res) => {
      setData(res)
    })
  }, [])

  return (

    <div className="how-we-work-section py-5">
      <div className="container">
        <div className="row">
          {data.map((item, index) => (
            <div
              key={index}
              className="col-lg-4 col-md-6 mb-4"
            >
              <div className="d-flex align-items-start gap-4">
                {/* Icon */}
                <div className="how-work-icon">
                  <img
                    src={urlFor(item.icon).width(100).url()}
                    alt={item.icon?.alt || item.title}
                    className="img-fluid"
                  />

                </div>

                {/* Content */}
                <div className="how-work-content">
                  <h3 className="fw-bold">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default HowWeWork