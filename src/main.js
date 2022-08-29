import Vue from 'vue'
import App from './App.vue'
import 'font-awesome/css/font-awesome.min.css'

import router from '@/router'
import './commom/commom.css'
import {
  Button, Row, Col, Card, Form, FormItem, Input, DatePicker,
  Link, Badge, Divider, Carousel, CarouselItem, Image, Steps,
  Step, Result, Tabs, TabPane, Timeline, TimelineItem, Select,
  Table, TableColumn, Pagination, Checkbox, Tag, Option,
  Dialog, Radio,
  RadioGroup,
  RadioButton,
  Message,
  InputNumber,
} from 'element-ui'




import store from '@/store/index'

Vue.use(Button)
  .use(Row)
  .use(Col)
  .use(Card)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(DatePicker)
  .use(Link)
  .use(Badge)
  .use(Divider)
  .use(Carousel)
  .use(CarouselItem)
  .use(Image)
  .use(Steps)
  .use(Step)
  .use(Result)
  .use(Tabs)
  .use(TabPane)
  .use(Timeline)
  .use(TimelineItem)
  .use(Table)
  .use(TableColumn)
  .use(Pagination)
  .use(Checkbox)
  .use(Tag)
  .use(Select)
  .use(Option)
  .use(Dialog)
  .use(Radio)
  .use(RadioGroup)
  .use(RadioButton)
  .use(InputNumber)

  Vue.prototype.$message = Message;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
