import Dashboard  from "../../../components/Dashboard";
import History  from "../../History";
import TransferMoney  from "../../TransferMoney";

const routes = [

  { path: '/history', exact:true, name: 'History', component: History },
  { path: '/transfer/money', exact:true, name: 'TransferMoney', component: TransferMoney },
  { path: '/dashboard',  name: 'Dashboard', component: Dashboard }
 
];

export default routes;
