import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { client } from '../client'
import { urlFor } from '../imageBuilder'
import { PortableText } from '@portabletext/react'
import { FaGlobe, FaHandshake, FaClock } from 'react-icons/fa'
import Footertopbgcolor from '../components/footertopbgcolor/Footertopbgcolor'

// GROQ Query
const query = `*[_type == "projects"]{
  items[]{
    title,
    image,
    relatedthemes,
    jessubthemes,
    description1,
    description2,
    countries,
    funder[]{
      name,
      url
    },    
    projectdate,
    showFooterTopCards,
    status
  }
}`

const relatedThemeLabels = {
  dds: 'Develop Digital Solutions',
  ilc: 'Increase Legal Capability',
  sjs: 'Strengthen Justice Systems'
}

const jesSubthemeLabels = {
  tjp: 'Training Justice Professionals',
  bic: 'Build Institutional Capacity',
  ear: 'Evaluation and Research',
  ple: 'Public Legal Education',
  plias: 'Public Legal Information and Services',
  evamp: 'Empowering Vulnerable and Marginalized People',
  wd: 'Website Development',
  pd: 'Platform Development',
  vp: 'Video Production'
}

const ProjectDetail = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    client.fetch(query).then((data) => {   
     

      // store items
      setProjects(data[0]?.items || [])
    })
  }, [])

  const showFooterTopCards = projects.some(
  item => item.showFooterTopCards
)

  return (
    <>
      <Header />
      <div className="project-detail-page">
        <div className="container py-5">

          {/* Static Title */}
          <h1 className="mb-4">JES Projects</h1>

          {projects.map((item, index) => (
            <div key={index} className="mb-5">
              <p>
                {item.relatedthemes
                  ?.map(theme => relatedThemeLabels[theme] || theme)
                  .join(', ')
                }
              </p>
              {/* Title */}
              <h2 className='project-title'>{item.title}</h2>
              <p>
                <strong>JES Subtheme(s):</strong><br />
                {item.jessubthemes
                  ?.map(theme => jesSubthemeLabels[theme] || theme)
                  .join(', ')
                }
              </p>

              {/* Description 1 */}
              <div className="my-3">
                <PortableText value={item.description1} />
              </div>
              <div className="container-fluid border-top border-bottom py-3">
                <div className="container">
                  {/* ✅ Row 1: Country | Funders | Status */}
                  <div className="row mb-4">

                  <div className="col-md-4 d-flex align-items-start gap-3">

                    <FaGlobe size={40} />

                    <p className="mb-0">
                      <strong>Country</strong><br />

                      {item.countries?.map((country, index) => (
                        <React.Fragment key={index}>
                          {country}
                          <br />
                        </React.Fragment>
                      ))}
                    </p>

                  </div>

                    <div className="col-md-4 d-flex align-items-start gap-3 funders">
                      <FaHandshake size={40} />
                      <p>
                        <strong>Funders:</strong><br />
                        {item.funder?.map((f, i) => (
                          <React.Fragment key={i}>
                            <a href={f.url} target="_blank" rel="noreferrer">
                              {f.name}
                            </a>
                            <br />
                          </React.Fragment>
                        ))}
                      </p>
                    </div>

                    <div className="col-md-4 d-flex align-items-start gap-3">
                      <FaClock size={40} />
                      <p><strong>Status</strong><br></br> {item.status}<br></br>{item.projectdate}</p>

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

        </div>         
        </div>
     
  {showFooterTopCards && <Footertopbgcolor />}
      <Footer />
    </>
  )
}

export default ProjectDetail