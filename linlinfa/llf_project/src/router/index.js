import Vue from 'vue'
import Router from 'vue-router'
import Enter from '@/components/enter/Index'
import Store from '@/components/enter/Store'
import ChooseCity from '@/components/enter/ChooseCity'
import ChooseLocation from '@/components/enter/Chooselocation'
import Ident from '@/components/enter/Identification'
import Classify from '@/components/enter/Classify'
import CheckS from '@/components/enter/CheckStatusSuccess'
import CheckF from '@/components/enter/CheckStatusFailed'
import Application from '@/components/enter/Application'
import PaymentWaiting from '@/components/enter/PaymentStatusWaiting'
import PaymentStatusFailed from '@/components/enter/PaymentStatusFailed'
import Map from '@/components/enter/map'
import EnterSuccess from '@/components/enter/EnterSuccess'
import ManageData from '@/components/ManageData'
import Test from '@/components/enter/test'


Vue.use(Router)

export default new Router({
  routes: [
		{
			name: 'enter',
		  path: '/',
		  component: Enter
		},
    {
    	name: 'test',
      path: '/test',
      component: Test
      // beforeEnter:(to,from,next)=>{
      //   // next();
      //   // location.reload(true);
      // }
    },
		{
			name: 'enter',
		  path: '/:member_id',
		  component: Enter
		},
		{
		  path: '/enter/:member_id',
		  name: 'enter',
		  component: Enter
		},
		{
		  path: '/store/:member_id',
		  name: 'store',
		  component: Store
		},
		{
		  path: '/choosecity/:member_id',
		  name: 'choosecity',
		  component: ChooseCity,
		},
		{
		  path: '/chooselo/:member_id',
		  name: 'chooselo',
		  component: ChooseLocation,
		},
		{
		  path: '/ident/:member_id',
		  name: 'ident',
		  component: Ident,
			meta:{
				keepAlive:true
			}
		},
		{
		  path: '/classify/:member_id',
		  name: 'classify',
		  component: Classify,
		},
		{
		  path: '/checks/:member_id',
		  name: 'checkstate',
		  component: CheckS,
		},
		{
		  path: '/checkf/:member_id',
		  name: 'checkStateFailed',
		  component: CheckF,
		},
		{
		  path: '/application/:member_id',
		  name: 'application',
		  component: Application,
		},
		{
		  path: '/pwait/:member_id',
		  name: 'pwait',
		  component: PaymentWaiting,
		},
		{
		  path: '/pfailed/:member_id',
		  name: 'pfailed',
		  component: PaymentStatusFailed,
		},
		{
		  path: '/enters/:member_id',
		  name: 'enters',
		  component: EnterSuccess,
		},
		{
		  path: '/manage/:member_id',
		  name: 'manageData',
		  component: ManageData,
		},
  ]
})