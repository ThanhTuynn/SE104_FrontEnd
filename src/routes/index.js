import HomePage from '../pages/HomePage/HomePage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import OrderProductPage from '../pages/OrderProductPage/OrderProductPage'
import TopbarComponent from '../components/TopbarComponent/TopbarComponent'

const routes = [
    {
        path:'/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: 'list-order-product',
        page: OrderProductPage,
        isShowHeader: true
    },
    {
        path: 'top-bar',
        page: TopbarComponent,
    },
    {
        path: '*',
        page: NotFoundPage,
    }
]

export default routes;