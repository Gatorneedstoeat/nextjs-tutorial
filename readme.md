# Zeit Next.js Learning Result

[https://nextjs.org/learn/basics/getting-started](https://nextjs.org/learn/basics/getting-started)
### Linking Pages
```javascript
import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
  </div>
);

export default Header;
```

### useRouter
* We import and use the useRouter function from next/router which will return the Next.js router object.
* In this case, we are using the router's query object, which has the query string params.
* Therefore, we get the title with router.query.title.
```URL
http://localhost:3000/post?title=Deploy%20apps%20with%20Zeit
```
```javascript
import { useRouter } from 'next/router';
const router = useRouter();
<h1>{router.query.title}</h1> // Deploy apps with Zeit
```

### Dynamic Routing 
The `[id]` handles all routes that come after `/p/`. <br><br>
When creating the dynamic route we added `id `between the brackets `([])`. This is the name of the query param received by the page, so for `/p/hello-nextjs` the `query` object will have `{ id: 'hello-nextjs'}`, and we can access it with useRouter().
```javascript
const PostLink = props => (
  <li>
    <Link href="/p/[id]" as={`/p/${props.id}`}>
      <a>{props.id}</a>
    </Link>
  </li>
);
```
In the `<Link>` element, the `href` prop is now the path of the page in the `pages` folder and `as` is the URL to show in URL bar of the browser.

### Fetching Data for Pages
First of all we need to install isomorphic-unfetch. That's the library we are going to use to fetch data. It's a simple implementation of the browser fetch API, but works both in client and server environments.
```javascript
npm install --save isomorphic-unfetch
```

### Context Object
```javascript
Post.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`Fetched show: ${show.name}`);

  return { show };
};
```
The first argument of the function is the **context** object. It has a `query` object that we can use to fetch information.

In our example, we picked the show ID from `query` and used it to fetch the show data from the TVMaze API.

Using the destructuring assignment of `{ id }` we get the id query `?id=757`

#### The above snippet returns the intial prop of `show` to the following function:
```javascript
const Post = props => {
    return (
        <Layout>
            <h1>{props.show.name}</h1>
            <p>{props.show.summary.replace(/<[/]?[pb]>/g, '')}</p>
            {props.show.image ? <img src={props.show.image.medium} /> : null}
        </Layout>
    );
}
```

### Stying Components
Adding a style jsx element to a component will allow you to style that component. Next.js comes preloaded with a CSS in JS framework called styled-jsx, specifically designed to make your life easier. It allows you to write familiar CSS rules for your components; rules will have no impact on anything other than the components (not even child components). **That means, your CSS rules are scoped.**
```javascript
<style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
```
Consequently, there are a bunch of practical issues to consider with traditional CSS-file-based styling (especially with SSR), so we suggest avoiding this method when styling for Next.js.

#### Global Styles
```javascript
 <style jsx global>{`
        .markdown {
          font-family: 'Arial';
        }

        .markdown a {
          text-decoration: none;
          color: blue;
        }

        .markdown a:hover {
          opacity: 0.6;
        }

        .markdown h3 {
          margin: 0;
          padding: 0;
          text-transform: uppercase;
        }
      `}</style>
```