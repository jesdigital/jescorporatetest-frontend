

import Footer from "../components/footer/Footer"
import Header from "../components/header/Header"
import HomepageBanner from "../components/homepageBanner/HomepageBanner"
import Needlegalhelp from "../components/needlegalhelp/Needlegalhelp"
import Projects from "../components/projects/Projects"
import Quadrants from "../components/quadrants/Quadrants"
import SplitHero from "../components/splithero/SplitHero"
import SEO from "../components/SEO" // Import your SEO component

const Home = () => {
    return (
        <div>
            {/* Add SEO component here with page-specific props */}
            <SEO
            title="Home"
            description="Empowering people to access and deliver justice globally."
            canonical="https://jessanity.vercel.app"
            />
            <Header />
            <HomepageBanner />
            <Quadrants />
            <SplitHero />
            <Projects />
            <Needlegalhelp />
            <Footer />
        </div>
    )
}

export default Home
