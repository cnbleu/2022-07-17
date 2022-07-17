import React from "react";
import { Form, Input, Radio } from "@alifd/next";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

export default function UserForm(props) {
  const { defaultFormData, handleSubmit } = props;

  // 提交表单
  const _handleSubmit = (v, errors) => {
    const formData = Object.assign({}, defaultFormData, v);
    if (errors) {
      return;
    }
    handleSubmit(formData, () => {
      alert("提交成功");
    });
  };

  return (
    <Form
      {...formItemLayout}
      onSubmit={_handleSubmit}
      useLabelForErrorMessage
      colon
    >
      <FormItem label="账号" required name="account">
        <Input
          placeholder="Input frank"
          defaultValue={defaultFormData.account}
        />
      </FormItem>
      <FormItem
        label="邮箱"
        required
        requiredTrigger="onBlur"
        format="email"
        name="email"
      >
        <Input
          placeholder="Both trigget onBlur and onChange"
          defaultValue={defaultFormData.email}
        />
      </FormItem>

      <FormItem
        label="密码"
        hasFeedback
        required
        requiredMessage="Please enter password"
        name="password"
      >
        <Input htmlType="password" defaultValue={defaultFormData.password} />
      </FormItem>

      <FormItem
        label="性别"
        hasFeedback
        required
        requiredMessage="Please select your gender"
        name="gender"
      >
        <RadioGroup defaultValue={defaultFormData.gender}>
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem
        label="备注"
        required
        requiredMessage="Really do not intend to write anything?"
        name="remarks"
      >
        <Input.TextArea
          defaultValue={defaultFormData.remarks}
          maxLength={20}
          showLimitHint
          placeholder="Everything is ok!"
        />
      </FormItem>

      <FormItem wrapperCol={{ offset: 6 }}>
        <Form.Submit
          validate
          type="primary"
          onClick={_handleSubmit}
          style={{ marginRight: 10 }}
        >
          提交
        </Form.Submit>
      </FormItem>
    </Form>
  );
}
