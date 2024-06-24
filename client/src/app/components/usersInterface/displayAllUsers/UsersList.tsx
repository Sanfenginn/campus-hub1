import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useState } from "react";

const columns: GridColDef[] = [
  //   { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 100 },
  { field: "lastName", headerName: "Last name", width: 100 },
  // {
  //   field: "age",
  //   headerName: "Age",
  //   type: "number",
  //   width: 80,
  // },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 80,
    renderCell: (params) => (
      <div style={{ textAlign: "center", width: "100%" }}>{params.value}</div>
    ),
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
  {
    field: "account",
    headerName: "Account",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "address",
    headerName: "Address",
    width: 400,
  },
];

type User = {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  age: number;
  contact: {
    email: string;
    phone: string;
  };
  address: {
    road: string;
    city: string;
    state: string;
    postalCode: string;
  };
  account: string;
};

const UsersList: React.FC = () => {
  const usersData = useSelector((state: RootState) => state.usersData);
  console.log("usersData:", usersData);
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );

  // console.log("selectionModel:", selectionModel);

  const rows = usersData.map((user: User) => ({
    id: user._id,
    firstName: user.name.firstName,
    lastName: user.name.lastName,
    age: user.age,
    email: user.contact.email,
    phone: user.contact.phone,
    address: `${user.address.road}, ${user.address.city}, ${user.address.state}, ${user.address.postalCode}`,
    account: user.account,
  }));

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 20 },
        },
      }}
      pageSizeOptions={[5, 10, 15, 20, 25]}
      checkboxSelection
      onRowSelectionModelChange={(newSelectionModel) => {
        setSelectionModel(newSelectionModel);
      }}
    />
  );
};

export default UsersList;
