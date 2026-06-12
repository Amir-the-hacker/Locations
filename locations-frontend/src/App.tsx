import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
    const [count, setCount] = useState(0);

    const queryClient = new QueryClient();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <CssBaseline />

                <p>hello guys!</p>
            </QueryClientProvider>
        </>
    );
}

export default App;
