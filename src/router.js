import React from 'react'
import * as dvaRouter from 'dva/router'
import { Route, Switch, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from './routes/App'

const { ConnectedRouter } = routerRedux

// import IndexPage from './routes/IndexPage'
// import Users from './routes/Users'

console.log(dvaRouter)
function RouterConfig({ history, app }) {
	
    const MainLayout = dynamic({
        app,
         models: () => [import('./models/users')],
        component: () => import('./routes/MainLayout')
    })
     const IndexPage = dynamic({
        app,
        component: () => import('./routes/IndexPage')
    }) 
    const Home = dynamic({
        app,
        models: () => [import('./models/users')],
        component: () => import('./routes/Home')
    })
    const User = dynamic({
        app,
        models: () => [import('./models/users')],
        component: () => import('./routes/User')
    })
    return (
        <ConnectedRouter history={history}>
        {/*Layout以外是登录、404等其他页面的所有路由*/}
          <Switch>
          <Route path="/" exact component={IndexPage} />
          {/*Layout以内是APP的所有路由*/}
                <App>
                    <Switch>
                    <Route path="/layout" exact component={MainLayout} />
                    <Route path="/home" exact component={Home} />
                    <Route path="/user" exact component={User} />
                    
                    {/* </Route> */}
                    </Switch>
                </App>
          </Switch>
        </ConnectedRouter>
    )
}

export default RouterConfig
