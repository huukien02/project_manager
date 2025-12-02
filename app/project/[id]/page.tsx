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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

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
    images: [],
    advance_payments: [], // Ứng tiền
    payments: [], // Thanh toán
  });

  // =====================
  // LOAD DATA
  // =====================
  useEffect(() => {
    const fetchData = async () => {
      const project = await getOneProject(id as string);

      if (project) {
        setForm({
          ...project,
          images: project.images || [],
          advance_payments: project.advance_payments || [],
          payments: project.payments || [],
        });
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  // =====================
  // HANDLE INPUT CHANGE
  // =====================
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // =====================
  // SAVE TO FIRESTORE
  // =====================
  const handleSave = async () => {
    await updateProject(id as string, { ...form });
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
    <Box maxWidth={1100} mx="auto" mt={4}>
      <Box display="flex" gap={2} mb={3} alignItems="center">
        <Link href="/project">
          <IconButton color="primary">
            <ArrowBackIcon />
          </IconButton>
        </Link>
        <Typography variant="h5">Sửa dự án</Typography>
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" justifyContent={"center"} gap={10}>
          <Box display="flex" width={"50%"} flexDirection="column" gap={2}>
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
              type="number"
            />

            {/* ===========================
            HIỂN THỊ HÌNH ẢNH
        =========================== */}
            {form.images && form.images.length > 0 && (
              <Box mt={2}>
                <Typography fontWeight="bold" mb={1}>
                  Hình ảnh dự án:
                </Typography>

                <Box display="flex" gap={2} flexWrap="wrap">
                  {form.images.map((url: string, index: number) => (
                    <img
                      key={index}
                      src={url}
                      alt={`image-${index}`}
                      width={120}
                      style={{
                        borderRadius: 10,
                        border: "1px solid #ccc",
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          <Box width={"50%"}>
            {/* ===========================
    CẢNH BÁO TỔNG THU - CHI
=========================== */}
            <Box mt={3} p={2} border="1px solid #ccc" borderRadius={2}>
              <Typography fontWeight="bold" mb={1}>
                Cảnh báo thu - chi
              </Typography>

              {(() => {
                const totalAdvance = form.advance_payments.reduce(
                  (sum: number, item: any) => sum + Number(item.amount || 0),
                  0
                );

                const totalPayments = form.payments.reduce(
                  (sum: number, item: any) => sum + Number(item.amount || 0),
                  0
                );

                const isWarning = totalAdvance > totalPayments;

                return (
                  <Box>
                    <Typography>
                      Tổng ứng tiền: {totalAdvance.toLocaleString()} VNĐ
                    </Typography>
                    <Typography>
                      Tổng thanh toán: {totalPayments.toLocaleString()} VNĐ
                    </Typography>

                    <Typography
                      mt={1}
                      fontWeight="bold"
                      color={isWarning ? "error" : "green"}
                    >
                      {isWarning
                        ? "⚠️ Ứng tiền đang lớn hơn thanh toán!"
                        : "✔ Thu chi hợp lệ!"}
                    </Typography>
                  </Box>
                );
              })()}
            </Box>
            {/* ===========================
            ỨNG TIỀN
        =========================== */}
            <Box mt={3}>
              <Typography fontWeight="bold">Ứng tiền</Typography>

              {form.advance_payments.map((item: any, index: number) => (
                <Box key={index} display="flex" gap={2} mt={2}>
                  <TextField
                    label={`Số tiền lần ${index + 1}`}
                    type="number"
                    value={item.amount}
                    onChange={(e) => {
                      const updated = [...form.advance_payments];
                      updated[index].amount = e.target.value;
                      setForm({ ...form, advance_payments: updated });
                    }}
                  />

                  <TextField
                    label="Ngày"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={item.date}
                    onChange={(e) => {
                      const updated = [...form.advance_payments];
                      updated[index].date = e.target.value;
                      setForm({ ...form, advance_payments: updated });
                    }}
                  />
                </Box>
              ))}

              <Button
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={() =>
                  setForm({
                    ...form,
                    advance_payments: [
                      ...form.advance_payments,
                      { amount: "", date: "" },
                    ],
                  })
                }
              >
                + Thêm lần ứng tiền
              </Button>
            </Box>

            {/* ===========================
            THANH TOÁN
        =========================== */}
            <Box mt={3}>
              <Typography fontWeight="bold">Thanh toán</Typography>

              {form.payments.map((item: any, index: number) => (
                <Box key={index} display="flex" gap={2} mt={2}>
                  <TextField
                    label={`Thanh toán lần ${index + 1}`}
                    type="number"
                    value={item.amount}
                    onChange={(e) => {
                      const updated = [...form.payments];
                      updated[index].amount = e.target.value;
                      setForm({ ...form, payments: updated });
                    }}
                  />

                  <TextField
                    label="Ngày"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={item.date}
                    onChange={(e) => {
                      const updated = [...form.payments];
                      updated[index].date = e.target.value;
                      setForm({ ...form, payments: updated });
                    }}
                  />
                </Box>
              ))}

              <Button
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={() =>
                  setForm({
                    ...form,
                    payments: [...form.payments, { amount: "", date: "" }],
                  })
                }
              >
                + Thêm lần thanh toán
              </Button>
            </Box>
          </Box>
        </Box>

        {/* ===========================
            SAVE BUTTON
        =========================== */}
        <Button variant="contained" onClick={handleSave}>
          Lưu thay đổi
        </Button>
      </Box>
    </Box>
  );
}
