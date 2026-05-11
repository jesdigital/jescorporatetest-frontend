import React, { useEffect, useState } from "react";
import { client } from "../../client";
import { urlFor } from "../../imageBuilder";

const query = `*[_type == "funderdonors"]{
  title,
  images[]{
    asset,
    alt
  }
}`

const FunderDonors = () => {
  const [funders, setFunders] = useState([])
  useEffect(() => {
    client.fetch(query).then((data) => {
      setFunders(data)
    })
  }, [])

  return (
<div className="container py-5">
    <h1 className="text-center mb-5 fw-bold">{funders[0]?.title}</h1>

  <div className="row justify-content-center align-items-center">
    {funders.map((item, index) => (
      item.images?.map((img, imgIndex) => (
        <div
          key={`${index}-${imgIndex}`}
          className="col-lg-3 col-md-4 col-sm-6 col-6 p-4 text-center"
        >
          <img
            src={urlFor(img).width(300).url()}
            alt={img.alt || item.title}
            className="img-fluid funder-logo"
          />
        </div>
      ))
    ))}
  </div>
</div>
  )
}

export default FunderDonors