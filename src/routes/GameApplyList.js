import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Table, Select, Tag,Pagination,Button,Popconfirm,message,Input} from 'antd';
import *as programHost from '../utils/ajax';
import styles from '../styles/IndexPage.less';
var store = require('store');
@connect(state => ({
  user: state.user,
}))
export default class GameApplyList extends React.Component {
	constructor(props) {
        super(props);
        this.state={
            gameApplyList:[],
            totalPage:0,
            currentPage:1,
            columns:[],
            price:"",
            rate:0.0,
            editingId:"",
            roteType:{key:0,title:'全部'},
        }
    }
    componentWillMount(){
        
        var username=store.get("storeuser");
        if(!username){
            const{dispatch,history}=this.props;
            // dispatch(routerRedux.push({pathname:"/"}));
            history.push({pathname:"/"})
        }
        else {
            const {currentPage}=this.state;
            const content =this;
            const sbdata={where:{}};
                //联网
            fetch(`${programHost.APIhost}/user/anchor/game/list/${currentPage}/10`, {
                method: 'POST',
                dataType: 'json',
                body:JSON.stringify(sbdata),
                mode: 'cors',
                credentials: 'include',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization':programHost.getAuth(`/user/anchor/game/list/${currentPage}/10`),// 获取token
                }),
                }).then((response) => {
                response.json().then((res) => {
                    console.log(res);
                    if(res.statusCode===107){
                        const arr=res.resource;
                        arr.forEach((item,ind)=>{item.key=ind;item.editing=false;});
                        content.setState({totalPage:res.sum,gameApplyList:arr});
                    }
                    },(data) => {
                    console.log(data)
                });
            });
        }
    }
    componentDidMount(){
        const columns=[{
            align:'center',
            title: '用户名',
            dataIndex: 'username',
          },{
            align:'center',
            title: '游戏名称',
            dataIndex: 'title',
            
          },{
            align:'center',
            title: '游戏图标',
            key: 'selectedImg',
            dataIndex: 'tags',
            render: (text,record)=>{return(<img style={{height:50,wiath:50}} src={record.selectedImg} alt=""/>)},
          },{
            align:'center',
            title: '申请时间',
            dataIndex: 'createTime',
            render: (text,record)=>{
                const timeStr = moment(record.createTime).format('YYYY-MM-DD HH:mm:ss');
                return(<span>{timeStr}</span>)
            },
          },{
            align:'center',
            title: '申请游戏段位',
            dataIndex: 'service_gameLevel',
            render: (text,record)=>{return(<span>{record.service_gameLevel?record.service_gameLevel:""}</span>)},
          },{
            align:'center',
            title: '设置游戏等级',
            dataIndex: 'roleType',
            render: (text,record)=>{
                const {Option}=Select;
                let renderElement=null;
                if(this.state.editingId===record._id){
                    renderElement=(<Select labelInValue defaultValue={record.roteTypeList[0]} style={{ width: 120 }} onChange={(value)=>{this.setState({roteType:value})}}>
                    {record.roteTypeList.map((item,index)=>{return (<Option value={item.key}key={index}>{item.title}</Option>)})}
                  </Select>)
                }
                else{
                    renderElement=(<span>{record.roteLabel?record.roteLabel:"未设置"}</span>);
                }
                return renderElement;
            },
          },{
            align:'center',
            title: '开通状态',
            dataIndex: 'gameServiceStatus',
            render: (text,record)=>{return(<span>{record.gameServiceStatus===1?"审核中":record.gameServiceStatus===2?"已开通":"已驳回"}</span>)},
          },
          {
            align:'center',
            title: '游戏价格(单位：元/小时)',
            dataIndex: 'price',
            render: (text,record)=>{
                return this.state.editingId===record._id?(<Input value={this.state.price}onChange={(e)=>{this.setState({price:e.target.value});}} />):(<span>{record.price}</span>)
            },
          },
          {
            align:'center',
            title: '佣金比例',
            dataIndex: 'rate',
            render: (text,record)=>{
                return this.state.editingId===record._id?(<Input value={this.state.rate}onChange={(e)=>{this.setState({rate:e.target.value});}} />):(<span>{record.rate}</span>)
            },
          },
          {
            align:'center',
            title: '操作',
            dataIndex: 'action',
            render: (text,record)=>{
                return this.state.editingId===record._id?(<div><Button size="small" type="primary" onClick={()=>{this.savePriceRate(record);}}>保存</Button><Button  style={{marginLeft:10}} size="small" type="primary" onClick={()=>{ this.setState({editingId:""});}}>取消</Button></div>)
                :(<a onClick={()=>{ this.editPriceRate(record);}}>编辑</a>)
            },
          },
        ];
          this.setState({columns});
    }
    editPriceRate(record){

        this.setState({editingId:record._id,price:record.price,rate:record.rate});
    }
    
    savePriceRate(record){
        const {price,rate,roteType}=this.state;
        if(Number(price)<=0){message.warn("价格必须大于0！！"); return;}
        if(Number(rate)<=0){message.warn("佣金比例必须大于0！！"); return;}
        if(Number(rate)>1){message.warn("佣金比例不能超过1！！"); return;}
        if(roteType.key===0){message.warn("请选择游戏等级！！"); return;}
        console.log(roteType);
        const content = this;
        const sbdata={
            price,
            rate,
            roteType:roteType.key,
            roteLabel:roteType.label,
        };
        console.log(sbdata);
                //联网
            fetch(`${programHost.APIhost}/user/anchor/game/item/${record._id}`, {
                method: 'POST',
                dataType: 'json',
                body:JSON.stringify(sbdata),
                mode: 'cors',
                credentials: 'include',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization':programHost.getAuth(`/user/anchor/game/item/${record._id}`),// 获取token
                }),
                }).then((response) => {
                console.log(response);
                response.json().then((res) => {
                    console.log(res);
                    if(res.statusCode===107){
                        message.success('设置成功！！');
                        content.setState({editingId:""});
                        content.componentWillMount();
                    }else{
                        message.warn(res.message);
                    }
                    },(data) => {
                    console.log(data)
                });
            });
        
    }
    changePage (page){
        console.log(page);
        const {totalPage}=this.state;
        if(page>=totalPage){this.setState({currentPage:totalPage});}
        else{ this.setState({currentPage:page});}
        const content=this;
        const sbdata={where:{}};
                //联网
            fetch(`${programHost.APIhost}/user/anchor/game/list/${page}/10`, {
                method: 'POST',
                dataType: 'json',
                body:JSON.stringify(sbdata),
                mode: 'cors',
                credentials: 'include',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization':programHost.getAuth(`/user/anchor/game/list/${page}/10`),// 获取token
                }),
                }).then((response) => {
                console.log(response);
                response.json().then((res) => {
                    console.log(res);
                    if(res.statusCode===107){
                        const arr=res.resource;
                        arr.forEach((item,ind)=>{item.key=ind;item.editing=false;});
                        content.setState({totalPage:res.sum,gameApplyList:arr});
                    }
                    },(data) => {
                    console.log(data)
                });
            });
      }
    
    render() {
        const {columns,gameApplyList,currentPage,totalPage}=this.state;
        return (
            <div className={styles.normal}>
                <h1 className={styles.title}>主播游戏申请记录</h1>
                <div className={styles.tableDiv}>
                    <Table columns={columns} dataSource={gameApplyList} pagination={false} />
                    <Pagination current={currentPage} onChange={(page)=>{this.changePage(page);}} total={totalPage}/>
                </div>
            </div>
        )
    }
}

