"use client";

import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { getOneProject } from "@/lib/getOneProject";
import { updateProject } from "@/lib/updateProject";
import Link from "next/link";

export default function EditProjectPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<any>({
    name: "",
    investor: "",
    address: "",
    start_date: "",
    end_date: "",
    construction_time: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const project = await getOneProject(id as string);
      if (project) {
        setForm({
          ...project,
        });
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await updateProject(id as string, {
      ...form,
    });

    alert("Cập nhật thành công!");
    router.push("/project");
  };

  if (loading)
    return (
      <Box p={5} textAlign="center">
        <CircularProgress />
      </Box>
    );

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5"> Sửa dự án</Typography>

        <Link href="/project">
          <Button variant="contained">Danh sách dự án</Button>
        </Link>
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Tên dự án"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          label="Chủ đầu tư"
          name="investor"
          value={form.investor}
          onChange={handleChange}
        />
        <TextField
          label="Địa chỉ"
          name="address"
          value={form.address}
          onChange={handleChange}
        />
        <TextField
          type="date"
          label="Ngày bắt đầu"
          name="start_date"
          InputLabelProps={{ shrink: true }}
          value={form.start_date}
          onChange={handleChange}
        />
        <TextField
          type="date"
          label="Ngày kết thúc"
          name="end_date"
          InputLabelProps={{ shrink: true }}
          value={form.end_date}
          onChange={handleChange}
        />
        <TextField
          label="Thời gian xây dựng"
          name="construction_time"
          value={form.construction_time}
          onChange={handleChange}
        />

        <Button variant="contained" onClick={handleSave}>
          Lưu thay đổi
        </Button>
      </Box>
    </Box>
  );
}
