import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { useParams } from 'react-router-dom';
import { client } from '../client'
import { urlFor } from '../imageBuilder'
import { PortableText } from '@portabletext/react'
import ContactForm from '../components/contact/ContactForm';
import FunderDonors from '../components/funders/Funders';
import Howwework from '../components/howwework/Howwework'
import StrategicPlan from '../components/strategicplan/Strategicplan';
import OurTeam from '../components/ourteam/Ourteam';
import OurHistory from '../components/ourhistory/Ourhistory';
import AnnualReports from '../components/annualreports/Annualreports';
import Typesofopportunities from '../components/typesofopportunities/Typesofopportunities';
import Footertopbgcolor from '../components/footertopbgcolor/Footertopbgcolor'
import Footertopbgmap from '../components/footertopbgmap/Footertopbgmap'


const StandardPageDetail = () => {
  const { id } = useParams();
  const [page, setPage] = useState(null); // Rename to 'page' (singular)

  const components = {
    types: {
      image: ({ value }) => (
        <img
          src={urlFor(value).url()}
          alt={value.alt || 'Content image'}
          className="img-fluid my-4"
        />
      ),
    },
  };

  useEffect(() => {
    const query = `*[_type == "standardpage" && slug.current == $id][0]{
      title,
      desc,
      image,
      showContactForm,
      showfunderdonors,
      showhowwework,
      strategicplan,
      ourteam,
      ourhistory,
      annualreports,
      typesofopportunities,
      showFooterTopCards,
      showFooterTopMap
    }`;

    client.fetch(query, { id }).then((data) => {
      setPage(data);
    });
  }, [id]); // ADDED id here

  // Handle loading/empty states
  if (!page) return null;

  // Since 'page' is an object, you don't need .map()
  const bgImage = page.image
    ? urlFor(page.image).width(600).url()
    : "";

  return (
    <>      
      <Header />
      <div className={`standard-page ${id}`}>
        {/* Banner */}
        <section
          className="inner-homepage-banner container-fluid"
          style={{
            background: bgImage
              ? `url(${bgImage}) no-repeat top right`
              : "none",
            minHeight: '450px'
          }}
        >
          {/* Content */}
          <div className="container py-5">
            <div className="col-md-9">
              <h1 className="mb-4">{page.title}</h1>
              <PortableText value={page.desc} components={components} />
            </div>
          </div>
        </section>
        
        {page.showContactForm && <ContactForm />} {/* Contact Form */}
        {page.showfunderdonors && <FunderDonors />} {/* Funder Donors */} 
        {page.showhowwework && <Howwework />} {/* How We Work */} 
        {page.strategicplan && <StrategicPlan />} {/* Strategic plan */} 
        {page.ourteam && <OurTeam />} {/* Our Team */}
        {page.ourhistory && <OurHistory />} {/* Our History */}
        {page.annualreports && <AnnualReports />} {/* Annual Reports */}
        {page.typesofopportunities && <Typesofopportunities />} {/* Types of Opportunities */}
        {page.showFooterTopCards && <Footertopbgcolor />}  {/* Footer Top Cards */}      
        {page.showFooterTopMap && <Footertopbgmap />}  {/* Footer Top Map */}
      </div>

      <Footer />
    </>
  );
}

export default StandardPageDetail