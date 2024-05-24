"use client";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useEffect } from "react";
import useSearchStock from "../hooks/useSearchStock";
import useGetLivePrice from "../hooks/useGetLivePrice";
import useAvailableBalance from "../hooks/useAvailableBalance";
import { toast } from "react-toastify";
import { usePortfolioStore } from "../stores/portfolioStore";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { toastOptions } from "../utils/constants";

interface TradeStockModalProps {
  onClose: () => void;
  type?: "buy" | "sell";
  symbol?: string;
  maxQuantity?: number;
}

function TradeStockModal({
  onClose,
  type = "buy",
  symbol: inputSymbol,
  maxQuantity = 0,
}: TradeStockModalProps) {
  const { data, handleSearch } = useSearchStock();
  const { addEntry } = usePortfolioStore();

  const [form] = Form.useForm();
  const symbol = Form.useWatch("symbol", form);
  const quantity = Form.useWatch("quantity", form);
  const price = Form.useWatch("price", form);

  const { livePrice } = useGetLivePrice(symbol);

  useEffect(() => {
    if (livePrice) {
      form.setFieldValue("price", livePrice);
    }
  }, [livePrice]);

  useEffect(() => {
    if (inputSymbol) {
      handleSearch(inputSymbol);
    }
  }, [inputSymbol]);

  const { availableBalance } = useAvailableBalance();

  const totalTradeValue = (price || 0) * (quantity || 0);
  const balanceAfterTrade =
    availableBalance -
    (type === "sell" ? -1 : 1) * (price || 0) * (quantity || 0);

  const handleOk = async () => {
    try {
      await form.validateFields();

      if (balanceAfterTrade < 0) {
        return toast.error("Trade value exceeded", toastOptions);
      }
      if (totalTradeValue <= 0) {
        return toast.error(
          "Trade value must be greater than zero",
          toastOptions,
        );
      }

      if (type === "sell" && Number(quantity) > Number(maxQuantity)) {
        return toast.error(
          "Quantity can not be greater total holdings.",
          toastOptions,
        );
      }

      if (!data.length) {
        return toast.error(
          "Please wait until we fetch the stock details.",
          toastOptions,
        );
      }

      if (price) {
        addEntry({
          id: uuidv4(),
          price,
          quantity,
          symbol,
          total: totalTradeValue,
          type,
          time: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
          desc: data?.find((s) => s.value === symbol)?.label,
        });
        onClose();
        toast.success(
          `Successfully bought ${symbol} ${quantity} at ${price} price`,
          toastOptions,
        );
      }
    } catch (error: any) {
      toast.error(error.errorFields?.[0]?.errors?.[0], toastOptions);
    }
  };

  return (
    <Modal
      open
      title={type === "buy" ? "Buy Stock" : "Sell Stock"}
      okText="Buy"
      onOk={handleOk}
      onCancel={onClose}
      footer={(_, { CancelBtn }) => (
        <>
          <button
            onClick={handleOk}
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {type === "buy" ? "Buy" : "Sell"}
          </button>

          <CancelBtn />
        </>
      )}
    >
      <Form
        name="basic"
        initialValues={{ symbol: inputSymbol }}
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
            placeholder="Search your stock"
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleSearch}
            notFoundContent={null}
            options={data || []}
            disabled={type === "sell"}
          />
        </Form.Item>
        {symbol && (
          <Row>
            <Col span={12}>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please wait for price to be fetched!",
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: "Please input your quantity!",
                    min: 1,
                  },
                ]}
              >
                <Input type="number" min={1} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <div className="flex flex-col">
                <b>Available Balance:</b> ${availableBalance.toLocaleString()}
              </div>
            </Col>
            <Col span={12}>
              <div className="flex flex-col">
                <b>Total Trade Value:</b> ${totalTradeValue.toLocaleString()}
              </div>
            </Col>
            <Col span={12}>
              <div className="flex flex-col">
                <b>Balance After trade:</b> $
                {balanceAfterTrade.toLocaleString()}
              </div>
            </Col>
            <Col span={12}>
              <div className="flex flex-col">
                <b>Total Holding:</b> {maxQuantity.toLocaleString()}
              </div>
            </Col>
          </Row>
        )}
      </Form>
    </Modal>
  );
}

export default TradeStockModal;
