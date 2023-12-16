"use client";
import { Grid, Box, Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
// components
import ProfitExpenses from "@/app/(DashboardLayout)/components/dashboard/ProfitExpenses";
import TrafficDistribution from "@/app/(DashboardLayout)/components/dashboard/TrafficDistribution";
import UpcomingSchedules from "@/app/(DashboardLayout)/components/dashboard/UpcomingSchedules";
import TopPayingClients from "@/app/(DashboardLayout)/components/dashboard/TopPayingClients";
import Blog from "@/app/(DashboardLayout)/components/dashboard/Blog";
import ProductSales from "@/app/(DashboardLayout)/components/dashboard/ProductSales";
import Image from "next/image";
import { IMAGES } from "../../../public/images";

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Typography variant="h3" fontWeight="600" mb={3}>
        Recent Files
      </Typography>
      {/* <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <ProfitExpenses />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TrafficDistribution />
              </Grid>
              <Grid item xs={12}>
                <ProductSales />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <UpcomingSchedules />
          </Grid>
          <Grid item xs={12} lg={8}>
            <TopPayingClients />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box> */}
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5}>
            <Image className="respnsive-image" src={IMAGES.RECENT1} alt="img" />
          </Grid>
          <Grid item xs={12} lg={5}>
            <Image className="respnsive-image" src={IMAGES.RECENT2} alt="img" />
          </Grid>
          <Grid item xs={12} lg={2}>
            <Image className="respnsive-image" src={IMAGES.RECENT3} alt="img" />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Image className="respnsive-image" src={IMAGES.RECENT4} alt="img" />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Image className="respnsive-image" src={IMAGES.RECENT5} alt="img" />
          </Grid>
          <Grid item xs={12} lg={12}>
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <TopPayingClients />
              </Grid>
              <Grid item xs={4}>
                <UpcomingSchedules />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
