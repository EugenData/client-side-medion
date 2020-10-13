import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { RootStoreContext } from '../stores/rootStore';

interface IProps extends RouteProps{
 component: React.ComponentType<RouteComponentProps<any>>
}

const PrivateRoot:React.FC<IProps> = ({component:Component, ...rest}) => {
    const rootStore = useContext(RootStoreContext);
    const {isLoggedIn} = rootStore.userStore;
    return (
        <Route
        {...rest}
        render={(props)=>isLoggedIn?<Component {...props} /> : <Redirect to={"/"}/>}
        />
    )
}
export default observer(PrivateRoot);