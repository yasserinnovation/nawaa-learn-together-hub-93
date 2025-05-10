
import Layout from "@/components/layout/Layout";
import CoursesList from "@/components/courses/CoursesList";
import CoursesHero from "@/components/courses/CoursesHero";

const Courses = () => {
  return (
    <Layout>
      <CoursesHero />
      <CoursesList />
    </Layout>
  );
};

export default Courses;
