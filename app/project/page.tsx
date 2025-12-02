"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import Link from "next/link";
import { getAllProjects } from "@/lib/getAllProjects";
import { deleteProject } from "@/lib/deleteProject";

export default function ProjectListPage() {
  const [projects, setProjects] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = async () => {
    const data = await getAllProjects();
    setProjects(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = confirm("Bạn chắc chắn xóa dự án này?");
    if (!ok) return;
    await deleteProject(id);
    setProjects((prev: any) => prev.filter((p: any) => p.id !== id));
  };

  const isLoss = (p: any) => {
    const totalPayments =
      p.payments?.reduce(
        (sum: number, item: any) => sum + Number(item.amount),
        0
      ) || 0;
    const totalAdvance =
      p.advance_payments?.reduce(
        (sum: number, item: any) => sum + Number(item.amount),
        0
      ) || 0;
    return totalPayments - totalAdvance < 0;
  };

  // --- Phân trang FE ---
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event: any, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box maxWidth={1100} mx="auto" mt={4}>
      <Box height={450}>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Typography variant="h5">Danh sách dự án</Typography>

          <Link href="/project/new">
            <Button variant="contained">+ Thêm dự án</Button>
          </Link>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Tên dự án</b>
                </TableCell>
                <TableCell>
                  <b>Chủ đầu tư</b>
                </TableCell>
                <TableCell>
                  <b>Địa chỉ</b>
                </TableCell>
                <TableCell>
                  <b>Ngày bắt đầu</b>
                </TableCell>
                <TableCell>
                  <b>Ngày kết thúc</b>
                </TableCell>
                <TableCell>
                  <b>Action</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {currentProjects.map((p: any) => {
                const loss = isLoss(p);
                return (
                  <TableRow key={p.id}>
                    <TableCell
                      sx={{
                        backgroundColor: loss ? "red" : "green",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {p.name}
                    </TableCell>
                    <TableCell>{p.investor}</TableCell>
                    <TableCell>{p.address}</TableCell>
                    <TableCell>{p.start_date}</TableCell>
                    <TableCell>{p.end_date}</TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Link href={`/project/${p.id}`}>
                          <Button variant="outlined" size="small">
                            Sửa
                          </Button>
                        </Link>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(p.id)}
                        >
                          Xóa
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}

              {projects.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    style={{ textAlign: "center", padding: 20 }}
                  >
                    Không có dự án nào.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {projects.length > itemsPerPage && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}
