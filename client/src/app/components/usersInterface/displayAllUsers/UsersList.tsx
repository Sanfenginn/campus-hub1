import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { setSelectedDataInfo } from "@/app/redux/selectedDataInfo";

const setColumns = (currentPage: string) => {
  let columns: GridColDef[] = [];
  if (currentPage === "users") {
    columns = [
      //   { field: "id", headerName: "ID", width: 70 },
      { field: "firstName", headerName: "First name", width: 100 },
      { field: "lastName", headerName: "Last name", width: 100 },
      {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 80,
        renderCell: (params) => (
          <div style={{ textAlign: "center", width: "100%" }}>
            {params.value}
          </div>
        ),
      },
      {
        field: "fullName",
        headerName: "Full name",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 130,
        valueGetter: (value, row) =>
          `${row.firstName || ""} ${row.lastName || ""}`,
      },
      {
        field: "account",
        headerName: "Account",
        width: 100,
      },
      {
        field: "role",
        headerName: "Role",
        width: 100,
      },
      {
        field: "email",
        headerName: "Email",
        width: 230,
      },
      {
        field: "phone",
        headerName: "Phone",
        width: 140,
      },
      {
        field: "address",
        headerName: "Address",
        width: 400,
      },
    ];
  } else if (currentPage === "courses") {
    columns = [
      { field: "name", headerName: "Course Name", width: 150 },
      { field: "instructor", headerName: "Instructor", width: 110 },
      { field: "classroom", headerName: "Classroom", width: 100 },
      { field: "dayOfWeek", headerName: "Week", width: 110 },
      { field: "startDate", headerName: "Start Date", width: 100 },
      { field: "endDate", headerName: "End Date", width: 100 },
      { field: "startTime", headerName: "Start Time", width: 100 },
      { field: "endTime", headerName: "End Time", width: 100 },
      { field: "studentClasses", headerName: "Classes", width: 100 },
      {
        field: "description",
        headerName: "Description",
        width: 300,
        renderCell: (params) => (
          <div
            style={{
              whiteSpace: "normal",
              wordBreak: "break-word",
              display: "inline-block",
              lineHeight: "1.5",
            }}
          >
            {params.value}
          </div>
        ),
      },
    ];
  }

  return columns;
};

type User = {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  dob: Date;
  contact: {
    email: string;
    phone: string;
  };
  address: {
    houseNumber: string;
    street: string;
    suburb: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  account: string;
  role: {
    userType: string;
  };
};

type Course = {
  _id: string;
  name: string;
  description: string;
  instructor: {
    name: {
      firstName: string;
      lastName: string;
    };
  };
  studentClasses: [
    {
      className: string;
    }
  ];
  classroom: string;
  courseSchedule: {
    dayOfWeek: string;
    courseDate: {
      startDate: string;
      endDate: string;
    };
    courseTime: {
      startTime: string;
      endTime: string;
    };
  };
};

const UsersList: React.FC = () => {
  const usersData = useSelector((state: RootState) => state.usersData);
  const coursesData = useSelector((state: RootState) => state.coursesData);
  const currentPage = localStorage.getItem("currentPage");
  const columns = setColumns(currentPage as string);

  console.log("coursesData  in UsersList:", coursesData);
  console.log("currentPage in UsersList:", currentPage);

  const dispatch = useDispatch();

  let rows = {};
  if (currentPage === "users") {
    rows = usersData.map((user: User) => {
      const addressParts = [
        user.address.houseNumber,
        user.address.street,
        user.address.suburb,
        user.address.city,
        user.address.state,
        user.address.country,
        user.address.postalCode,
      ].filter(Boolean); // 过滤掉任何假值，例如空字符串或 null
      const dob = new Date(user.dob);
      const age = new Date().getFullYear() - dob.getFullYear();
      return {
        id: user._id,
        firstName: user.name.firstName,
        lastName: user.name.lastName,
        age: age,
        email: user.contact.email,
        phone: user.contact.phone,
        address: addressParts.join(", "),
        account: user.account,
        role: user.role.userType,
      };
    });
  } else if (currentPage === "courses") {
    rows = coursesData.map((course: Course) => {
      const instructorFirstName = course?.instructor?.name?.firstName || "";
      const instructorLastName = course?.instructor?.name?.lastName || "";
      const instructorName = `${instructorFirstName} ${instructorLastName}`;

      return {
        id: course._id,
        name: course.name,
        description: course.description,
        instructor: instructorName,
        studentClasses: course?.studentClasses[0]?.className || "",
        classroom: course?.classroom || "",
        dayOfWeek: course?.courseSchedule?.dayOfWeek || "",
        startDate:
          course?.courseSchedule?.courseDate?.startDate.split("T")[0] || "",
        endDate:
          course?.courseSchedule?.courseDate?.endDate.split("T")[0] || "",
        startTime: course?.courseSchedule?.courseTime?.startTime || "",
        endTime: course?.courseSchedule?.courseTime?.endTime || "",
      };
    });
  }

  const handleSelectionModelChange = (
    newSelectionModel: GridRowSelectionModel
  ) => {
    let selectedData: any = [];
    if (currentPage === "users") {
      selectedData = newSelectionModel.map((id) =>
        usersData.find((user: User) => user._id === id)
      );
    } else if (currentPage === "courses") {
      selectedData = newSelectionModel.map((id) =>
        coursesData.find((course: Course) => course._id === id)
      );
    }
    dispatch(setSelectedDataInfo(selectedData));
    console.log("selectedData:", selectedData);
  };
  //newSelectionModel指的是选中的行的id
  //selectedUsers是选中的行的数据

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
      onRowSelectionModelChange={handleSelectionModelChange}
    />
  );
};

export default UsersList;
