import { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Image,
  Popconfirm,
  Tooltip,
  message,
} from "antd";
import { FaUserCircle } from "react-icons/fa";
import { MdBlock, MdOutlineCheckCircle } from "react-icons/md";
import Back from "../../components/back/Back";
import {
  useBlockUnblockUserMutation,
  useGetAllUsersQuery,
} from "../../Redux/usersApis";
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
  const [blockUnblockUser, { isLoading: isBlocking }] =
    useBlockUnblockUserMutation();

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
      isBlocked: item.is_blocked || false,
      userData: item,
    })) || [];

  const handleBlockUnblock = async (userId, isBlocked) => {
    try {
      await blockUnblockUser({ userId }).unwrap();
      message.success(
        `User ${isBlocked ? "unblocked" : "blocked"} successfully`,
      );

      // Update selectedUser state if modal is open for this user
      if (selectedUser?.key === userId) {
        setSelectedUser((prev) => ({ ...prev, isBlocked: !isBlocked }));
      }
    } catch (error) {
      message.error(`Failed to ${isBlocked ? "unblock" : "block"} user`);
    }
  };

  const columns = [
    {
      title: <div className="font-poppins">Nick Name</div>,
      dataIndex: "nick_name",
      key: "nick_name",
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
      title: <div className="font-poppins">Status</div>,
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (isBlocked) => (
        <span
          className={`font-poppins text-xs font-semibold px-2 py-1 rounded-full ${
            isBlocked
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {isBlocked ? "Blocked" : "Active"}
        </span>
      ),
    },
    {
      title: <div className="font-poppins">Action</div>,
      key: "action",
      render: (_, record) => (
        <div className="flex space-x-2 font-poppins">
          {/* View Profile */}
          <Tooltip title="View Profile">
            <Button
              type="primary"
              icon={<FaUserCircle />}
              className="bg-[#6C63FF] hover:!bg-[#5d55f5] text-white font-poppins"
              onClick={() => handleViewProfile(record)}
            />
          </Tooltip>

          {/* Block / Unblock */}
          <Popconfirm
            title={record.isBlocked ? "Unblock this user?" : "Block this user?"}
            description={
              record.isBlocked
                ? "This user will regain access to the platform."
                : "This user will lose access to the platform."
            }
            onConfirm={() => handleBlockUnblock(record.key, record.isBlocked)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              className: record.isBlocked
                ? "bg-green-500 hover:!bg-green-600"
                : "bg-red-500 hover:!bg-red-600",
            }}
          >
            <Tooltip title={record.isBlocked ? "Unblock User" : "Block User"}>
              <Button
                icon={
                  record.isBlocked ? (
                    <MdOutlineCheckCircle className="text-green-600" />
                  ) : (
                    <MdBlock className="text-red-500" />
                  )
                }
                className={`font-poppins border ${
                  record.isBlocked
                    ? "border-green-400 hover:!border-green-500"
                    : "border-red-400 hover:!border-red-500"
                }`}
                loading={isBlocking}
              />
            </Tooltip>
          </Popconfirm>
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
                <span
                  className={`absolute bottom-2 right-2 w-4 h-4 border-2 border-white rounded-full ${
                    selectedUser.isBlocked ? "bg-red-500" : "bg-green-500"
                  }`}
                />
              </div>

              <p className="mt-2 text-lg font-semibold">
                {selectedUser.nick_name}
              </p>

              {/* Status Badge */}
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full mt-1 ${
                  selectedUser.isBlocked
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {selectedUser.isBlocked ? "Blocked" : "Active"}
              </span>

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

              {/* Divider */}
              <div className="w-full border-t my-4"></div>

              {/* Block/Unblock Button inside Modal */}
              <Popconfirm
                title={
                  selectedUser.isBlocked
                    ? "Unblock this user?"
                    : "Block this user?"
                }
                description={
                  selectedUser.isBlocked
                    ? "This user will regain access to the platform."
                    : "This user will lose access to the platform."
                }
                onConfirm={() =>
                  handleBlockUnblock(selectedUser.key, selectedUser.isBlocked)
                }
                okText="Yes"
                cancelText="No"
                okButtonProps={{
                  className: selectedUser.isBlocked
                    ? "bg-green-500 hover:!bg-green-600"
                    : "bg-red-500 hover:!bg-red-600",
                }}
              >
                <Button
                  icon={
                    selectedUser.isBlocked ? (
                      <MdOutlineCheckCircle />
                    ) : (
                      <MdBlock />
                    )
                  }
                  className={`w-full font-poppins font-semibold ${
                    selectedUser.isBlocked
                      ? "bg-green-50 text-green-600 border-green-400 hover:!bg-green-100 hover:!border-green-500"
                      : "bg-red-50 text-red-600 border-red-400 hover:!bg-red-100 hover:!border-red-500"
                  }`}
                  loading={isBlocking}
                >
                  {selectedUser.isBlocked ? "Unblock User" : "Block User"}
                </Button>
              </Popconfirm>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Users;
