import React, { useState } from "react";
import { Table, Tag, Button, Input, DatePicker, Modal, Form, Select, TimePicker } from "antd";
import { ExportOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, MenuOutlined } from "@ant-design/icons";
import Topbar from '../../components/TopbarComponent/TopbarComponent';
import './OrderProductPage.css';

const { TextArea } = Input;
const { Option } = Select;

const OrderProduct = () => {
  const [filters, setFilters] = useState({
    status: '',
    orderType: 'All order',
    date: null,
    dateString: '',
  });

  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị modal
  const [form] = Form.useForm(); // Form của Ant Design để quản lý dữ liệu

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Hình thức",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Đang xử lý" ? "orange" : status === "Đã giao" ? "blue" : "red"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: () => (
        <div className="actions">
          <Button type="link" icon={<EyeOutlined />} title="Hiển thị thông tin" />
          <Button type="link" icon={<EditOutlined />} title="Chỉnh sửa" />
          <Button type="link" danger icon={<DeleteOutlined />} title="Xóa" />
        </div>
      ),
    },
  ];

  const data = [
    {
      id: "302012",
      product: "Nhẫn Kim Cương Vàng",
      date: "29 Dec 2022",
      customer: "John Bushmill",
      total: "13,000,000",
      payment: "Mastercard",
      status: "Đang xử lý",
    },
    {
      id: "302011",
      product: "Nhẫn Kim Cương Vàng",
      date: "24 Dec 2022",
      customer: "Linda Blair",
      total: "13,000,000",
      payment: "Visa",
      status: "Đã giao",
    },
    {
      id: "301901",
      product: "Nhẫn Kim Cương Vàng",
      date: "12 Dec 2022",
      customer: "M Karim",
      total: "13,000,000",
      payment: "Mastercard",
      status: "Đã hủy",
    },
  ];

  const filteredData = data.filter(item => {
    return (
      (filters.orderType === 'All order' || item.status === filters.orderType) &&
      (filters.status ? item.status === filters.status : true) &&
      (filters.dateString ? item.date.includes(filters.dateString) : true)
    );
  });

  const handleOrderTypeChange = (type) => {
    setFilters(prev => ({
      ...prev,
      orderType: type,
    }));
  };

  const handleDateChange = (date, dateString) => {
    setFilters(prev => ({
      ...prev,
      date: date,
      dateString: dateString,
    }));
  };

  // Hàm mở form
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hàm đóng form
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset form khi đóng
  };

  // Xử lý khi Submit form
  const handleFinish = (values) => {
    console.log("Form values:", values);
    setIsModalVisible(false); // Đóng modal sau khi submit
    form.resetFields(); // Reset form
  };

  return (
    <div className="order-page">
      <div style={{ marginLeft: '270px' }}>
        <Topbar title="Đơn hàng" />
      </div>
      <div className="order-table-container">
        <header className="order-header">
          <div className="header-actions">
            <Input.Search placeholder="Tìm kiếm đơn hàng..." style={{ width: 800 }} />
            <Button type="primary" className="export-button" icon={<ExportOutlined />}>
              Xuất file
            </Button>
            <Button
              type="primary"
              className="add-order-button"
              icon={<PlusOutlined />}
              onClick={showModal}
            >
              Thêm đơn hàng
            </Button>

            <div className="filter-section">
              <div style = {{ gap: '20%', flex: 1}}>
              <Button
                onClick={() => handleOrderTypeChange('All order')}
        
                className={`filter-btn ${filters.orderType === 'All order' ? 'active' : ''}`}
              >
                All order
              </Button>
              <Button
                onClick={() => handleOrderTypeChange('Đang xử lý')}
                className={`filter-btn ${filters.orderType === 'Đang xử lý' ? 'active' : ''}`}
              >
                Đang xử lý
              </Button>
              <Button
                onClick={() => handleOrderTypeChange('Đã giao')}
                className={`filter-btn ${filters.orderType === 'Đã giao' ? 'active' : ''}`}
              >
                Đã giao
              </Button>
              <Button
                onClick={() => handleOrderTypeChange('Đã hủy')}
                className={`filter-btn ${filters.orderType === 'Đã hủy' ? 'active' : ''}`}
              >
                Đã hủy
              </Button>
              </div>
              <div style = {{ gap: '10%', flex: 1}}>
                <DatePicker
                  placeholder="Chọn ngày"
                  style={{ width: 120 }}
                  onChange={handleDateChange}
                />
                <Button
                  type="primary"
                  icon={<MenuOutlined />}
                  className="filter-toggle-button"
                >
                  Bộ lọc
                </Button>
              </div>
            </div>
          </div>
        </header>

        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 10 }}
          rowKey="id"
        />
      </div>

      {/* Modal thêm đơn hàng */}
      <Modal
        title="Tạo đơn hàng mới"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={1000} 
      >
        <Form  layout="vertical" form={form} onFinish={handleFinish}>
          <div className="form-order-content">
            <div className="order-details">
              <h3>Chi tiết đơn hàng</h3>
              <Form.Item
                name="customer"
                label="Chọn khách hàng:"
                rules={[{ required: true, message: "Vui lòng chọn khách hàng!" }]}
              >
                <Select placeholder="Chọn khách hàng...">
                  <Option value="customer1">Khách hàng 1</Option>
                  <Option value="customer2">Khách hàng 2</Option>
                  <Option value="customer3">Khách hàng 3</Option>
                </Select>
              </Form.Item>

              <div className="form-row">
                <Form.Item
                  name="payment"
                  label="Hình thức thanh toán:"
                  style={{width: '100%'}}
                  rules={[{ required: true, message: "Vui lòng chọn hình thức thanh toán!" }]}
                >
                  <Select placeholder="Chọn...">
                    <Option value="cash">Tiền mặt</Option>
                    <Option value="card">Thẻ</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="orderType"
                  label="Loại đơn hàng:"
                  style={{width: '100%'}}
                  rules={[{ required: true, message: "Vui lòng chọn loại đơn hàng!" }]}
                >
                  <Select placeholder="Chọn...">
                    <Option value="online">Online</Option>
                    <Option value="offline">Offline</Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="form-row">
                <Form.Item
                  name="orderDate"
                  label="Ngày đặt hàng:"
                  style={{ width: "100%" }} 
                  rules={[{ required: true, message: "Vui lòng chọn ngày đặt hàng!" }]}
                >
                  <DatePicker/>
                </Form.Item>

                <Form.Item
                  name="orderTime"
                  label="Giờ đặt hàng:"
                  style={{ width: "100%" }} 
                  rules={[{ required: true, message: "Vui lòng chọn giờ đặt hàng!" }]}
                >
                  <TimePicker />
                </Form.Item>
              </div>

              <Form.Item
                name="status"
                label="Trạng thái đơn hàng:"
                rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
              >
                <Select placeholder="Chọn trạng thái">
                  <Option value="processing">Đang xử lý</Option>
                  <Option value="shipped">Đã giao</Option>
                  <Option value="cancelled">Đã hủy</Option>
                </Select>
              </Form.Item>

              <Form.Item name="notes" label="Ghi chú:">
                <TextArea rows={4} placeholder="Nhập ghi chú..." />
              </Form.Item>
            </div>

            <div className="product-section">
              <h3>Sản phẩm</h3>
              <Input.Search
                placeholder="Nhập tên hoặc mã sản phẩm..."
                style={{ marginBottom: "20px" }}
              />
            </div>
          </div>

        <Form.Item style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
            <Button
              htmlType="reset"
              className="cancel-button"
              onClick={handleCancel}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="create-button"
            >
              Tạo đơn hàng
            </Button>
          </Form.Item>
          </Form>
      </Modal>
    </div>
  );
};

export default OrderProduct;
