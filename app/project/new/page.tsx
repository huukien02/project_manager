"use client";

import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { createProject } from "@/lib/projectActions";
import Link from "next/link";

export default function NewProjectPage() {
  const [form, setForm] = useState({
    name: "",
    investor: "",
    address: "",
    start_date: "",
    end_date: "",
    construction_time: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await createProject(form);
    alert("Thêm dự án thành công!");
    setForm({
      name: "",
      investor: "",
      address: "",
      start_date: "",
      end_date: "",
      construction_time: "",
    });
  };

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5"> Thêm dự án mới</Typography>

        <Link href="/project">
          <Button variant="contained">Danh sách dự án</Button>
        </Link>
      </Box>
      <Box>
        <TextField
          margin="normal"
          label="Tên dự án"
          fullWidth
          name="name"
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          label="Chủ đầu tư"
          fullWidth
          name="investor"
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          label="Địa chỉ"
          fullWidth
          name="address"
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          label="Ngày khởi công"
          type="date"
          fullWidth
          name="start_date"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="normal"
          label="Ngày bàn giao"
          type="date"
          fullWidth
          name="end_date"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="normal"
          label="Thời gian thi công"
          fullWidth
          name="construction_time"
          onChange={handleChange}
          type="number"
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Lưu dự án
        </Button>
      </Box>
    </Box>
  );
}
