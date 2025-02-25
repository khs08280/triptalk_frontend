import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface DateProps {
  date: string;
  setDate: (date: string) => void;
  dates: string[];
}

export default function DateTabs({ date, setDate, dates }: DateProps) {
  const currentValue = dates.indexOf(date) > -1 ? dates.indexOf(date) : 0;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setDate(dates[newValue]);
    console.log(dates[newValue]);
  };

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}>
      <Tabs
        value={currentValue}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {dates.map((dateString, index) => (
          <Tab sx={{ fontSize: 17 }} label={dateString} key={index} />
        ))}
      </Tabs>
    </Box>
  );
}
