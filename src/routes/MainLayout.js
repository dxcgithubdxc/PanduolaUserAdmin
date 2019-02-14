import React, { Component } from 'react'
import { Layout, Menu, Icon ,Badge, Popover , Modal, Button } from 'antd'
import { Link, routerRedux } from 'dva/router';
import styles from '../styles/MainLayout.css';
import avater from '../assets/images/b1.jpg';
import eshop from '../assets/images/eshop.png';

var store = require('store');
export default class MainLayout extends Component {
  constructor(props) {
  super(props);
  this. state = {
  collapsed: false,
  defaultSelectedKeys:"",
  avater:avater,
  news:2,
  Modalvisible: false 
  };
  }
  UNSAFE_componentWillMount(){

  console.log(this.props);
  var pathname=this.props.location.pathname;
  this.setState({defaultSelectedKeys:pathname.substring(1)})
  
  }
  componentDidMount(){}
    toggle(){
    this.setState({ collapsed: !this.state.collapsed});
   }
    menuClick(){
    
    }
    showModal = () => {
    this.setState({ Modalvisible: true,});
  }
   
  Sure (){
    this.setState({ Modalvisible: false,});
    window.location.href=window.location.origin;
    this.removeUsername();
  }
  Cancel (){
    this.setState({
      Modalvisible: false,
    });
  }
    
    removeUsername(){
    	var username=store.get("username");
    	if(username){store.remove("username");}
    }
    render() {
        const { children, location } = this.props;
        const { Header, Sider, Content } = Layout;
        const SubMenu = Menu.SubMenu;  
        const MenuItemGroup=Menu.MenuItemGroup;
        return ( <div className={styles.normal}>
        	<style>{`
        	 .trigger {color:white;font-size: 30px;line-height: 64px;cursor: pointer; transition: color .3s; position:absolute;}
           .trigger:hover {}
           .logo { height:64px; background:url(${eshop});background-size:100% 100%;}
           .logo_coll{height:64px;background:url(${eshop});background-size:100% 100%;}
           .layoutHeader{	background:#1890ff;	padding:0 20px; box-shadow: 0 1px 10px rgba(0,0,0,.2);}
           .vertical{border:none}
           .avater{width:50px;height:50px;border-radius:50%}
           .news{color:red}
           .ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left { border-right: 0px solid #e8e8e8; }
           .slider{background:white;border-right:0px solid #ccc}
        		`}</style>
             <Layout>
           <Sider
           className="slider"
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          >
          <div className={this.state.collapsed?"logo_coll":"logo"}></div>
          <Menu theme="light" mode="inline" defaultSelectedKeys={[this.state.defaultSelectedKeys]} onClick={this.menuClick.bind(this)}>
              <Menu.Item key="home"><Link to="/home"><Icon type="home" /><span>审核游戏</span></Link></Menu.Item>
              <Menu.Item key="user"><Link to="/user"><Icon type="snippets" /><span>用户记录</span></Link></Menu.Item>
              <Menu.Item key="gameapplylist"> <Link to="/gameapplylist"><Icon type="snippets" /><span>游戏申请记录</span></Link></Menu.Item>
              <Menu.Item key="bussnisslist"> <Link to="/bussnisslist"><Icon type="snippets" /><span>主播交易记录</span></Link></Menu.Item>
              <Menu.Item key="setgifts"> <Link to="/setgifts"><Icon type="snippets" /><span>礼物设置</span></Link></Menu.Item>
              <Menu.Item key="mclunbo"> <Link to="/mclunbo"><Icon type="snippets" /><span>主播轮播图</span></Link></Menu.Item>
              
          </Menu>
        </Sider>
        <Layout>
         <Header className="layoutHeader"    >
         <Icon
         className="trigger"
         type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
         onClick={this.toggle.bind(this)}
         />
         <Menu mode="horizontal"
	        style={{ lineHeight: '63px', float: 'right',background:"#1890ff",color:"white" }}
	        onClick={this.menuClick.bind(this)}>
          <Menu.Item key="setting:0"> <Badge count={25} overflowCount={10} style={{marginLeft: 10}}>
          <Icon type="notification" style={{color:"white"}} />
          </Badge></Menu.Item>
          <SubMenu title={<img className="avater" src ={this.state.avater}/>} key="12313" >
          <Menu.Item disabled key="setting:1">你好-管理员1</Menu.Item>
          <Menu.Item key="/" onClick={this.showModal.bind(this)}> <Icon type="logout" /><span>退出登录</span></Menu.Item>
        
        </SubMenu>
         </Menu>
         
        </Header>
       <div className={styles.content}>
       
        <div className={styles.main}>
        {children}
        </div>
        </div>
                
                
         <Modal
          title={<span style={{color:"orange"}}>退出登录</span>}
           style={{ top: 20 }}
          visible={this.state.Modalvisible}
          onOk={this.Sure.bind(this)}
          onCancel={this.Cancel.bind(this)}
           okText="确认"
          cancelText="取消"
        >
          <p>确定要退出登录吗??</p>
          
        </Modal>    
             
                
                
          </Layout>     
          </Layout>
            </div>)
    }
}


