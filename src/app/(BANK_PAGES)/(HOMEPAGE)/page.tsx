import { Grid } from '@mui/material';
// import Link from 'next/link';
// import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import BankCard from "../components/BankCard";
import React from "react";
import TestGrid1 from "../components/TestGrid1";
import InfoPage from "../components/MyCard2";
// Dynamically load the Footer component as a Client Component
// import BankCardRow from "../components/blocks/BankCardRow";
import NEWCTA from "../components/NewCTA";

import MyCard3 from "../components/MyCard3";
import CardComparison from "../components/Compare";


const HomePage = () => {

  return (
  <>
  <NEWCTA />
  {/* <BankCardTest5 />
  <MuiQuickstart /> */}
  <TestGrid1 />

  <MyCard3 />

  {/* <CardComparison /> */}
  {/* <BankCard /> */}


    </>
  );
};

export default HomePage;
