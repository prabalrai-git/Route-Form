import axios from 'axios';
import moment from 'moment';
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Switch,
    message
  } from 'antd';
  

  const RouteForm = () => {
    const url = 'http://lunivacare.ddns.net/LunivaRouteAPI/LunivarouteManagementApi/InsertUpdateRouteDetails';

    const generateUrlEncodedData = (initialObject) => {
      const formData = Object.keys(initialObject)
        .map((key) => {
            return `${key}=${encodeURIComponent(initialObject[key])}`
        })
        .join('&');
      return formData;
    }

    const handleInputs = (e)=>{
        let baseData = {
            "RId": 0,
            "RouteName": e.RouteName,
            "SourceLocation": e.SourceLocation,
            "DestinationLocation": e.DestinationLocation,
            "EntryDate":  moment(e.EntryDate).format(),
            "IsActive": true ,
            "CompanyId": e.CompanyId,
            "Charge": e.Charge
          }
          let newData = generateUrlEncodedData(baseData)
         
                axios.post(url,newData)
                .then(response => response.json)
                .then(json => console.log(json))
                .catch(error => {
                console.log(error);});

             info();


              };
    
       const info = () => {
        message.info('The form has been submitted');
            };            



 
    return (
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 4,
        }}
        style={{marginTop:100}}
        onFinish={handleInputs}
        
        >
        
        <Form.Item label="Route Name" name='RouteName' rules={[
          {
            required: true,
            message: 'Please input the Route name!',
          },
        ]}>
          <Input/>
        </Form.Item >
        <Form.Item label="Source Location" 
                   name='SourceLocation' 
                   rules={[
          {
            required: true,
            message: 'Please input The Source Location!',
          },
        ]}>
          <Input />
        </Form.Item>
        <Form.Item label="Destination Location"                   
                   name="DestinationLocation"
                   rules={[
          {
            required: true,
            message: 'Please input the Destination Location!',
          },
        ]}>
          <Input/>
        </Form.Item>
        <Form.Item label="Entry Date"
                   name="EntryDate"
                   rules={[
          {
            required: true,
            message: 'Please input the Entry Date!',
          },
        ]}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="Is Active" name='isActive' valuePropName="checked"

         >
          <Switch />
        </Form.Item>
        <Form.Item label="Company Id" 
                   name="CompanyId"
                   rules={[
          {
            required: true,
            message: 'Please input the CompanyId!',
          },
        ]}>
          <InputNumber/>
        </Form.Item>
       
       
      <Form.Item label="Charge" 
                   name="Charge"
                   rules={[
          {
            required: true,
            message: 'Please input the Charge Amount',
          },
        ]}>
          <InputNumber/>
        </Form.Item>
        <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
       
      </Form>
    );
  
      };
  export default RouteForm;