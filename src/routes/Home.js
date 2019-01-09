import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from '../styles/IndexPage.less';
var store = require('store');
@connect(state => ({
  user: state.user,
}))
export default class Home extends React.Component {
	constructor(props) {
        super(props);
        this.state={
            a:1,
        }
    }
    componentWillMount(){
        console.log(this.props);
        var username=store.get("username");
        if(!username){
            const{dispatch,history}=this.props;
            // dispatch(routerRedux.push({pathname:"/"}));
            history.push({pathname:"/"})
        }
    }
    componentDidMount(){}
    render() {
        return (
            <div className={styles.normal}>
                <h1 className={styles.title}>你好,我叫首页</h1>
               
            </div>
        )
    }
}

