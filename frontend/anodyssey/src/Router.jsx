import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import BlogList from "./pages/BlogList.jsx";
import Post from "./components/Post.jsx";
import Home from "./pages/Home";
import { useContext } from "react";
import { BlogContext } from "./BlogContext.jsx";

const Router = () => {
  const blogs = useContext(BlogContext);
  const allBlogs = Object.values(blogs).flat();

  const blogRoutes = allBlogs.map((blog) => ({
    path: `/blog/${blog.id}`,
    element: <Post key={blog.id} {...blog} />,
  }));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/inspiring",
          element: <BlogList title={"Inspiring Blogs"} />,
        },
        {
          path: "/tech",
          element: <BlogList title={"Tech Blogs"} />,
        },
        {
          path: "/tutorials",
          element: <BlogList title={"Tutorial Blogs"} />,
        },
        ...blogRoutes,
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
