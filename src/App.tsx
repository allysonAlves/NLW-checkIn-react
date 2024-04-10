import { ThemeProvider, createTheme } from "@mui/material";
import { AttendeeList } from "./components/attendee-list";
import { Header } from "./components/header";
import { MessageProvider } from "./context/MessageContext";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <MessageProvider>
        <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
          <Header/>
          <AttendeeList/>
        </div>
      </MessageProvider>
    </ThemeProvider>
  );
}
