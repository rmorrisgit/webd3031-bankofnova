"use client";

import { Grid, Box, Typography, Tabs, Tab } from "@mui/material";
import PageContainer from "../../../components/container/PageContainer";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUserBalance } from "../../../../api/user";
import MonthlyEarnings from "../../../components/MonthlyEarnings";
import {
  IconHome,
  IconCurrencyDollar,
  IconWallet,
} from "@tabler/icons-react";

// Custom TabPanel component
interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const OverviewPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter(); // For redirection to login page if not authenticated
  const [chequing, setChequing] = useState<number | null>(null);
  const [savings, setSavings] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<number>(0); // To manage the selected tab

  useEffect(() => {
    if (session) {
      const getBalances = async () => {
        try {
          const balances = await fetchUserBalance();
          console.log("Fetched balances:", balances); // Log the fetched balances
          setChequing(balances.chequing || 0);
          setSavings(balances.savings); // Should be `null` if no savings account exists
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unknown error occurred");
          }
        }
      };
      getBalances();
    }
  }, [session, status, router]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <PageContainer title="Overview" description="this is OVERVIEW">
      {status === "loading" ? (
        <div>Loading...</div>
      ) : session ? (
        <Box>
          <Typography variant="h1" mt={3} mb={2}>
            Accounts
          </Typography>

          <Tabs value={selectedTab} onChange={handleTabChange} aria-label="account-tabs">
            <Tab icon={<IconHome />} label="All" />
            <Tab icon={<IconCurrencyDollar />} label="Spending" />
            {/* Only render "Saving" tab if savings account exists */}
            {savings !== null && <Tab icon={<IconWallet />} label="Saving" />}
          </Tabs>

          <TabPanel value={selectedTab} index={0}>
            <Grid item xs={12} lg={8} sx={{ marginBottom: 2 }}>
              <MonthlyEarnings title="Chequing" balance={chequing ?? 0} link="/accounts/chequing" />
            </Grid>

            {/* Check if savings is null and show the button or MonthlyEarnings */}
            {savings === null ? (
              <Grid item xs={12} lg={8}>
                <Box display="flex" justifyContent="center" alignItems="center" height={120} border="1px dashed #ccc" borderRadius={2}>
                  <button
                    style={{ padding: "0.75rem 1.5rem", fontSize: "1rem", cursor: "pointer" }}
                    onClick={() => router.push("/OpenSavings")}
                  >
                    Open a Savings Account
                  </button>
                </Box>
              </Grid>
            ) : (
              <Grid item xs={12} lg={8}>
                <MonthlyEarnings title="Savings" balance={savings} link="/accounts/savings" color="#ff5733" />
              </Grid>
            )}
          </TabPanel>

          <TabPanel value={selectedTab} index={1}>
            <Grid item xs={12} lg={8} sx={{ marginBottom: 2 }}>
              <MonthlyEarnings title="Chequing" balance={chequing ?? 0} link="/accounts/chequing" />
            </Grid>
          </TabPanel>

          {/* Only render the savings content when savings exists */}
          {savings !== null && (
            <TabPanel value={selectedTab} index={2}>
              <Grid item xs={12} lg={8}>
                <MonthlyEarnings title="Savings" balance={savings} link="/accounts/savings" color="#ff5733" />
              </Grid>
            </TabPanel>
          )}
        </Box>
      ) : (
        <div>You need to be logged in to view this page.</div>
      )}
    </PageContainer>
  );
};

export default OverviewPage;
