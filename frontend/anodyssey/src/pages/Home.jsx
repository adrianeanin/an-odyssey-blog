import BlogListSummary from "../components/BlogListSummary";
import { BlogContext } from "../BlogContext";
import { useContext } from "react";

const Home = () => {
  const { inspiring, tech, tutorials } = useContext(BlogContext);

  return (
    <>
      <h1>Minimal Blog Template</h1>
      <p>Some cool subtitle</p>

      <BlogListSummary
        title="Inspiring"
        items={inspiring}
        categoryPath="inspiring"
      />
      <BlogListSummary title="Tech" items={tech} categoryPath="tech" />
      <BlogListSummary
        title="Tutorials"
        items={tutorials}
        categoryPath="tutorials"
      />
    </>
  );
};

export default Home;
