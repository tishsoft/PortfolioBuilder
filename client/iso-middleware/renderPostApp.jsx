import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import configureStore from '../src/shared/redux/configureStore/postPage';
import HTML from '../src/shared/components/HTML';
import { getRoutes } from '../src/shared/Post/routes';
import App from '../src/shared/Post/App';

export default function renderExploreApp(req, res, next, post) {
  const meta = {
    title: `Post - LooseLeaf`,
    desc: `Post ${post.comments.length} comments, ${post.hearts.length} hearts, ${post.thumbUps.length} thumbUps`,
    url: req.url
  };

  const clientAppPath = '/post.bundle.js';

  const preloadedState = {
    post: { main: post },
    user: {loggedinUser: req.user }
  };

  const store = configureStore(preloadedState);

  const dataToSerialize = preloadedState;

  const branch = matchRoutes(getRoutes(post._id), req.url);
  const promises = branch.map(({ route, match }) => {
    return route.loadData
      ? route.loadData(match)
      : Promise.resolve(null)
  });

  Promise.all(promises).then(data => {
    // data will be an array[] of datas returned by each promises.
  	// console.log(data)
  	const context = data.reduce( (context, data) => {
  		return Object.assign(context, data)
  	}, {})

		const app = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context} >
          <App />
        </StaticRouter>
      </Provider>
		);

    if(context.url) {
			res.writeHead(301, {Location: context.url})
			res.end()
		}
    const html = renderToString(
      <HTML
        meta={meta}
        html={app}
        dataToSerialize={dataToSerialize}
        clientAppPath={clientAppPath}
      />
    );
    return res.send(`<!DOCTYPE html>${html}`);
  }).catch(reason => {
    console.log(reason)
  });

}
