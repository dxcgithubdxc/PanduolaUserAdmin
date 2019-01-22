import React from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { Form, Icon, Input, Button,message, Checkbox,Row,Col,InputNumber,Select,Table,Pagination } from 'antd';
import styles from '../styles/IndexPage.less';
import *as programHost from '../utils/ajax';
var store = require('store');
@createForm()
@connect(state => ({
  user: state.user,
}))

export default class SetGifts extends React.Component {
	constructor(props) {
  super(props);
  this.state={
  a:1,
  giftImg:'http://img3.tuwandata.com/uploads/play/1142101545745926.png',
  giftMeili:1,
  giftName:'',
  giftPrice:1,
  giftRemark:'',
  giftNumber:0,
  giftTypeArr:[
      {id:1,label:'普通礼物'},
      {id:2,label:'冠名礼物'},
      {id:3,label:'活动礼物'},
  ],
  giftType:{id:1,label:'普通礼物'},
  giftList:[],
  colums:[],
  currentPage:1,
   totalPage:0,
   editing:false,
  }
      
 }
	componentWillMount(){
        const {currentPage}=this.state;
        const content =this;
        const sbdata={where:{}};
            //联网
        fetch(`${programHost.APIhost}/admin/get/gift/list/${currentPage}/10`, {
            method: 'POST',
            dataType: 'json',
            body:JSON.stringify(sbdata),
            mode: 'cors',
            credentials: 'include',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization':programHost.getAuth(`/admin/get/gift/list/${currentPage}/10`),// 获取token
            }),
            }).then((response) => {
            console.log(response);
            response.json().then((res) => {
                console.log(res);
                if(res.statusCode===107){
                    const arr=res.resource;
                    arr.forEach((item,ind)=>{item.key=ind;});
                    content.setState({totalPage:res.sum,giftList:arr});
                }
                },(data) => {
                console.log(data)
            });
        });
  }
  componentDidMount(){
      const colums=[
        {
            align:'center',
            title: '礼物名称',
            dataIndex: 'name',
        },
        {
            align:'center',
            title: '礼物图片',
            dataIndex: 'icon',
            render: (text,record)=>{return(<img style={{width:50,height:50}} src={record.icon}/>)},
        },
        {
            align:'center',
            title: '礼物价格（钻石）',
            dataIndex: 'price',
        },
        {
            align:'center',
            title: '导师获得魅力值',
            dataIndex: 'meiliValue',
        },
        {
            align:'center',
            title: '礼物序号',
            dataIndex: 'codeNum',
        },
        {
            align:'center',
            title: '礼物介绍',
            dataIndex: 'note',
        },
        {
            align:'center',
            title: '操作',
            dataIndex: 'action',
            render: (text,record)=>{return(<div><Button size="small" type="primary"style={{marginRight:10}} onClick={()=>{this.editGift(record)}}>编辑</Button><Button size="small" type="primary"onClick={()=>{this.deleteGift(record)}}>删除</Button></div>)},
        },
      ];
      this.setState({colums});
  }
  submitGift(){
    const {giftImg,giftName,giftPrice,giftRemark,giftNumber,giftMeili,giftType}=this.state;
    const sbdata={
        name: giftName,
        icon:giftImg,
        price:giftPrice,
        meiliValue:giftMeili,
        giftType:giftType.id,
        type: 1,
        codeNum:giftNumber,
        note:giftRemark,
        state:1,
    }
    console.log(sbdata);
    const content=this;
    console.log(programHost.getAuth('/admin/add/gift/info'));
    fetch(`${programHost.APIhost}/admin/add/gift/info`, {
        method: 'POST',
        dataType: 'json',
        body:JSON.stringify(sbdata),
        mode: 'cors',
        credentials: 'include',
        headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization':programHost.getAuth('/admin/add/gift/info'),// 获取token
        }),
        }).then((response) => {
        console.log(response);
        response.json().then((res) => {
            console.log(res);
           if(res.statusCode===107){ message.success(res.message);content.emptyGift();}
           else{message.warn(res.message);}
            },(data) => {
            console.log(data)
        });
    });
  }
  emptyGift(){
      this.setState({
        giftImg:'http://img3.tuwandata.com/uploads/play/1142101545745926.png',
        giftMeili:1,
        giftName:'',
        giftPrice:1,
        giftRemark:'',
        giftNumber:0,
        giftType:{id:1,label:'普通礼物'},
      });
  }
  editGift(record){
    console.log(record);
    const {giftTypeArr}=this.state;
    let giftType={};
    giftTypeArr.map((item,index)=>{
        if(item._id===record._id){giftType={id:record.type,label:item.label};}
    })
    this.setState({
        editing:true,
        giftImg:record.icon,
        giftMeili:record.meiliValue,
        giftName:record.name,
        giftPrice:record.price,
        giftRemark:record.note,
        giftNumber:record.codeNum,
        giftType,
    })
}
  deleteGift(record){
      console.log(record);
  }
  
//   changePage (page){
//     console.log(page);
//     const {totalPage}=this.state;
//     if(page>=totalPage){this.setState({currentPage:totalPage});}
//     else{ this.setState({currentPage:page});}
//     const content=this;
//     const sbdata={where:{}};
//             //联网
//         fetch(`${programHost.APIhost}/user/anchor/game/list/${page}/10`, {
//             method: 'POST',
//             dataType: 'json',
//             body:JSON.stringify(sbdata),
//             mode: 'cors',
//             credentials: 'include',
//             headers: new Headers({
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json;charset=UTF-8',
//                 'Authorization':programHost.getAuth(`/user/anchor/game/list/${page}/10`),// 获取token
//             }),
//             }).then((response) => {
//             console.log(response);
//             response.json().then((res) => {
//                 console.log(res);
//                 if(res.statusCode===107){
//                     const arr=res.resource;
//                     arr.forEach((item,ind)=>{item.key=ind;});
//                     content.setState({totalPage:res.sum,gameApplyList:arr});
//                 }
//                 },(data) => {
//                 console.log(data)
//             });
//         });
//   }
    render() {
        const {giftImg,giftName,giftPrice,giftRemark,giftNumber,giftMeili,giftTypeArr,giftType,currentPage,totalPage,colums,giftList}=this.state;
        const Option = Select.Option;
        return ( <div className={styles.normal}>
                <h1 className={styles.title}>添加礼物</h1>
                <div>
                    <Row>
                        <Col span={3}>礼物图片：</Col>
                        <Col span={10}></Col>
                    </Row>
                </div>
                <div className={styles.formItem}>
                    <Row>
                        <Col span={3}>礼物名称：</Col>
                        <Col span={10}><Input placeholder="请填写礼物名称" style={{width:400}} value={giftName}onChange={(e)=>{this.setState({giftName:e.target.value})}}  /></Col>
                    </Row>
                </div>
                <div className={styles.formItem}>
                    <Row>
                        <Col span={3}>礼物序号：</Col>
                        <Col span={10}><InputNumber min={0} value={giftNumber} style={{width:400}} onChange={(value)=>{this.setState({giftNumber:value})}} /></Col>
                    </Row>
                </div>
                <div className={styles.formItem}>
                    <Row>
                        <Col span={3}>礼物类型：</Col>
                        <Col span={10}>
                        <Select labelInValue style={{ width: 400 }} value={{key:giftType.id,label:giftType.label}} onChange={(value)=> {this.setState({giftType:{id:value.key,label:value.label}}) }}>
                        {giftTypeArr.map((item)=>{return(<Option value={item.id} key={item.id}>{item.label}</Option>)})}
                        </Select>
                        </Col>
                    </Row>
                </div>
                <div className={styles.formItem}>
                    <Row>
                        <Col span={3}>礼物价格（钻石）：</Col>
                        <Col span={10}><InputNumber min={0} value={giftPrice} style={{width:400}} onChange={(value)=>{this.setState({giftPrice:value})}} /></Col>
                    </Row>
                </div>
                <div className={styles.formItem}>
                    <Row>
                        <Col span={3}>导师获得魅力值：</Col>
                        <Col span={10}><InputNumber min={1}  placeholder="导师收到此礼物可增加的魅力值" style={{width:400}}  value={giftMeili}onChange={(value)=>{this.setState({giftMeili:value})}}  /></Col>
                    </Row>
                </div>
                
                <div className={styles.formItem}>
                    <Row>
                        <Col span={3}>礼物简介：</Col>
                        <Col span={10}><Input placeholder="请填写礼物介绍" style={{width:400}} value={giftRemark}onChange={(e)=>{this.setState({giftRemark:e.target.value})}}  /></Col>
                    </Row>
                </div>
                <div className={styles.submitDiv}><Button type="primary" onClick={()=>{this.submitGift();}}>提交</Button></div>

                <h1 className={styles.title}>礼物列表</h1>
                <div className={styles.tableDiv}>
                    <Table columns={colums} dataSource={giftList} pagination={false} />
                    <Pagination current={currentPage} onChange={(page)=>{this.changePage(page);}} total={totalPage}/>
                </div>
            </div>
        )
    }
}


