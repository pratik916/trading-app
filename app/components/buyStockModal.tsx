"use client";
import { Button, Form, Input, Modal, Select } from "antd";
import type { FormProps } from "antd";
import { useState } from "react";
import { searchStock } from "../utils/apis";
import { useDebounceCallback } from "usehooks-ts";
import useSearchStock from "../hooks/useSearchStock";
import useGetLivePrice from "../hooks/useGetLivePrice";

function BuyStockModal() {
  const { data, handleSearch } = useSearchStock();

  const [form] = Form.useForm();
  const symbol = Form.useWatch("symbol", form);

  const { price } = useGetLivePrice(symbol);

  return (
    <Modal
      open
      title="Title"
      // onOk={handleOk}
      // onCancel={handleCancel}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <Button>Custom Button</Button>
          <CancelBtn />
          <OkBtn />
        </>
      )}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Select Stock"
          name="symbol"
          rules={[{ required: true, message: "Please input your search!" }]}
        >
          <Select
            showSearch
            // value={value}
            placeholder="Search your stock"
            // style={props.style}
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleSearch}
            // onChange={handleChange}
            notFoundContent={null}
            options={data || []}
          />
        </Form.Item>
        {price}
      </Form>
    </Modal>
  );
}

export default BuyStockModal;
