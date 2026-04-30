import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { client } from '../client'
import { urlFor } from '../imageBuilder'
import { PortableText } from '@portabletext/react'

// GROQ Query
const query = `*[_type == "projects"]{
  items[]{
    title,
    image,
    description1,
    description2,
    countries,
    funder[]{
      name,
      url
    },
    projectdate,
    status
  }
}`

const ProjectDetail = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    client.fetch(query).then((data) => {
      setProjects(data[0]?.items || [])
    })
  }, [])

  return (
    <>
      <Header />
      <div className="project-detail-page">
        <div className="container py-5">

          {/* Static Title */}
          <h1 className="mb-4">JES Projects</h1>

          {projects.map((item, index) => (
            <div key={index} className="mb-5">

              {/* Title */}
              <h2>{item.title}</h2>

              {/* Description 1 */}
              <div className="my-3">
                <PortableText value={item.description1} />
              </div>
              <div className="container-fluid">
                <div className="container">
                  {/* ✅ Row 1: Country | Funders | Status */}
                  <div className="row mb-4">

                    <div className="col-md-4">
                      <p><strong>Country:</strong> {item.countries?.join(', ')}</p>
                    </div>

                    <div className="col-md-4">
                      <p><strong>Funders:</strong></p>
                      {item.funder?.map((f, i) => (
                        <p key={i}>
                          <a href={f.url} target="_blank" rel="noreferrer">
                            {f.name}
                          </a>
                        </p>
                      ))}
                    </div>

                    <div className="col-md-4">
                      <p><strong>Status:</strong> {item.status},{item.projectdate}</p>

                    </div></div></div>

              </div>

              {/* ✅ Row 2: Description2 | Image */}
              <div className="row align-items-center">

                <div className="col-md-6">
                  <PortableText value={item.description2} />
                </div>

                <div className="col-md-6">
                  {item.image && (
                    <img
                      src={urlFor(item.image).width(800).url()}
                      alt={item.image?.alt || item.title}
                      className="img-fluid"
                    />
                  )}
                </div>

              </div>

            </div>
          ))}

        </div> </div>

      <Footer />
    </>
  )
}

export default ProjectDetail