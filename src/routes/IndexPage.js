import React from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router';
import { Form, Icon, Input, Button,message, Checkbox } from 'antd';
import styles from '../styles/IndexPage.less';
import *as programHost from '../utils/ajax';
var store = require('store');
@createForm()
@connect(state => ({
  user: state.user,
}))
export default class Login extends React.Component {
	constructor(props) {
  super(props);
  this.state={
  a:1,
  validateStatus1:"",
  help1:"",
   validateStatus2:"",
  help2:"",
  username:"",
  password:"",
  }
           
 }
	componentWillMount(){
  console.log(this.props);
  var username=store.get("storeuser");
  if(username){store.remove("storeuser");}
  }
  componentDidMount(){}
  inputUser(e){
   this.setState({validateStatus1:"",help1:""});
  	this.setState({username:e.target.value})
  }
  inputPass(e){
   this.setState({validateStatus2:"",help2:""});
  	this.setState({password:e.target.value})
  }
	Login(){
    const{username,password}=this.state;
		if(this.state.username==""){
			this.setState({validateStatus1:"error",help1:"*请输入您的用户名"});
			return;
		}
		if(this.state.password==""){
			this.setState({validateStatus2:"error",help2:"*请输入您的密码"});
			return;
		}
		let sbdata={loginName:this.state.username,loginPassword:this.state.password}
		//请求登录接口
    const content =this;
    const{dispatch,history}=content.props;
					    const path={
					    pathname: '/home',
					    q:1,
					    w:2,
					     arr:content.state.arr,
					    }
					//  dispatch(routerRedux.push(path));
              history.push(path);
              store.set("storeuser",{username:username,password:programHost.cryptoPassword(password)});// 本地存username和加密后的password
	}
    render() {
    	const FormItem = Form.Item;
    	 const { getFieldDecorator } = this.props.form;
        return ( <div >
         <style>{`
      	.formDiv{width:300px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);}
           .login-form {max-width: 300px;}
           .login-form-forgot {float: right;}
           .login-form-button { width: 100%;}
           .has-error .ant-form-explain, .has-error .ant-form-split{padding-top:5px;font-size:12px}
         `}</style>
       <div className="formDiv">
           
       <Form  className="login-form">
       <FormItem> <h3 style={{textAlign:"center"}}>点点约玩后台管理系统</h3></FormItem>
        <FormItem
        validateStatus={this.state.validateStatus1}
        help={this.state.help1}
        >
        <Input
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="userName"
        value={this.state.username}
        onChange={this.inputUser.bind(this)}
         />
        </FormItem>
        <FormItem
        validateStatus={this.state.validateStatus2}
        help={this.state.help2}
        >
            <Input prefix={<Icon type="lock"
              style={{ color: 'rgba(0,0,0,.25)' }} />}
              value={this.state.password}
              onChange={this.inputPass.bind(this)}
              type="password" placeholder="Password"
            />
        </FormItem>
        <FormItem>
         
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.Login.bind(this)}>登 录</Button>
         
        </FormItem>
      </Form>
                   </div>
                 
            </div>
        )
    }
}


