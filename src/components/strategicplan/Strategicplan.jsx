import React, { useEffect, useState } from "react";
import { client } from "../../client";
import { PortableText } from "@portabletext/react";

const StrategicPlan = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    client
      .fetch(`
        *[_type == "strategicplan"]{
          _id,
          title,
          desc
        }
      `)
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="strategic-plan py-5" style={{
                    backgroundColor: "#F2F2F2",
                }}>
      <div className="container">

        {data.map((item) => (
          <div
            key={item._id}
            className="row gy-4 mb-5 align-items-start"
          >

            {/* LEFT SIDE TITLE */}
            <div className="col-12 col-md-4">
              <h2 className="fw-bold mb-0">
                {item.title}
              </h2>
            </div>

            {/* RIGHT SIDE DESCRIPTION */}
            <div className="col-12 col-md-8">
              <div className="fs-6 lh-lg fw-bold">
                <PortableText value={item.desc} />
              </div>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
};

export default StrategicPlan;