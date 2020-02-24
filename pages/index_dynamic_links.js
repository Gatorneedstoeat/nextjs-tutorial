import Layout from '../components/MyLayout';
import Link from 'next/link';


const PostLink = props => (
  <li>
    <Link href={"/p/[id]"} as={`/p/${props.id}`}>
      <a>{props.name}</a>
    </Link>
  </li>
);
const Blog = () => {
  return (
    <Layout>
      <h1>My Blog</h1>
      <ul>
        <PostLink name="Hello Blog" id="hello-nextjs" />
        <PostLink name="Learn Blog" id="learn-nextjs" />
        <PostLink name="Deploy Blog" id="deploy-nextjs" />
      </ul>
    </Layout>
  );
}

export default Blog; 