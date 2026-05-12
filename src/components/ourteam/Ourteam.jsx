import React, { useEffect, useState } from "react";
import { client } from "../../client";
import { urlFor } from "../../imageBuilder";
import { PortableText } from "@portabletext/react";

const OurTeam = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    client
      .fetch(`
        *[_type == "ourteam"][0]{
          title,
          desc,
          teamMembers[]{
            image,
            memberDesc
          }
        }
      `)
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  if (!data) return null;

  return (
    <section className="our-team py-5">
      <div className="container">

        {/* SECTION TITLE */}
        <h3 className="mb-4">          
            {data.title}          
        </h3>

        {/* SECTION DESCRIPTION */}
        <div className="row justify-content-center mb-5">
          <div className="ourteam-desc">
            <PortableText value={data.desc} />
          </div>
        </div>

        {/* TEAM MEMBER CARDS */}
        <div className="row g-4">

          {data.teamMembers?.map((member, index) => (
            <div
              className="col-12 col-sm-6 col-lg-6 out-team"
              key={index}
            >
              <div className="card h-100 border-0 shadow-sm">

                {/* IMAGE */}
                {member.image && (
                  <img
                    src={urlFor(member.image).url()}
                    alt={member.image?.alt || "Team Member"}
                    className="card-img-top img-fluid"
                    style={{
                      height: "255px",
                      objectFit: "cover",
                    }}
                  />
                )}

                {/* CARD BODY */}
                <div className="card-body text-white p-4" style={{ backgroundColor: "#6CA93D" }}>

                  <div className="card-text">
                    <PortableText value={member.memberDesc} />
                  </div>

                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default OurTeam;