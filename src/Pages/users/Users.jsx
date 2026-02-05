import { useState } from "react";
import { Table, Button, Modal, Image, Dropdown, Space, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FaUserCircle } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import Back from "../../components/back/Back";
import { useGetAllUsersQuery } from "../../Redux/usersApis";
import { image_url } from "../../Redux/main/server";

const Users = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = {
    page: currentPage,
    limit: 10,
  };

  const { data: usersData, isLoading } = useGetAllUsersQuery(queryParams);

  console.log(usersData);

  const users =
    usersData?.users.map((item) => ({
      key: item.id,
      image: `${image_url}/${item.avatar}`,
      userName: item.name || "N/A",
      nick_name: item.nick_name || "N/A",
      licence_id: item.licence_id || "N/A",
      email: item.email || "N/A",
      joined: new Date(item.createdAt).toLocaleDateString(),
      designation: item.designation || "N/A",
      userData: item,
    })) || [];

  const columns = [
    {
      title: <div className="font-poppins">Nick Name</div>,
      dataIndex: "nick_name",
      key: "nick_name",
      render: (text) => <div className="font-poppins">{text}</div>,
    },
    {
      title: <div className="font-poppins">User Name</div>,
      dataIndex: "userName",
      key: "userName",
      render: (text, record) => (
        <div className="flex items-center space-x-3 font-poppins">
          <img
            src={`${image_url}/${record.image}`}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="text-gray-900 font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: <div className="font-poppins">Email</div>,
      dataIndex: "email",
      key: "email",
      render: (text) => <div className="font-poppins">{text}</div>,
    },

    {
      title: <div className="font-poppins">License ID</div>,
      dataIndex: "licence_id",
      key: "licence_id",
      render: (text) => <div className="font-poppins">{text}</div>,
    },
    {
      title: <div className="font-poppins">Joined</div>,
      dataIndex: "joined",
      key: "joined",
      render: (text) => <div className="font-poppins">{text}</div>,
    },
    {
      title: <div className="font-poppins">Description</div>,
      dataIndex: "designation",
      key: "designation",
      render: (text) => <div className="font-poppins">{text}</div>,
    },

    {
      title: <div className="font-poppins">Action</div>,
      key: "action",
      render: (_, record) => (
        <div className="flex space-x-2 font-poppins">
          <Button
            type="primary"
            icon={<FaUserCircle />}
            className="bg-[#6C63FF] hover:!bg-[#5d55f5] text-white font-poppins"
            onClick={() => handleViewProfile(record)}
          />
        </div>
      ),
    },
  ];

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-[#F9FAFB] h-screen p-10 !mb-64 !pb-20">
      <div className="flex items-center justify-between">
        <Back name="User Management " />
        <div></div>
      </div>

      <div className="mb-20 bg-white p-5 mt-4 !pb-20">
        <Table
          columns={columns}
          dataSource={users}
          loading={isLoading}
          pagination={{
            position: ["bottomCenter"],
            current: currentPage,
            pageSize: 10,
            total: usersData?.totalUsers,
            onChange: handlePageChange,
            showSizeChanger: false,
          }}
          className="mt-5"
        />

        {/* ---------------- Profile Modal ---------------- */}
        {selectedUser && (
          <Modal
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            centered
            width={480}
          >
            <div className="flex flex-col items-center text-center py-6 px-4 font-poppins">
              {/* Avatar */}
              <div className="relative">
                <Image
                  src={selectedUser.image}
                  className="rounded-full shadow-lg border-4 border-white"
                  width={120}
                  height={120}
                  preview={false}
                />
                <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
              </div>

              <p>
                {selectedUser.nick_name}
              </p>

              {/* Divider */}
              <div className="w-full border-t my-4"></div>

              {/* Details */}
              <div className="w-full text-left space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Nick Name:</span>{" "}
                  {selectedUser.nick_name}
                </p>
                <p>
                  <span className="font-semibold">License ID:</span>{" "}
                  {selectedUser.licence_id}
                </p>
                <p>
                  <span className="font-semibold">Designation:</span>{" "}
                  {selectedUser.designation}
                </p>
                <p>
                  <span className="font-semibold">Joined:</span>{" "}
                  {selectedUser.joined}
                </p>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Users;
