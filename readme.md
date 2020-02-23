# Zeit Next.js Learning Result

[https://nextjs.org/learn/basics/getting-started](https://nextjs.org/learn/basics/getting-started)

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