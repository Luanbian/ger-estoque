import { useState } from "react";
import { Box, Tabs as MUITabs, Tab } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: string;
}

const CustomTabPanel = ({ value, index, children }: TabPanelProps) => {
  return (
    <div role="tabpanel" hidden={value !== index.toString()}>
      {value === index.toString() && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

interface TabsProps {
  data: {
    tabs: { label: string; content: React.ReactNode }[];
  };
}

export const Tabs = ({ data }: TabsProps) => {
  const { tabs } = data;
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <MUITabs value={value} onChange={handleChange}>
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </MUITabs>
      </Box>
      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value.toString()} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
};
