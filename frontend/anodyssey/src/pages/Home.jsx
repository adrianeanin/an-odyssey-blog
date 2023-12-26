import BlogListSummary from "../components/BlogListSummary";
import { BlogContext } from "../context/BlogContext";
import { useContext } from "react";

const Home = () => {
  const { inspiring, tech, tutorials } = useContext(BlogContext);

  console.log("Home inspiring", inspiring);

  return (
    <>
      <article className="hero | wrapper">
        <p>👋 Hello World, Welcome to</p>
        <div className="hero-intro-wrapper">
          <h1>Anodyssey</h1>
          <div className="hero-intro-logo">🚀</div>
        </div>
        <p>A not so developer blog, hope you love the journey.</p>
      </article>

      <section className="summary">
        <div className="wrapper">
          <section className="summary-list | spacer">
            <article className="summary">
              <BlogListSummary
                title="Inspiring"
                items={inspiring}
                categoryPath="inspiring"
              />
            </article>

            <article className="summary">
              <BlogListSummary title="Tech" items={tech} categoryPath="tech" />
            </article>

            <article className="summary">
              <BlogListSummary
                title="Tutorials"
                items={tutorials}
                categoryPath="tutorials"
              />
            </article>
          </section>
        </div>
      </section>
    </>
  );
};

export default Home;
