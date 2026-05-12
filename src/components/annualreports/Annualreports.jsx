import React, { useEffect, useState } from "react";
import { client } from "../../client";
import { PortableText } from "@portabletext/react";

const AnnualReports = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    client
      .fetch(`
        *[_type == "annualreports"][0]{
          heading,
          desc,
          reports | order(weight asc)[]{
            title,
            btnText,
            pdfFile{
              asset->{
                url
              }
            }
          }
        }
      `)
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  if (!data) return null;

  return (
    <section
      className="w-100 py-5"
      style={{
        backgroundColor: "#F2F2F2",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "1170px",
        }}
      >
        <div className="row gy-5 align-items-start">

          {/* LEFT CONTENT */}
          <div className="col-12 col-lg-5">

            {/* HEADING */}
            <h2>
              {data.heading}
            </h2>

            {/* DESCRIPTION */}
            
              <PortableText value={data.desc} />
            

          </div>

          {/* RIGHT REPORTS */}
          <div className="col-12 col-lg-7">

            {data.reports?.map((report, index) => (
              <div
                key={index}
                className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 py-4"
                style={{
                  borderBottom: "1px solid #ffffff",
                }}
              >

                {/* REPORT TITLE */}
                <h3 className="fw-bold mb-0">
                  {report.title}
                </h3>

                {/* DOWNLOAD BUTTON */}
                {report.pdfFile?.asset?.url && (
                  <a
                    href={report.pdfFile.asset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="btn btn-warning rounded-pill px-4 py-2 fw-bold"
                  >
                    {report.btnText || "Download"}
                  </a>
                )}

              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
};

export default AnnualReports;