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
} from "@mui/material";
import Link from "next/link";
import { getAllProjects } from "@/lib/getAllProjects";
import { deleteProject } from "@/lib/deleteProject";

export default function ProjectListPage() {
  const [projects, setProjects] = useState<any>([]);

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

  return (
    <Box maxWidth={900} mx="auto" mt={4}>
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
            {projects.map((p: any) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
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
            ))}

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
  );
}
