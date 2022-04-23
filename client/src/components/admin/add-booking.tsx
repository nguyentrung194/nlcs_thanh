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
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import * as React from "react";
import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import environment from "../../config";
import { storage } from "../../hooks/use-firebase";

export const AddBooking = () => {
  const { addToast } = useToasts();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      photo: "",
      package_p: "",
      roomType: "",
      arrive: "",
      totalPerson: "",
      note: "",
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        // code there
        axios({
          url: `${environment.api}bookings`,
          method: "POST",
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
            Add Booking
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
                  id="First-Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  label="First Name"
                  name="firstName"
                  required
                />
              </FormControl>
              <FormControl variant="standard" className="col-span-1">
                <TextField
                  id="Last-Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  label="Last Name"
                  name="lastName"
                  required
                />
              </FormControl>
              <div className="col-span-1 flex items-center">
                <FormControl fullWidth>
                  <InputLabel id="Gender-label">Gender</InputLabel>
                  <Select
                    labelId="Gender-label"
                    id="Gender"
                    label="Gender"
                    value={formik.values.gender}
                    onChange={(event: SelectChangeEvent) => {
                      formik.setFieldValue("gender", event.target.value);
                    }}
                  >
                    <MenuItem value={"none"}>
                      <em>Not prefer</em>
                    </MenuItem>
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <FormControl variant="standard" className="col-span-1">
                <TextField
                  id="Phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  label="Phone"
                  name="phone"
                  required
                />
              </FormControl>
              <FormControl variant="standard" className="col-span-1">
                <TextField
                  id="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  label="Email Address"
                  name="email"
                  required
                />
              </FormControl>
              <FormControl variant="standard" className="col-span-1">
                <TextField
                  id="Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  label="Address"
                  name="address"
                  required
                />
              </FormControl>
              <div className="col-span-1 flex items-center">
                <label className="h-full cursor-pointer border px-3 py-1.5 flex items-center justify-center w-full text-center hover:bg-slate-100 rou custom-file-upload">
                  <input
                    aria-label="File browser example"
                    className="hidden"
                    name="photo"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={(e) => {
                      console.log(storage);
                      formik.setSubmitting(true);
                      const uploadFiles = Array.from(
                        e.target.files as FileList
                      ).map(async (file: File) => {
                        const storageRef = storage.ref();
                        const ref = storageRef.child(`assert/${file.name}`);
                        const metadata = {
                          size: file.size,
                          contentType: file.type,
                          name: file.name,
                        };
                        await ref.put(file, metadata);
                        const assetUrl = await ref.getDownloadURL();
                        formik.setSubmitting(false);
                        return { ...metadata, assetUrl };
                      });
                      console.log(uploadFiles);
                      Promise.all(uploadFiles)
                        .then(async (result) => {
                          formik.setFieldValue("photo", result[0].assetUrl);
                        })
                        .catch((error) => {
                          console.log(error.message);
                        });
                    }}
                  />
                  Upload Photo
                </label>
              </div>
              <div className="col-span-1 flex items-center">
                <FormControl fullWidth>
                  <InputLabel id="Select-an-package-label">
                    Select an package
                  </InputLabel>
                  <Select
                    labelId="Select-an-package-label"
                    id="Select-an-package"
                    label="Select an package"
                    value={formik.values.package_p}
                    onChange={(event: SelectChangeEvent) => {
                      formik.setFieldValue("package_p", event.target.value);
                    }}
                  >
                    <MenuItem value={"Strater Package"}>
                      Strater Package
                    </MenuItem>
                    <MenuItem value={"Honeymoon Package"}>
                      Honeymoon Package
                    </MenuItem>
                    <MenuItem value={"Spring Package"}>Spring Package</MenuItem>
                    <MenuItem value={"Vacation Package"}>
                      Vacation Package
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-span-1 flex items-center">
                <FormControl fullWidth>
                  <InputLabel id="Select-Room-Type-label">
                    Select Room Type
                  </InputLabel>
                  <Select
                    labelId="Select-Room-Type-label"
                    id="Select-Room-Type"
                    label="Select Room Type"
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
              <FormControl variant="standard" className="col-span-1">
                <TextField
                  id="Total Person"
                  value={formik.values.totalPerson}
                  onChange={formik.handleChange}
                  label="Total Person"
                  name="totalPerson"
                  required
                />
              </FormControl>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                className="col-span-1"
              >
                <DatePicker
                  label="Arrived Date"
                  value={formik.values.arrive}
                  onChange={(value) => formik.setFieldValue("arrive", value)}
                  renderInput={(params) => <TextField required {...params} />}
                />
              </LocalizationProvider>
              <FormControl variant="standard" className="col-span-3">
                <TextField
                  id="Note"
                  value={formik.values.note}
                  onChange={formik.handleChange}
                  label="Note"
                  name="note"
                  required
                  multiline
                  rows={3}
                />
              </FormControl>
              <Button type="submit" variant="contained">
                Add Booking
              </Button>
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
