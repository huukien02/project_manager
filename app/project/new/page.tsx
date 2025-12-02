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

  const [images, setImages] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Chọn tối đa 3 ảnh
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selected = Array.from(files);

    if (selected.length + images.length > 3) {
      alert("Chỉ được upload tối đa 3 ảnh");
      return;
    }

    setImages([...images, ...selected]);
  };

  // Upload 1 ảnh lên Cloudinary
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhmr88vva/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  // Submit form
  const handleSubmit = async () => {
    // Upload từng ảnh
    const imageUrls = [];
    for (const img of images) {
      const url = await uploadImage(img);
      imageUrls.push(url);
    }

    // Gửi toàn bộ form + ảnh
    await createProject({
      ...form,
      images: imageUrls,
    });

    alert("Thêm dự án thành công!");

    // Reset form
    setForm({
      name: "",
      investor: "",
      address: "",
      start_date: "",
      end_date: "",
      construction_time: "",
    });
    setImages([]);
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

        {/* Input chọn ảnh */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginTop: 16 }}
        />

        {/* Preview ảnh */}
        <Box display="flex" gap={2} mt={2}>
          {images.map((img, i) => (
            <img
              key={i}
              src={URL.createObjectURL(img)}
              width={100}
              style={{ borderRadius: 8 }}
            />
          ))}
        </Box>

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
