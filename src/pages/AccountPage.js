import ManageResume from "features/user/ManageResume";
import Profile from "features/user/Profile";
import UpdateProfile from "features/user/UpdateProfile";
import useAuth from "hooks/useAuth";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import { Box } from "@mui/system";
import { TabContext, TabPanel } from "@mui/lab";
import { Tab, Tabs } from "@mui/material";
import ManageApplication from "features/application/ManageApplication";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const TAB = [
  {
    value: "Update profile",
    icon: <EditIcon sx={{ fontSize: 24 }} />,
    component: <UpdateProfile />,
    slug: "update_profile",
  },
  {
    value: "Opportunities",
    icon: <PeopleIcon sx={{ fontSize: 24 }} />,
    component: <ManageResume />,
    slug: "opportunities",
  },
  {
    value: "Applications",
    icon: <WorkIcon sx={{ fontSize: 24 }} />,
    component: <ManageApplication />,
    slug: "applications",
  },
];
const AccountPage = () => {
  const { user } = useAuth();

  const [value, setValue] = useState(TAB[0].value);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    const currentTab = TAB.find(({ value }) => value === newValue);
    navigate(`/account/${currentTab.slug}`);
  };
  const { tab } = useParams();
  useEffect(() => {
    const currentTab = TAB.find(({ slug }) => slug === tab);
    setValue(currentTab.value);
  }, [tab]);

  function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }
  return (
    <>
      <Box>
        <Profile user={user} />
      </Box>

      <Box sx={{ typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Tabs
              onChange={handleChange}
              aria-label="account tab"
              variant="scrollable"
              value={value}
              scrollButtons
              allowScrollButtonsMobile
              sx={{ maxWidth: "700px", m: "auto" }}
            >
              {TAB.map((tab) => (
                <LinkTab
                  key={tab.value}
                  label={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  href={`account/${tab.slug}`}
                />
              ))}
            </Tabs>
          </Box>

          {TAB.map((tab) => (
            <TabPanel key={tab.value} value={tab.value}>
              {tab.component}
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </>
  );
};

export default AccountPage;
