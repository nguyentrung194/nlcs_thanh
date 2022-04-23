import {
  Card,
  CardContent,
  Box,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import * as React from "react";
import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import environment from "../../config";
import { useParams } from "react-router-dom";

export const EditExpenses = () => {
  const { addToast } = useToasts();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchData(id: string) {
      // You can await here
      await axios({
        url: `${environment.api}expenses/${id}`,
        method: "GET",
        // withCredentials: true,
      })
        .then(
          ({
            data: { data },
          }: {
            data: {
              data: React.SetStateAction<{
                id: string;
                no: string;
                roomType: string;
                AC: string;
                meal: string;
                bedCapacity: string;
                rent: string;
                status: string;
              }>;
            };
          }) => {
            // Handle success
            formik.setValues(data);
            console.log(data);
          }
        )
        .catch((err) => {
          console.log(err);
          // Handle error
          console.log(err);
        });
    }
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const formik = useFormik({
    initialValues: {
      id: "",
      no: "",
      roomType: "",
      AC: "",
      meal: "",
      bedCapacity: "",
      rent: "",
      status: "",
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        // code there
        axios({
          url: `${environment.api}expenses/${id}`,
          method: "PUT",
          data: {},
          withCredentials: true,
        })
          .then(({ data }) => {
            // Handle success
            addToast(`Success`, {
              appearance: "success",
              autoDismiss: true,
            });
          })
          .catch((err) => {
            console.log(err);
            // Handle error
            addToast("Error!!", {
              appearance: "error",
              autoDismiss: true,
            });
          });
        formik.setSubmitting(false);
      } catch (error) {
        // Handle error
        addToast("Error!!", {
          appearance: "error",
          autoDismiss: true,
        });
        console.log(error);
        formik.setSubmitting(false);
      }
    },
  });
  return (
    <div className="bg-gray-200/40 -mt-4 pt-4 min-h-screen">
      <div className="flex justify-between items-center px-6 pt-6">
        <div className="">
          <h3 className="text-3xl leading-none font-bold font-serif">
            Edit Expenses
          </h3>
        </div>
      </div>
      <div className="p-6">
        <Card sx={{ minWidth: 0, height: "100%" }}>
          <CardContent>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              noValidate
              autoComplete="off"
              onSubmit={formik.handleSubmit}
              className="grid grid-cols-3 gap-3"
            >
              <FormControl variant="standard" className="col-span-1">
                <TextField
                  id="ID"
                  value={formik.values.id}
                  onChange={formik.handleChange}
                  label="ID"
                  name="id"
                  required
                />
              </FormControl>
              <FormControl variant="standard" className="col-span-1">
                <TextField
                  id="No"
                  value={formik.values.no}
                  onChange={formik.handleChange}
                  label="No"
                  name="no"
                  required
                />
              </FormControl>
              <div className="col-span-1 flex items-center">
                <FormControl fullWidth>
                  <InputLabel id="Select-Expenses-Type-label">
                    Select Expenses Type
                  </InputLabel>
                  <Select
                    labelId="Select-Expenses-Type-label"
                    id="Select-Expenses-Type"
                    label="Select Expenses Type"
                    value={formik.values.roomType}
                    onChange={(event: SelectChangeEvent) => {
                      formik.setFieldValue("roomType", event.target.value);
                    }}
                  >
                    <MenuItem value={"Single"}>Single</MenuItem>
                    <MenuItem value={"Double"}>Double</MenuItem>
                    <MenuItem value={"Delux"}>Delux</MenuItem>
                    <MenuItem value={"Super Delux"}>Super Delux</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-span-1 flex items-center">
                <FormControl fullWidth>
                  <InputLabel id="AC/NON AC-label">AC/NON AC</InputLabel>
                  <Select
                    labelId="AC/NON AC-label"
                    id="AC/NON AC"
                    label="AC/NON AC"
                    value={formik.values.AC}
                    onChange={(event: SelectChangeEvent) => {
                      formik.setFieldValue("AC", event.target.value);
                    }}
                  >
                    <MenuItem value={"AC"}>AC</MenuItem>
                    <MenuItem value={"NON AC"}>NON AC</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-span-1 flex items-center">
                <FormControl fullWidth>
                  <InputLabel id="Meal-label">Meal</InputLabel>
                  <Select
                    labelId="Meal-label"
                    id="Meal"
                    label="Meal"
                    value={formik.values.meal}
                    onChange={(event: SelectChangeEvent) => {
                      formik.setFieldValue("meal", event.target.value);
                    }}
                  >
                    <MenuItem value={"none"}>None</MenuItem>
                    <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
                    <MenuItem value={"Lunch"}>Lunch</MenuItem>
                    <MenuItem value={"Dinner"}>Dinner</MenuItem>
                    <MenuItem value={"Two"}>Two</MenuItem>
                    <MenuItem value={"All"}>All</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <FormControl variant="standard" className="col-span-1">
                <TextField
                  id="Bed Capacity"
                  value={formik.values.bedCapacity}
                  onChange={formik.handleChange}
                  label="Bed Capacity"
                  name="bedCapacity"
                  required
                />
              </FormControl>
              <FormControl variant="standard" className="col-span-1">
                <TextField
                  id="Rent"
                  value={formik.values.rent}
                  onChange={formik.handleChange}
                  label="Rent"
                  name="rent"
                  required
                />
              </FormControl>
              <div className="col-span-1 flex items-center">
                <FormControl fullWidth>
                  <InputLabel id="Status-label">Select an status</InputLabel>
                  <Select
                    labelId="Status-label"
                    id="Status"
                    label="Status"
                    value={formik.values.status}
                    onChange={(event: SelectChangeEvent) => {
                      formik.setFieldValue("status", event.target.value);
                    }}
                  >
                    <MenuItem value={"Open"}>Open</MenuItem>
                    <MenuItem value={"Inactive"}>Inactive</MenuItem>
                    <MenuItem value={"Booked"}>Booked</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <Button type="submit" variant="contained">
                Edit Expenses
              </Button>
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
