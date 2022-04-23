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

export const EditRoomType = () => {
  const { addToast } = useToasts();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchData(id: string) {
      // You can await here
      await axios({
        url: `${environment.api}room-types/${id}`,
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
                name: string;
                rent: string;
                shortCode: string;
                noOfRoom: string;
                type: string;
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
      name: "",
      rent: "",
      shortCode: "",
      noOfRoom: "",
      type: "",
      status: "",
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        // code there
        axios({
          url: `${environment.api}room-types/${id}`,
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
            Edit Room Type
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
                  id="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  label="Name"
                  name="name"
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
              <FormControl variant="standard" className="col-span-1">
                <TextField
                  id="Short Code"
                  value={formik.values.shortCode}
                  onChange={formik.handleChange}
                  label="Short Code"
                  name="shortCode"
                  required
                />
              </FormControl>
              <FormControl variant="standard" className="col-span-1">
                <TextField
                  id="No Of Room"
                  value={formik.values.noOfRoom}
                  onChange={formik.handleChange}
                  label="No Of Room"
                  name="noOfRoom"
                  type="number"
                  required
                />
              </FormControl>
              <FormControl variant="standard" className="col-span-1">
                <TextField
                  id="Type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  label="Type"
                  name="type"
                  type="number"
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
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Inactive"}>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <Button type="submit" variant="contained">
                Edit Room Type
              </Button>
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
