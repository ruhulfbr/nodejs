
const authRouter = require('./authRoute')
const dashboardRoute = require('./dashboardRoute')

const routes = [
    {
        path: '/auth',
        handler: authRouter
    },
    {
        path: '/dashboard',
        handler: dashboardRoute
    },
    {
        path: '/',
        handler: (req, res)=>{
            res.render('pages/index', {
                title: 'Home'
            });
        }
    }
];


module.exports = app =>{
    routes.forEach(route =>{
        if( route.path === '/' ){
            app.get(route.path, route.handler)
        }
        else{
            app.use(route.path, route.handler)
        }
    })

    //Handle 404 poage
    app.use((req, res, next)=>{
        let error = new Error('404 page not found');
        error.status = 404

        next(error)
    })

    app.use((error, req, res, next)=>{
        if(error.status == 404){
            return res.render('pages/error/404', {
                title: '404'
            });
        }

        console.log('error.message', error.message);

        return res.render('pages/error/500', {
            title: 'Internal Server Error'
        });
    })
}