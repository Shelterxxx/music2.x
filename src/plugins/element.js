import Vue from 'vue'
import{button,container,header,Aside,Main,Footer,Row,Col,Input,Dialog,Form,FormItem,Menu,MenuItem,
    Carousel,CarouselItem,tag,Slider,Link,tabs,TabPane,Table,TableColumn,Popover,drawer,Loading,Pagination,InfiniteScroll,Progress,MenuItemGroup,Submenu,Message,MessageBox,Upload,Badge,Backtop} from 'element-ui'
Vue.use(button)
Vue.use(container)
Vue.use(header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(tag)
Vue.use(Slider)
Vue.use(Link)
Vue.use(tabs)
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Popover)
Vue.use(drawer)
Vue.use(Loading)
Vue.use(Pagination)
Vue.use(InfiniteScroll)
Vue.use(Progress)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Upload)
Vue.use(Badge)
Vue.use(Backtop)
Vue.prototype.$confirm=MessageBox.confirm

Vue.prototype.$message=Message