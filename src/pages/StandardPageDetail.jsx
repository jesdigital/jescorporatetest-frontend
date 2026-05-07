import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { useParams } from 'react-router-dom';
import { client } from '../client'
import { urlFor } from '../imageBuilder'
import { PortableText } from '@portabletext/react'
import ContactForm from '../components/contact/ContactForm';
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
      <div>
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

        {/* Contact Form */}
        {page.showContactForm && <ContactForm />}

        {/* Footer Top Cards */}
        {page.showFooterTopCards && <Footertopbgcolor />}
        
        {/* Footer Top Map */}
        {page.showFooterTopMap && <Footertopbgmap />}
      </div>

      <Footer />
    </>
  );
}

export default StandardPageDetail