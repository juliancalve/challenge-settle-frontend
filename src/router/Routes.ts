import Paths from "./Paths"
import Rates from '../container/Rates/Rates';

const Routes = {

    public: [

        {
            path: Paths.rates,
            component: Rates,
            exact: true
        }
    ]
};

export default Routes;
