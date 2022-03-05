import { Box, Button, Typography } from "@mui/material";

import { useRouter } from "next/router";

export const CustomerListToolbar = (props) => {
  const router = useRouter();

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Ordens de produção
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            onClick={() => router.push("/production-order-form")}
            color="primary"
            variant="contained"
          >
            Criar nova ordem
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
